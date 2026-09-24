import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div >
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40  text-sm'>
         
         <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            floral shop offers a variety of fresh flowers, custom bouquets, and event decorations for special occasions. It provides personalized services like flower subscriptions, gift wrapping, and message cards. With an online ordering system, customers can easily browse, purchase, and schedule deliveries
            </p>
         </div>
         <div>
               <p className='text-xl font-medium mb-5'>COMPANY</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>AboutUs</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
               </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUGH</p>
            <ul className='flex flex-col gap-1  text-gray-600'>
                <li>0778383248</li>
                <li>Rosefloral@gmail.com</li>
            </ul>
        </div>

    </div>
          <div>
            <hr/>
            <p className='py-5 text-sm text-center'>copyright 2024@ forever.com-All right Reserved.</p>
          </div>
    </div>
  )
}

export default Footer
 