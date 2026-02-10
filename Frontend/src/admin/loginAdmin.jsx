import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
export default function LoginAdmin() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let nav = useNavigate()
    let submitHandler = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post("/api/admin/login", { email, password }, { withCredentials: true })
              if (data.success) {
                nav("/dashboard")
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error?.response?.message)
        }
    }
    return (
        <div>
          <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="bg-blue-600 text-white text-center font-bold py-4 text-xl">
      Login
    </div>
    <form onSubmit={submitHandler} className="p-6 flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Email</label>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mt-2"
      >
        Submit
      </button>
    </form>
  </div>
</div>

        </div>
    )
}
 
 