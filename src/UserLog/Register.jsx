import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import img from '../assets/register.png'
import GoogleLogin from "../Pages/Shared/GoogleLogin";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
    const [error, setError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        
        if(data.password !== data.passwordConfirm) {
            setError("Both password should be same");
            return;
        }
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, role:data.role }
                        fetch('https://happy-to-trip-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    setError('')
                                    reset();
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <>
            <Helmet>
                <title>Happy To Trip | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:ps-10 lg:text-left">
                        <h1 className="text-4xl lg:text-5xl text-center lg:pb-10 font-bold">Sign up now!</h1>
                        <img className="rounded-full" src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-warning">Name is required</span>}
                            </div>
                            <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">User Role</span>
                        </label>
                        <select defaultValue="Pick One" {...register("role", { required: true })} className="select select-bordered">
                            <option disabled>Pick One</option>
                            <option>user</option>
                            <option>manager</option>
                        </select>
                    </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-warning">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-warning">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"  {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-warning">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-warning">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-warning">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-warning">Password must have one Uppercase one lower case, one number and one special character.</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt NavLink NavLink-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password"  {...register("passwordConfirm", { required: true })} placeholder="Confirm Password" className="input input-bordered" />
                                {errors.password && <span className="text-warning">Password is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-outline text-green-600 bg-slate-100 border-0 border-b-4 border-r-4 border-green-600" type="submit" value="Sign Up" />
                            </div>
                            <p className='text-error pb-5 text-center'>{error}</p>
                            <p><small>Already have an account?  <NavLink to="/login"><span className="text-green-600 underline">Login</span></NavLink></small></p>
                        </form>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;