import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
function Theater() {
    let [theater,setTheater] =useState([])
    let {id} =useParams();
     const now = new Date();
   const gettheatres = async () => {
  try {
    console.log("Theatre ID:", id);
    const { data } = await axios.get(
`http://localhost:4000/api/theatres/filterTheatre/${id}`
    );
    setTheater(data.data);
   
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message);
  }
};

   useEffect(() => {
  gettheatres();
}, [id]); 

    return (
    <div className="p-10 max-w-5xl mx-auto space-y-8">

        <div className="flex gap-6 p-5 bg-white rounded-xl ">
            {console.log(theater)}
          
    {
        theater.map((v,i)=>{
               <div className='flex border  ' key={i}>
            <img src={v?.image?.url} alt="" height={"100px"} width={"100px"}  className='rounded-full'/>
            <div >
                <p className='font-bold text-3xl'>{v?.name} ,location    🤍 </p>
                <p className='text-2xl'>screens </p>
                <p className='text-2xl text-gray-300'>city</p>
                
             </div>
        </div>
        })
    }
       
      </div>
     <div className=''>
        
        <div className="flex items-center gap-4 overflow-x-auto pb-2">
          <p className="text-gray-500 font-semibold px-3 py-1 rounded-full bg-gray-200">
            {now.toLocaleString("default", { month: "short" })}
          </p>

          {[0, 1, 2, 3].map((d) => (
            <div
              key={d}
              className="px-4 py-2 bg-gray-100 rounded-xl shadow text-center hover:bg-blue-100 cursor-pointer"
            >
              <p className="text-xl font-bold">{now.getDate() + d}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          {["Filter", "After 10 PM", "Premium Seats"].map((b) => (
            <button
              key={b}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
            >
              {b}
            </button>
          ))}
        </div>
        <div className="bg-gray-100 flex justify-start gap-8 px-6 py-3 rounded-xl shadow">
          <p className="flex items-center gap-2">
            <span className="w-3 h-3 bg-black rounded-full"></span> Available
          </p>
          <p className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Filling fast
          </p>
          <p className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span> Almost full
          </p>
        </div>



        <div className="flex gap-6 p-5 bg-white rounded-xl shadow">
          
          <img
            src=""
            alt=""
            className="w-18 h-20 object-cover rounded-lg shadow"
          />

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-3xl font-bold">name</p>
              <p className="text-gray-500 text-sm mt-1">
                genre | langauage
              </p>
            </div>


          </div>
        </div>

     </div>
      
    
    </div>
  )}

export default Theater


