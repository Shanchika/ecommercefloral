import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export default function UpdateProduct() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subCategory: '',
    bestseller: false,
    count: 0,  // Added count field
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.post(`${backendUrl}/api/product/single`, { productId: id }).then(res => {
      if (res.data.success) {
        setFormData(res.data.product);
      } else {
        toast.error(res.data.message);
      }
    }).catch(error => {
      console.error(error);
      toast.error("Failed to fetch product");
    });
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) newErrors.price = "Valid price is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.subCategory) newErrors.subCategory = "Sub-category is required.";
    if (formData.count < 0 || isNaN(formData.count)) newErrors.count = "Valid count is required."; // Validation for count

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await axios.put(`${backendUrl}/api/product/update/${id}`, formData);
      if (res.data.success) {
        toast.success('Product updated successfully!');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 rounded-xl border border-pink-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-black">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold text-black">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.name ? 'border-red-500' : 'border-pink-300'}`} required />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <label className="block font-semibold text-black">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.description ? 'border-red-500' : 'border-pink-300'}`} required />
          {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
        </div>

        <div>
          <label className="block font-semibold text-black">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.price ? 'border-red-500' : 'border-pink-300'}`} required />
          {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
        </div>

        <div>
          <label className="block font-semibold text-black">Category</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.category ? 'border-red-500' : 'border-pink-300'}`} />
          {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
        </div>

        <div>
          <label className="block font-semibold text-black">Sub Category</label>
          <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.subCategory ? 'border-red-500' : 'border-pink-300'}`} />
          {errors.subCategory && <span className="text-red-500 text-sm">{errors.subCategory}</span>}
        </div>

        <div>
          <label className="block font-semibold text-black">Count (Stock)</label>
          <input type="number" name="count" value={formData.count} onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:ring-pink-500 focus:border-pink-500 ${errors.count ? 'border-red-500' : 'border-pink-300'}`} />
          {errors.count && <span className="text-red-500 text-sm">{errors.count}</span>}
        </div>

        <div className="flex items-center space-x-3">
          <input type="checkbox" name="bestseller" checked={formData.bestseller} onChange={handleChange}
            className="accent-pink-600" />
          <label className="font-medium text-black">Mark as Bestseller</label>
        </div>

        <button type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-black py-2 px-4 rounded-lg font-semibold transition">
          💾 Update Product
        </button>
      </form>
    </div>
  );
}
