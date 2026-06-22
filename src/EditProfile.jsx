import React from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from "../utils/userReducer"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react';
import { Link } from "react-router-dom"
 import { ToastContainer, toast } from 'react-toastify';
const EditProfile = ({ setModal }) => {
    const { register, handleSubmit, formState: { errors }, reset ,setValue } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            about: "",
            photoURL: "",
        }
    });
    const dispatch = useDispatch()
    const onSubmit = async (data) => {
        try{
            const res = await axios.patch("/api/profile/edit",data,{withCredentials:true})
            dispatch(addUser(res.data))
            setModal((prev)=>!prev)
        }
        catch(err){
            console.log(err.message)
        }
    }
    const user = useSelector((store)=>store.user)
    useEffect(()=>{
        setValue("firstName",user.firstName)
        setValue("lastName",user.lastName)
        setValue("age",user.age)
        setValue("gender",user.gender)
        setValue("about",user.about)
        setValue("photoURL",user.photoURL)
    },[])
    return (
        <>
            <ToastContainer />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto bg-base-100 p-6 rounded-xl shadow-lg border flex flex-col gap-4 mt-20 "
            >
                <h2 className="text-2xl font-bold text-center">Update Profile</h2>
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
                </div>
               <div className='flex gap-2'>
                 <button type="submit" className="btn btn-primary mt-2">
                    Save Profile
                </button>
                <button className='btn btn-primary mt-2 bg-gray-700 text-white' onClick={()=>setModal((prev)=>!prev)}>Back</button>
               </div>
            </form>
        </>
    )
}

export default EditProfile
