import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategoty }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let filtered = products.filter(
        (item) => item.category === category && item.subcategory === subCategoty
      );
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategoty]);

  return (
    <div className='my-20 px-4 sm:px-8'>
      <div className='bg-white shadow-xl rounded-xl p-6'>
        {/* Title Section */}
        <div className='text-center mb-8'>
          <Title text1='RELATED' text2='PRODUCTS' />
          <p className='text-sm text-gray-500 max-w-xl mx-auto'>
            Discover similar products you might also love based on your current selection.
          </p>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {related.length > 0 ? (
            related.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500'>No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
