import React, { useContext, useEffect, useState } from 'react'
import { theatrescontext } from '../App'

function AllTheaters() {
  let { theatres } = useContext(theatrescontext);
    return (
    <>
      <div className="p-10 max-w-5xl mx-auto space-y-8">
    <div className="space-y-10">
          {theatres.map((v, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-5">
                  <img
                    src={v.image.url}
                    alt=""
                    className="w-14 h-14 rounded-full border shadow"
                  />
                  <div>
                    <p className="text-xl font-bold">{v.name} , {v.location} , {v.city}</p>
                    <p className="text-sm text-gray-500">Non-cancellable</p>
                  </div>
                </div>

                <p className="text-2xl cursor-pointer">🤍</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}

export default AllTheaters;
