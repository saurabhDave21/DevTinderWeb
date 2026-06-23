import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionReducer';
import axios from "axios"
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { BASE_URL } from '../utils/Constant';
const Connection = () => {
  const dispatch =useDispatch()
  const allConnection = useSelector((store)=>store.connection.value)
  const getConnection = async ()=>{
    try{
        const res = await axios.get(BASE_URL+"/user/request/connection",{
                withCredentials: true,
            })
        dispatch(addConnection(res.data.data))
    }
    catch(err){
        console.log(err)
    }
  }
  useEffect(()=>{
    getConnection()
  },[])
  if(!allConnection) return;
  if(allConnection.length === 0) return <p className='text-center text-xl'>No user Found</p>
  return (
    <>
      <Link to="/"><button className="btn btn-neutral btn-outline bg-red-600 text-white py-1 px-3 mx-5"><IoMdArrowBack /></button></Link>
    <h1 className='text-center text-2xl mt-5'>All Connection</h1>
    <div className='flex flex-col items-center justify-center p-4 gap-4'>
            {allConnection?.map((e,index)=>{
                return (
                    <div className='w-1/2 rounded-xl border p-14 flex' key={index}>
                        <div className='w-1/5'>
                        <img src={e.photoURL} alt="Photo" className='rounded-full h-20 w-20'/>
                        </div>
                        <div className='w-full'>
                            <p className='text-xl font-bold'>{e.firstName + " " + e.lastName}</p>
                            <p className='text-lg font-semibold text-gray-300'>{e.about}</p>
                            <p className='text-sm font-light text-gray-400'> {e.age + ", " + e.gender}</p>
                        </div>
                    </div>
                )
            })}
    </div>
    </>
  )
}

export default Connection
