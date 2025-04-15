import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../../api/apiConfig';
import './MainDash.css';


const TopSelling = () => {
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    const fetchTopSelling = async () => {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            console.error("No access token found in localStorage.");
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}/v1/products/top-selling`, {
                headers: {
                    'x-api-key': API_KEY,
                    Authorization: `Bearer ${accessToken}`,

                },
                params: {
                    sortBy: 'amount',
                },
            });

            setTopSellingProducts(res.data?.data || []);
        } catch (error) {
            console.error("Failed to fetch top-selling products:", error);
        }
    };

    useEffect(() => {
        fetchTopSelling();
    }, []);

    return (
        <div className='topSelling-conainer'>
            <h3>Top-Selling Products</h3>

            <div className='topSelling'>
                {topSellingProducts.map((product, index) => (
                    <div key={product._id} className='per-unit'>
                        <h5>{index + 1}.</h5>
                        <img src={product.image} alt={product.productName} />
                        <div>
                            <h6>{product.productName}</h6>
                            <p>{product.salesData?.quantitySold || 0} Units Sold</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSelling;



// import { BASE_URL, API_KEY } from "../../api/apiConfig";
// import EditModal from "./EditProduct";
// import DeleteModal from "./DeleteProduct";