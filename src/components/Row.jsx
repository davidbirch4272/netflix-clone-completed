import React, { useEffect, useState } from "react";
import axios from "./Axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Row.css";


function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function FetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    FetchData();
  }, [fetchUrl]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8, 
    slidesToScroll: 3, 
    arrows: true, 
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  }

    function CustomArrow(props) {
    const { className, style, onClick, direction } = props;
    return (
      <div
        className={`${className} custom-arrow ${direction}`}
        style={{ ...style,
          display: "block",
          [direction]:  "-15px",
          zIndex: 20,
         }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="row">
      <h2>{title}</h2>
        <div className="row__posters">
        <Slider {...settings}>
        {movies.map((movie) => (
          ((isLargeRow && movie.poster_path) || 
          (!isLargeRow && movie.backdrop_path))  && (
            <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            />
          ))
        )}
        </Slider> 
        </div>
    </div>
  );
}

export default Row;
