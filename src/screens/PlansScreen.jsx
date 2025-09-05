import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import "./PlansScreen.css";

  
 const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function PlansScreen({ onCurrentPlan }) {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState({});
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsQuery = query(collection(db, "products"), where("active", "==", true));
      const productsSnap = await getDocs(productsQuery);

      const productsData = {};
      for (let productDoc of productsSnap.docs) {
        productsData[productDoc.id] = productDoc.data();

        const pricesSnap = await getDocs(collection(productDoc.ref, "prices"));
        const prices = {};
        pricesSnap.forEach((priceDoc) => {
          prices[priceDoc.id] = priceDoc.data();
        });

        productsData[productDoc.id].prices = prices;
      }

      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    if (Object.keys(products).length === 0) return; 

    const fetchSubscription = async () => {
      const subsRef = collection(db, "customers", user.uid, "subscriptions");
      const subsSnap = await getDocs(subsRef);

      const activeSub = subsSnap.docs.find((doc) => doc.data().status === "active");

      if (activeSub) {
        const data = activeSub.data();
        const subObj = {
          role: data.role || null,
          current_period_start: data.current_period_start,
          current_period_end: data.current_period_end,
          items: data.items || [],
        };
        setSubscription(subObj);

        if (onCurrentPlan && subObj.items.length > 0) {
          const planName =
            products[subObj.items[0]?.price?.product?.id]?.name || "Unknown Plan";
          onCurrentPlan(planName);
        }
      } else {
        setSubscription(null);
        if (onCurrentPlan) onCurrentPlan(null);
      }
    };

    fetchSubscription();
  }, [user?.uid, products, onCurrentPlan]);

  const loadCheckout = async (priceId) => {
    const checkoutRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(checkoutRef, async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) alert(`Error: ${error.message}`);
      if (sessionId) {
      const stripe = await stripePromise;      
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription?.current_period_end && (
        <p>
          Renewal date:{" "}
          {new Date(subscription.current_period_end.seconds * 1000).toLocaleDateString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const currentProductRef = subscription?.items?.[0]?.price?.product;
        const isCurrentPackage = currentProductRef?.id === productId;
        const priceId = Object.keys(productData.prices)[0];

        return (
          <div
            key={productId}
            className={`plansScreen__plan ${
              isCurrentPackage ? "plansScreen__plan--disabled" : ""
            }`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(priceId)}>
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
