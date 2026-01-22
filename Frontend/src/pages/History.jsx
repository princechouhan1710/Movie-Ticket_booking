import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

function History() {
  const [profile, setProfile] = useState(false)
  return (
    <div className='h-screen'>
      <div className='w-full h-[87%] text-center flex flex-col items-center justify-center text-4xl'>
        <img src="https://images.openai.com/thumbnails/url/iilVPXicu5mVUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4K8vfNSnd2rLL0KgvJzM9L9QpPdc90r4wszfN0raxIcTRMrsw2CfBw9i-pyLJM8_MOUysGAJbeJx4?utm_source=chatgpt.com" alt="" className='w-[20%]' />
        No Booking Yet
      </div>

    </div>
  )
}

export default History
