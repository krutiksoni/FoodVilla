import { useState, useEffect } from "react";
// import { restaurantList } from "../config";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(searchInput, restaurants) {
    const filterData =  restaurants.filter((restaurant) => restaurant?.info.name?.toLowerCase()?.includes(searchInput.toLowerCase()));
    return filterData;
}

const Body = () =>{

    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    //To create state variables
    //searchText is a local variable
    const [searchInput, setSearchInput] = useState(""); // returns = [variable name, function to update the variable]

    //empty dependency array => it will be called once after rendering
    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants(){
            const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.022505&lng=72.5713621&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            const json = await data.json();
            setAllRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setFilteredRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }

    //Conditional Rendering
    //If restaurant is empty => Shimmer UI
    //If restaurant has data => Actual Data UI


    //Not render Component (Early Return)
    if(!allRestaurants) return null;

    return (filteredRestaurants.length == 0) ? <Shimmer />: (
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
                const data = filterData(searchInput, allRestaurants);
                //update the state - restaurants variable
                setFilteredRestaurants(data);
            }}
            >
            Search
        </button>
        </div>
        <div className="restaurant-list">
            {filteredRestaurants.map((restaurant) => {
                return (
                 <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}><RestaurantCard  {...restaurant.info} /></Link>
                );
            })}
        </div>
        </>
    );
};

export default Body;