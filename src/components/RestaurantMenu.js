import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IMG_CDN_URL } from '../config';
import Shimmer from './Shimmer';

const RestaurantMenu = () => {
    const { resid } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [menuData, setMenuData] = useState(null);

    useEffect(() => {
        getRestaurantInfo();
    }, [resid]);

    async function getRestaurantInfo() {
        try {
            const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.022505&lng=72.5713621&restaurantId=${resid}&catalog_qa=undefined&submitAction=ENTER`);
            const json = await data.json();
            console.log('API Response:', json);

            const restaurantData = json.data?.cards?.[2]?.card?.card?.info || {};
            setRestaurant(restaurantData);

            const menuData = json.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
            setMenuData(menuData);
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
        }
    }

    return !restaurant ? <Shimmer /> : (
        <div className='menu'>
            <h1 className='rest-title'>{restaurant.name}</h1>
            <div className='restaurant-detail'>
                <div>
                    {restaurant.cloudinaryImageId && (
                        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} alt={restaurant.name} />
                        )}
                    <h2>Restaurant id: {resid}</h2>
                </div>
                <div>
                    <h3>{restaurant.areaName}</h3>
                    <h3>{restaurant.locality}</h3>
                    <h3>{restaurant.city}</h3>
                    <h3>{restaurant.avgRating} stars</h3>
                    <h3>{restaurant.costForTwoMessage}</h3>
                </div>
            </div>
            <div className='restaurant-menu'>
                <h1>Menu</h1>
                <ul>
                    {menuData && menuData.map((category, index) => (
                        <li key={index}>
                            <h2>{category.card?.card?.title}</h2>
                            <ul>
                                {category.card?.card?.itemCards?.map((item) => (
                                    <li key={item.card?.['@type']}>
                                        <h4>{item.card?.info?.name}</h4>
                                        <div className="item-content">
                                            <img src={IMG_CDN_URL + item.card?.info?.imageId} alt={item.card?.info?.name}/>
                                            <p className='item-desc'>{item.card?.info?.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantMenu;
