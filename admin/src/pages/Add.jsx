import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Rose bouquet');
  const [subCategory, setSubCategory] = useState('BirthDay&Gratuation');
  const [bestseller, setBestseller] = useState(false);
  const [count, setCount] = useState('');

  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = 'Product name is required.';
    if (!description) newErrors.description = 'Product description is required.';
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Valid product price is required.';
    if (!category) newErrors.category = 'Product category is required.';
    if (!subCategory) newErrors.subCategory = 'Sub-category is required.';
    if (!count || isNaN(count) || count < 0) newErrors.count = 'Valid product count is required.';
    if (!image1 && !image2 && !image3 && !image4) newErrors.images = 'At least one image is required.';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Image upload handler
  const handleImageChange = (e, setImageState) => {
    const file = e.target.files[0];
    setImageState(file);
  };

  // Cleanup object URLs on component unmount or state change
  useEffect(() => {
    return () => {
      [image1, image2, image3, image4].forEach((image) => {
        if (image) URL.revokeObjectURL(image);
      });
    };
  }, [image1, image2, image3, image4]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('count', count);

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice('');
        setCount('');
        setErrors({});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-center gap-4 p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Add Product</h2>

      {/* Image Upload Section */}
      <div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Upload Images</p>
        <div className="flex gap-4 justify-center">
          {['image1', 'image2', 'image3', 'image4'].map((image, index) => {
            const imageState = eval(image); // Remove eval() use if refactored
            return (
              <label key={index} htmlFor={image} className="w-20 cursor-pointer">
                <img
                  className="w-full h-20 object-cover border-2 border-gray-300 rounded-md"
                  src={imageState ? URL.createObjectURL(imageState) : assets.upload_area}
                  alt={`Upload ${image}`}
                />
                <input
                  type="file"
                  id={image}
                  hidden
                  onChange={(e) => handleImageChange(e, eval(`set${image.charAt(0).toUpperCase() + image.slice(1)}`))}
                />
              </label>
            );
          })}
        </div>
        {errors.images && <span className="text-red-500 text-sm">{errors.images}</span>}
      </div>

      {/* Product Name */}
      <div className="w-full">
        <label className="block mb-2 text-gray-700">Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-4 py-2 border-2 ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          required
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>

      {/* Product Description */}
      <div className="w-full">
        <label className="block mb-2 text-gray-700">Product Description</label>
        <textarea
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full px-4 py-2 border-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          required
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
      </div>

      {/* Category and Sub-category */}
      <div className="w-full flex gap-4">
        <div className="w-1/2">
          <label className="block mb-2 text-gray-700">Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 border-2 ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="Rose bouquet">Rose bouquet</option>
            <option value="Gift bouquet">Gift bouquet</option>
            <option value="Multi flower bouquet">Multi flower bouquet</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
        </div>

        <div className="w-1/2">
          <label className="block mb-2 text-gray-700">Sub-category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className={`w-full px-4 py-2 border-2 ${errors.subCategory ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="BirthDay&Gratuation">Birthday & Graduation</option>
            <option value="Love">Love</option>
            <option value="Wedding">Wedding</option>
          </select>
          {errors.subCategory && <span className="text-red-500 text-sm">{errors.subCategory}</span>}
        </div>
      </div>

      {/* Product Count */}
      <div className="w-full">
        <label className="block mb-2 text-gray-700">Product Count</label>
        <input
          type="number"
          placeholder="Enter product count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className={`w-full px-4 py-2 border-2 ${errors.count ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          required
        />
        {errors.count && <span className="text-red-500 text-sm">{errors.count}</span>}
      </div>

      {/* Price */}
      <div className="w-full">
        <label className="block mb-2 text-gray-700">Product Price</label>
        <input
          type="number"
          placeholder="Enter product price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`w-full px-4 py-2 border-2 ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          required
        />
        {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
      </div>

      {/* Bestseller Option */}
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="accent-pink-500"
        />
        <label htmlFor="bestseller" className="text-gray-700 cursor-pointer">
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full py-3 mt-4 bg-pink-500 text-white rounded-md hover:bg-pink-600">
        Add Product
      </button>
    </form>
  );
};

export default Add;
