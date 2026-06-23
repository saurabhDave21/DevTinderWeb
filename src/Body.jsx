import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from "react-router-dom"
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { addUser } from '../utils/userReducer'
import { BASE_URL } from '../utils/Constant'

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store)=>store.user)
    async function getUser() {
        try {
            if (userData) return;
            const response = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
            console.log(response);
            dispatch(addUser(response.data.data));
            navigate("/");
        } catch (err) {
            if (err.response?.status === 400) {
                navigate("/login");
            }
            console.log(err?.message);
        }
    }
    useEffect(() => {
        getUser();
    }, [userData, navigate]);
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Body