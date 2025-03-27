import React from 'react';
import tomato from '../../assets/tomato.png';
import fish from '../../assets/fish.png';

const Products = [
    {
        id: 1,
        img: tomato,
        name: 'Dry Fish Panla Egun (Eja kika)',
        unit: 5
    },
    {
        id: 2,
        img: fish,
        name: 'Red Tomato Bell',
        unit: 10
    },
]

const TopSelling = () => {
    return (
        <div className='topSelling-conainer'>
            <h3>Top-Selling Products</h3>

            <div className='topSelling'>
                {
                    Products.map((products, index) => (
                        <div className='per-unit'>
                            <h5>{products.id}.</h5>
                            <img src={products.img} alt='' />
                            <div>
                                <h6>{products.name}</h6>
                                <p>{products.unit} Units Sold</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TopSelling
