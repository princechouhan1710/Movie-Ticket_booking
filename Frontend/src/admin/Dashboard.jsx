import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function Dashboard() {
    return (
        <div className='flex w-full h-full'>
            <Sidebar />
            <div className="main w-full   overflow-auto h-screen">
                <Outlet />
            </div>
        </div>
    )
}
