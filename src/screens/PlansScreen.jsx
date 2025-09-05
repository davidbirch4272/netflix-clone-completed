function PlansScreen() {
  const products = [
    { id: "1", name: "Plan A", description: "Description A" },
    { id: "2", name: "Plan B", description: "Description B" }
  ];

  return (
    <div className="plansScreen">
      {products.map(product => (
        <div key={product.id} className="plansScreen__plan">
          <div className="plansScreen__info">
            <h5>{product.name}</h5>
            <h6>{product.description}</h6>
          </div>
          <button>Subscribe</button>
        </div>
      ))}
    </div>
  );
}

export default PlansScreen;
