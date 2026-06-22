import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from '../utils/userReducer'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store)=>store.user)
    async function getUser() {
        try {
            if(usesrData) return;
            const user = await axios.get("/api/profile/view",{ withCredentials: true })
            dispatch(addUser(user.data.data))
            navigate("/")  
        }
        catch (err) {
            if(err.response?.status == 400){
                navigate("/login")
            }
            console.log(err)
        }
    }
    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body