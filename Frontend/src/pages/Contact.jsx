import React from 'react'

function Contact() {
  return (
    
    <div className=' flex flex-col gap-5 xl:w-[1000px] xl:m-auto border border-slate-300 rounded-2xl p-5 '>
      <h2 className='font-bold text-3xl py-4'>Contact Us</h2>
      <div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>Send your Feedback</p>
      <p>123 Business Street Block -B ,Secound Floor,Navis Presidium, Near Rau-Dewas Bypass
Indore, Madhya Pradesh, 456091
India</p>
      </div>
<hr className='text-gray-300 ' />
 <div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>Support services(24x7)</p>
      <div className='flex flex-col gap-1 px-5'>
        <p className='text-blue-600 '> support@ticketwala.com</p>
      <p className='text-blue-600 '> +91 9456314429</p>
      </div>
      </div>
<hr className='text-gray-300 ' />
<div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>Career opportunities</p>
       <div className='flex flex-col gap-1 px-5'>
        <p className='text-blue-600 '>job@ticketwala.com</p>
      </div>      
      </div>
<hr className='text-gray-300 ' />
<div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>To advertise in the site</p>
       <div className='flex flex-col gap-1 px-5'>
        <p className='text-blue-600 '>advertise@ticketwala.com</p>
      </div>      
      </div>
<hr className='text-gray-300 ' />
<div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>Theater owners/Event organisers want to sell tickets</p>
       <div className='flex flex-col gap-1 px-5'>
        <p className='text-blue-600 '>sell@ticketwala.com</p>
      </div>      
      </div>
<hr className='text-gray-300 ' />
<div className='flex flex-col gap-3 px-2'>
        <p className='font-medium text-lg'>To build business alliance</p>
        <p>If you would like to build business alliance with us and have  an interesting proposal,please contact us at</p>
       <div className='flex flex-col gap-1 px-5'>
        <p className='text-blue-600 '>marketing@ticketwala.com</p>
      </div>      
      </div>
    </div>
  )
}

export default Contact
