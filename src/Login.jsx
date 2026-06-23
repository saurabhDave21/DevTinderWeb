import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from "../utils/userReducer"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import {Link} from "react-router-dom"
import { BASE_URL } from '../utils/Constant';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const res = await axios.post(BASE_URL+"/login", data, {
                withCredentials: true,
            })
            dispatch(addUser(res.data.data))
            navigate("/")
        }
        catch(err){
            console.log(err.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-base-100 p-6 rounded-xl shadow-lg border flex flex-col gap-4 mt-20"
        >
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <div>
                <label className="label">
                    <span className="label-text">Email<span className='text-red-400 '>*</span></span>
                </label>
                <input
                    type="text"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                    })}
                />
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Password<span className='text-red-400'>*</span></span>
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    {...register("password", {
                        required: true,
                        minLength: 6,
                    })}
                />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
                Login
            </button>
            <p className='text-gray-400 text-center'>Don't have account?<span className='text-[#5f5cff] hover:underline cursor-pointer'><Link to="/register">Register</Link></span></p>
        </form>
    );
};

export default Login;