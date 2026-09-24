import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.product || response.data.products || []);
        setFilteredList(response.data.product || response.data.products || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch the product list');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = list.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredList(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredList(list);
  };

  const removeProduct = async (productId) => {
    try {
      const response =await axios.delete(`${backendUrl}/api/product/delete/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      
      if (response.data.success) {
        toast.success('Product deleted successfully!');
        setList(list.filter((item) => item._id !== productId));
        setFilteredList(filteredList.filter((item) => item._id !== productId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold text-center text-black mb-6 tracking-tight">Product List</h2>
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredList.length > 0 ? (
        <div className="space-y-6">
          {filteredList.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <p className="text-black font-semibold">{index + 1}</p>
              <img className="w-20 h-20 object-cover rounded-lg shadow-sm" src={item.image[0]} alt={item.name} />
              <div className="flex-1 ml-6">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-500">{item.category}</p>
                <p className="mt-2 text-lg font-bold text-black">{currency}{item.price}</p>
                <p className="mt-1 text-sm text-gray-600">Count: {item.count}</p>
              </div>
              <div className="flex gap-4">
                <Link to={`/admin/update/${item._id}`}>
                  <button className="bg-pink-600 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:bg-pink-700 transition-all duration-200">
                    Update
                  </button>
                </Link>
                <p onClick={() => removeProduct(item._id)} className="cursor-pointer text-sm text-red-500 hover:text-red-600 transition-all duration-200">
                  Delete
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No products available</p>
      )}
    </>
  );
};

export default List;
