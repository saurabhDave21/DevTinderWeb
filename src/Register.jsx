import React from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userReducer"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { Link } from "react-router-dom"
 import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            emailId: "",
            age: "",
            gender: "",
            about: "",
            photoURL: "",
            skils: []
        }
    });
    const onSubmit = async (data) => {
        try {
            data = {
                ...data,
                skils: data.skils.split(",")
            }
            const res = await axios.post("http://localhost:7777/signup", data, { withCredentials: true })
            toast.success("User Register");
            reset()
        }
        catch (err) {
            console.log("Error Message", err.message)
        }
    }
    return (
        <>
        <ToastContainer />
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-base-100 p-6 rounded-xl shadow-lg border flex flex-col gap-4 mt-20 min-h-lvh"
        >
            <h2 className="text-2xl font-bold text-center">Register</h2>
            <div className='w-1/1 flex gap-5'>
                {/*fname*/}
                <div>
                    <label className="label">
                        <span className="label-text">FirstName<span className='text-red-400 '>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your FirstName"
                        className="input input-bordered w-full"
                        {...register("firstName", {
                            required: true,
                        })}
                    />
                </div>
                {/*lname */}
                <div>
                    <label className="label">
                        <span className="label-text">lastName<span className='text-red-400'>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your LastName"
                        className="input input-bordered w-full"
                        {...register("lastName", {
                            required: true,
                        })}
                    />
                </div>
            </div>
            {/*email*/}
            <div>
                <label className="label">
                    <span className="label-text">Email<span className='text-red-400 '>*</span></span>
                </label>
                <input
                    type="text"
                    placeholder="Enter your Email"
                    className="input input-bordered w-full"
                    {...register("emailId", {
                        required: true,
                    })}
                />
            </div>
            {/*password*/}
            <div>
                <label className="label">
                    <span className="label-text">Password<span className='text-red-400 '>*</span></span>
                </label>
                <input
                    type="password"
                    placeholder="Create a Password"
                    className="input input-bordered w-full"
                    {...register("password", {
                        required: true,
                    })}
                />
            </div>
            {/*age*/}

            <div className='w-1/1 flex gap-5'>
                <div>
                    <label className="label">
                        <span className="label-text">Age<span className='text-red-400 '>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Age"
                        className="input input-bordered w-full"
                        {...register("age", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">gender<span className='text-red-400 '>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your Gender"
                        className="input input-bordered w-full"
                        {...register("gender", {
                            required: true,
                        })}
                    />
                </div>
            </div>
            <div>
                <label className="label">
                    <span className="label-text">About</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter About Your Self"
                    className="input input-bordered w-full"
                    {...register("about")}
                />
            </div>
            <div className='w-1/1 flex gap-5'>
                <div>
                    <label className="label">
                        <span className="label-text">PhotoURL<span className='text-red-400 '>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter a photoURL"
                        className="input input-bordered w-full"
                        {...register("photoURL", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">skils<span className='text-red-400 '>*</span></span>
                    </label>
                    <input
                        type="text"
                        placeholder={`Developer,Gamer,Don`}
                        className="input input-bordered w-full"
                        {...register("skils", {
                            required: true,
                        })}
                    />
                </div>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-2">
                Register
            </button>
            <p className='text-gray-400 text-center'>Already have account?<span className='text-[#5f5cff] hover:underline cursor-pointer'><Link to="/login">Login</Link></span></p>
        </form>
        </>
    )
}

export default Register
