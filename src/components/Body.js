import { useState } from "react";
import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";

function filterData(searchInput, restaurants) {
    const filterData =  restaurants.filter((restaurant) => restaurant.info.name.includes(searchInput));
    return filterData;
}

const Body = () =>{

    const [restaurants, setRestaurants] = useState(restaurantList);
    //To create state variables
    //searchText is a local variable
    const [searchInput, setSearchInput] = useState(""); // returns = [variable name, function to update the variable]
    return (
        <>
        <div className="search-container">
            <input 
                type="text" 
                className="search-input" 
                placeholder="Search" 
                value={searchInput}
                onChange={(e) => {
                    //e.target.value is whatever you write in input
                    setSearchInput(e.target.value);
                }} 
            />
        <button 
            className="search-btn"
            onClick={() => {
                //need to filter the data
                const data = filterData(searchInput, restaurants);
                //update the state - restaurants variable
                setRestaurants(data);
            }}
            >
            Search
        </button>
        </div>
        <div className="restaurant-list">
            {restaurants.map((restaurant) => {
                return <RestaurantCard key={restaurant.info.id} {...restaurant.info} />;
            })}
        </div>
        </>
    );
};

export default Body;