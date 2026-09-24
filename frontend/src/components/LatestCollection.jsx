import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [LatestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-14 px-4 sm:px-10'>
      {/* White background box */}
      <div className='bg-white shadow-lg rounded-xl p-8'>
        {/* Heading Section */}
        <div className='text-center py-8'>
          <Title text1='LATEST' text2='COLLECTION' />
          <p className='max-w-xl mx-auto mt-2 text-sm sm:text-base text-gray-500'>
            Discover our newest arrivals – fresh flowers, custom bouquets, and heartwarming gifts perfect for every occasion.
          </p>
        </div>

        {/* Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
          {LatestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
