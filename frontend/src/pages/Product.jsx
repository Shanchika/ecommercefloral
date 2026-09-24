import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  useEffect(() => {
    const matchedProduct = products.find((item) => item._id === productId);
    if (matchedProduct) {
      setProductData(matchedProduct);
      setImage(matchedProduct.image[0]);
      window.scrollTo(0, 0); // scroll to top on product change
    } else {
      setProductData(null);
    }
  }, [productId, products]);

  if (!productData) return <div className="text-center py-20 text-gray-400">Loading product...</div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-8'>
      {/* Product Data */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-start sm:w-[18%] w-full gap-2'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[60px] sm:w-full rounded-md border cursor-pointer hover:border-green-500 transition'
                alt={`Thumb ${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%] flex items-center justify-center'>
            <img className='max-h-[400px] object-contain border rounded-lg p-2' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className='sm:w-1/2'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} alt="star" className='w-4' />)}
            <img src={assets.star_dull_icon} alt="star" className='w-4' />
            <p className='pl-2 text-gray-500'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium text-green-600'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <button onClick={()=>addToCart(productData._id)  } className='bg-black text-white px-8 py-3 mt-6 text-sm rounded hover:bg-green-700 transition'>
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 space-y-1'>
            <p>✅ 100% original product.</p>
            <p>🚚 Cash on delivery available.</p>
            <p>🔁 Easy return and exchange within 5 hours.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm bg-gray-100'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
          <p>An e-commerce website is an online platform that facilitates the buying and selling of goods or services over the internet.</p>
          <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and customer reviews to help users make informed purchasing decisions.</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
