import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
export default function Dashboard() {
    return (
        <div className='flex w-full flex-col sm:flex-row h-full xl:w-full xl:m-auto 2xl:w-[1440px] '>
            <Sidebar    />
            <div className="main w-full   overflow-auto h-screen ">
                <Outlet />
            </div>
        </div>
    )
}
