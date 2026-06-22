import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from "../utils/requestreducer"
const RequestReview = () => {
    const dispatch = useDispatch()
    const request = useSelector((store) => store.request)
    const [toast, settoast] = useState(false)
    const fetchRequest = async () => {
        try {
            const res = await axios.get("http://localhost:7777/user/request/received", {
                withCredentials: true,
            })
            dispatch(addRequest(res.data.requests))
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchRequest()
    }, [])
    const handleRequest = async (value, id) => {
        console.log(`http://localhost:7777/request/review/${value}/${id}`)
        try {
            const res = await axios.post(`http://localhost:7777/request/review/${value}/${id}`, {}, { withCredentials: true })
            if (res.status == 200) {
                settoast(true)
                   let timer=setTimeout(()=>{
                        settoast(false)
                   },2000)
                   
                   fetchRequest()   
                   clearTimeout(timmer)
                }
        }
        catch (err) {
            console.log(err.message)
        }
    }
    return (
        <>
            <div className="max-w-3xl mx-auto space-y-4 mt-5">
                <h1 className='text-center text-xl'>All Request </h1>
                 {toast &&  <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Request Action Successfully.</span>
                    </div>
                </div>}
                {request?.value?.map((e, index) => {
                    const { photoURL, gender, age, firstName, lastName, about } = e.fromUserID
                    return (

                        <div
                            key={index}
                            className="bg-base-300 shadow-lg rounded-xl p-4 flex gap-4 items-center border border-base-200"
                        >
                            <div>
                                <img
                                    src={photoURL}
                                    alt="requestPhoto"
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                            </div>

                            <div className="flex-1">
                                <h2 className="text-xl font-semibold">
                                    {firstName} {lastName}
                                </h2>

                                <p className="text-gray-600 mt-1">
                                    {about}
                                </p>

                                <p className="text-sm text-gray-500 mt-2">
                                    {age} years • {gender}
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <button
                                        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
                                        onClick={() => handleRequest("accepted", e._id)}>
                                        Interested
                                    </button>

                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                        onClick={() => handleRequest("rejected", e._id)}>
                                        Rejected
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default RequestReview
