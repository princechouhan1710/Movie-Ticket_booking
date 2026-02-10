import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
 
export default function ProtectedRoute({ children }) {
    let [loading, setLoading] = useState(true);
    let nav = useNavigate()
    let check = async () => {
        setLoading(true)
        try {
            let { data } = await axios.get("/api/admin/profile", { withCredentials: true });
            
            if (data.success) {
                
                setLoading(false)
            } else {
                console.log(data.message)
                nav("/loginadmin")
            }
        } catch (error) {
            console.log(error?.response?.message)
            nav("/loginadmin")
        }
    }
    useEffect(() => {
        check()
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])
    return (
        <div>
            {loading ? "loading" : children}
        </div>
    )
}
 
   