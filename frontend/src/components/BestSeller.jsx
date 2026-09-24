import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
//ASA//
  useEffect(() => {
    console.log(products); // Log products to ensure data is fetched
    const bestProduct = products.filter((item) => item.bestSeller);
    console.log(bestProduct); // Log filtered products
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
  
  
  return (
    <div className='my-14 px-4 sm:px-10'>
      {/* White background box */}
      <div className='bg-white shadow-lg rounded-xl p-8'>
        {/* Heading Section */}
        <div className='text-center py-8'>
          <Title text1='BEST' text2='SELLERS' />
          <p className='max-w-xl mx-auto mt-2 text-sm sm:text-base text-gray-500'>
            Discover our best-selling floral arrangements – perfect for any occasion, delivering beauty and charm with every bloom.
          </p>
        </div>

        {/* Best Seller Product Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {bestSeller.map((item) => (
            <div key={item._id} className='relative'>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
              
              {/* Add a special label for "Best Seller" */}
              <div className='absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                Best Seller
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
