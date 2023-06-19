import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../provider/AuthProvider';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddHotel = () => {
    const { user } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = data => {

        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, location, mngemail, booked, troom, aroom, category, info, rating, status } = data;
                    const newItem = { name, price: parseFloat(price), image: imgURL, email: mngemail, booked: parseFloat(booked), location, category, availableRoom:parseFloat(aroom), totalRoom:parseFloat(troom), rating:parseFloat(rating), info, status }
                    // console.log(newItem)
                    axiosSecure.post('/addedhotel', newItem)
                        .then(data => {
                            // console.log('after posting new Hotel', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Hotel added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })

    };

    return (
        <div className="w-full px-10">
            <Helmet>
                <title>Happy To trip | Add Hotel</title>
            </Helmet>
            <SectionTitle
                heading="Add A Hotel"
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex my-4'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Hotel Name*</span>
                        </label>
                        <input type="text" placeholder='Hotel Name'
                            {...register("name", { required: true, maxLength: 30 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Hotel Image*</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text"> Location</span>
                        </label>
                        <input type="text" placeholder='Location'
                            {...register("location", { required: true, maxLength: 30 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Manager Email*</span>
                        </label>
                        <input type="text" value={user?.email}
                            {...register("mngemail", { required: true, maxLength: 30 })}
                            className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input type="number" defaultValue={4000}
                            {...register("price", { required: true, maxLength: 10 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Booked*</span>
                        </label>
                        <input type="number" value={0}
                            {...register("booked", { required: true, maxLength: 10 })}
                            className="input input-bordered w-full " />
                    </div>
                </div>
                <div className='flex my-4 '>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>Luxury</option>
                            <option>Moderate</option>
                        </select>
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Status*</span>
                        </label>
                        <input type="text" {...register("status", { required: true })} value={'pending'} className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Total Room*</span>
                        </label>
                        <input type="number" defaultValue={40}
                            {...register("troom", { required: true, maxLength: 10 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text">Available Room*</span>
                        </label>
                        <input type="number" defaultValue={35}
                            {...register("aroom", { required: true, maxLength: 10 })}
                            className="input input-bordered w-full " />
                    </div>
                </div>
                <div className='flex my-4 '>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Rating*</span>
                        </label>
                        <input type="text" {...register("rating", { required: true })} defaultValue={'4.5'} className="input input-bordered w-full " />                       
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Info*</span>
                        </label>
                        <input type="text" {...register("info", { required: true })} placeholder='Info.' className="input input-bordered w-full " />
                    </div>
                </div>

                <input className="btn btn-outline text-green-600 w-1/3 mx-auto bg-slate-100 border-0 border-b-4 border-r-4 border-green-600  form-control mt-8 mb-5 " type="submit" value="Add Hotel" />
            </form>
        </div>
    );
};

export default AddHotel;