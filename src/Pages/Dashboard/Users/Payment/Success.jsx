import React from 'react';
import { useParams } from 'react-router-dom';

const Success = () => {
    const { tranId } = useParams()
    return (
            <div className='text-center h-[70vh] flex flex-col justify-center align-middle bg-slate-100'>
                <p className='lg:text-5xl text-3xl pb-10'>Your Payment is Successful For </p>
                <p className='text-3xl'>Transaction_id : {tranId}</p>
            </div>
    );
};

export default Success;