import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  
  const{token,setToken,navigate,backendUrl}=useContext(ShopContext)

  const [name,setName]=useState('')
  const [password,setpassword]=useState('')
  const [email,setEmail]=useState('')

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div>
      
    </div>
  )
}

export default Login
