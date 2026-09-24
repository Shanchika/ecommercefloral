import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className='text-gray-700 cursor-pointer block'>
      <div className='overflow-hidden rounded-md shadow bg-white p-3 hover:shadow-lg transition'>
        {/* Image Container */}
        <div className='w-full h-48 bg-white rounded-md flex items-center justify-center'>
          <img
            src={image.length > 0 ? image[0] : 'default-image.jpg'}
            alt={name || "Product image"}
            className='max-h-full max-w-full object-contain'
          />
        </div>

        {/* Product Info */}
        <div className='mt-2 text-center'>
          <p className='text-sm font-medium truncate'>{name}</p>
          <p className='text-sm font-semibold text-pink-600'>{currency}{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
