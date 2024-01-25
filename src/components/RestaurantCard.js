import { IMG_CDN_URL } from "../config.js";

const RestaurantCard = ({ cloudinaryImageId, name, cuisines, areaName, costForTwo, avgRatingString }) => {
    return (
      <div className="card">
        <img src={IMG_CDN_URL + cloudinaryImageId} alt="Image" />
        <h2>{name}</h2>
        {Array.isArray(cuisines) ? (
          <h3>{cuisines.join(", ")}</h3>
        ) : (
          <h3>{cuisines}</h3>
        )}
        <h4>{areaName}</h4>
        <span>
          <h4>{avgRatingString} stars</h4>
          <h4>{costForTwo}</h4>
        </span>
      </div>
    );
};

export default RestaurantCard;
