import React, { useState, createContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = 'LKR';
    const delivery_fee = 200;
    const backendUrl = "http://localhost:4000";
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProduct] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [cartItems,setCartItems]=useState({});

    const addToCart = async(itemId)=>{
         
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId]){
                cartData[itemId] += 1;
            }
            else{
                cartData[itemId] = 1;
            }
        }
        else{
            cartData[itemId] ={}
            cartData[itemId] =1;
        }
        setCartItems(cartData);
    }

    const getCartCount=()=>{
        let totalCount =0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
             try {
                if(cartItems[items][items]>0){
                    totalCount+=cartItems[items][item];}
             } catch (error) {
                
                    }
                 }
            }
            return totalCount;
         }
       
    
    

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProduct(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        backendUrl, setToken, token, navigate,
        cartItems,addToCart,getCartCount
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );

};

export default ShopContextProvider;
