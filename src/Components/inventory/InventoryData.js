// src/data/inventoryData.js

import dryFish from '../../assets/fish.png';
import rice from '../../assets/rice.png';
import tomato from '../../assets/tomato.png';

export const inventory = [
  {
    id: 1,
    product: "Dry Fish Panla",
    img: dryFish,
    stock: 120,
    threshold: 30,
    lastUpdated: "2025-04-06 04:35 PM",
  },
  {
    id: 2,
    product: "Ofada Rice",
    img: rice,
    stock: 18,
    threshold: 20,
    lastUpdated: "2025-04-06 01:12 PM",
  },
  {
    id: 3,
    product: "Red Tomato Ball",
    img: tomato,
    stock: 0,
    threshold: 15,
    lastUpdated: "2025-04-05 11:03 AM",
  },
];
