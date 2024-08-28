import React from 'react';
import Header from '../components/Header';
import Chart from '@/components/Chart';

const Dashboard = () => {
    return (
        <div className='font-poppins'>
            <Header />
            <div className='flex justify-center'>
            <div className=" h-auto w-auto px-10">
                <h1 className='text-3xl font-medium mb-5 pt-12'>Revenue Report</h1>
                <p className='text-xl'>Here, you'll find a comprehensive overview of your business metrics. Stay informed with key performance indicators and financial insights.</p>
               
               
                <Chart />
            </div>

            </div>
           
        </div>
    );
}

export default Dashboard;
