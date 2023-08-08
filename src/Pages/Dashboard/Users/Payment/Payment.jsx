import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";;
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Payment = () => {
    const SingleHotel = useLoaderData();
    console.log(SingleHotel);
    const PriceInitial = SingleHotel?.price;
    const Price = parseFloat(PriceInitial?.toFixed(2))

    const { name, image, email, _id } = SingleHotel;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const handleDelete = (SingleHotel) => {
        fetch(`http://localhost:5000/bookings/${SingleHotel._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {

                }
            })
    }
    const handleUpdate = (SingleHotel) => {
        fetch(`http://localhost:5000/bookings/${SingleHotel.SelectedId}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                }
            })
    }
    const onSubmit = (data) => {
        data.productId = _id,
            data.date = new Date(),
            data.image = image,
            data.email = email,
            data.price = Price
        console.log(data);

        fetch(`http://localhost:5000/order`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                window.location.replace(data.url)
            })
        handleUpdate(SingleHotel);
        handleDelete(SingleHotel);
    };

    return (
        <>
            <div className="bg-gray-200 h-[90vh] rounded-md">
                <Helmet>
                    <title>Dashboard | Payment</title>
                </Helmet>
                <div className="w-11/12 mx-auto py-5">
                    <h1 className="btn text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-yellow-500 to-red-600  btn-ghost normal-case font-bold text-2xl">
                        Pay for {name}
                    </h1>

                    <div className=" flex  gap-5 justify-center items-center" >
                        <div className="text-gray-600 text-base font-medium mt-2 w-2/3 space-y-3 ">
                            <h2>{name}</h2>
                            <p>Price : ${Price}</p>
                            <p>Email: {email}</p>
                        </div>
                        <div className="overflow-hidden w-40">
                            <img
                                className="w-full rounded-md h-32"
                                src={image}
                                alt=""
                            />
                        </div>

                    </div>
                    <div className="py-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" action="">
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="number"
                                    >
                                        Mobile Number
                                    </label>
                                    <input
                                        {...register("number", { required: true })}
                                        type="number"
                                        name="number"
                                        id=""
                                        placeholder="Mobile No."
                                        defaultValue='0123456789'
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                    />
                                    {errors.number && (
                                        <p className="text-red-600 text-sm font-normal">
                                            Please give mobile number!
                                        </p>
                                    )}
                                </div>
                                <div className="w-1/2">
                                    <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="name"
                                    >
                                        Post Code
                                    </label>
                                    <input
                                        {...register("postCode", { required: true })}
                                        type="number"
                                        name="postCode"
                                        id=""
                                        placeholder="Post Code"
                                        defaultValue='1280'
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                    />
                                    {errors.postCode && (
                                        <p className="text-red-600 text-sm font-normal">
                                            Please give Post Code!
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1/2">
                                <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="bookingDays"
                                    >
                                        Number of days
                                    </label>
                                    <input
                                        {...register("bookingDays", { required: true })}
                                        type="number"
                                        name="bookingDays"
                                        id=""
                                        placeholder="Booking Days"
                                        defaultValue='3'
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                    />
                                    {errors.bookingDays && (
                                        <p className="text-red-600 text-sm font-normal">
                                            Please give Booking Days!
                                        </p>
                                    )}
                                </div>
                                <div className="w-1/2">
                                <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="bookingDays"
                                    >
                                        Number of days
                                    </label>
                                    <input
                                        {...register("bookingDate", { required: true })}
                                        type="date"
                                        name="bookingDate"
                                        id=""
                                        placeholder="Booking Days"
                                        defaultValue='3'
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                    />
                                    {errors.bookingDate && (
                                        <p className="text-red-600 text-sm font-normal">
                                            Please give Booking Date!
                                        </p>
                                    )}                                    
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-1/2">
                                    <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="currency"
                                    >
                                        Currency
                                    </label>

                                    <select
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                        {...register("currency", { required: true })}
                                    >
                                        <option disabled>
                                            Select One
                                        </option>
                                        <option value='BDT'>BDT</option>
                                        <option value='USD'>USD</option>
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label
                                        className="font-medium text-base text-gray-600 py-2"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                    <input
                                        {...register("address", { required: true })}
                                        type="text"
                                        name="address"
                                        id=""
                                        placeholder="Write Your Address"
                                        defaultValue='Dhaka,BD'
                                        className="w-full py-1 px-4 rounded-md border border-gray-400"
                                    />
                                    {errors.address && (
                                        <p className="text-red-600 text-sm font-normal">
                                            Please give your Address!!
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                className="btn btn-outline w-full text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600"
                                type="submit"> Pay Bill
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Payment;