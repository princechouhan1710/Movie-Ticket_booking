import React from 'react'

function FrequentlyAskedQuestion() {
  return (
    <div className=' flex flex-col gap-5 xl:w-[1000px] xl:m-auto'>
      <div className='font-medium '>How do I book movie tickets on Ticket Wala?</div>
      <div className='text-slate-700 text-base'>You can book tickets by selecting your movie, choosing a theatre and showtime, picking your seats, and completing the payment through our secure checkout.</div>
    <div className='font-medium '>Do I need an account to book tickets?</div>
      <div className='text-slate-700 text-base'>No, you can book as a guest. However, creating an account helps you track orders and get faster checkout next time.</div>
    <div className='font-medium '>How will I receive my ticket after booking?</div>
      <div className='text-slate-700 text-base'>After successful payment, your ticket will be:</div>
      <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />Available in My Orders</p>
      <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />Sent to your registered email / WhatsApp (if enabled)</p>
    <div className='font-medium '>Can I cancel or modify my ticket?</div>
      <div className='text-slate-700 text-base'>Cancellation and modification depend on theatre policy. If cancellation is allowed, you can cancel from the Orders section before showtime.</div>
    <div className='font-medium '>When will I get my refund after cancellation?</div>
      <div className='text-slate-700 text-base'>Refunds are usually processed within 3–7 working days to your original payment method.</div>
    <div className='font-medium '>What payment methods are supported?</div>
      <div className='text-slate-700 text-base'>We support:</div>
       <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />UPI</p>
      <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />Debit/Credit Cards</p>
       <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />Net Banking</p>
      <p className='flex items-center gap-3 text-slate-700'> <div className="w-1.5 h-1.5 bg-black rounded-full" />Wallets</p>
     
    
    </div>
  )
}

export default FrequentlyAskedQuestion
