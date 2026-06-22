import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import axios  from 'axios'
import { removeUser } from '../utils/userReducer'
const NavBar = () => {
    const user = useSelector((store)=>store.user)
    const countConnection = useSelector((store)=>store.connection.value)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async()=>{
        try{
            const res = await axios.get("/api/logout",{withCredentials:true})
            if(res.status == 200){
                dispatch(removeUser())
                navigate("/login")
            }
        }
        catch(err){
            console.log(err.message)
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex gap-2 p-4">
               {user && <div className="dropdown dropdown-end ">
                   <div className='flex items-center gap-2'>
                    <p>Welcome {user.firstName}</p>
                     <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.photoURL} />
                        </div>
                    </div>
                   </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                            </Link>
                        </li>
                        <li><Link to="/connection">Connection
                            <span className='badge'>{countConnection?.length}</span>
                        </Link></li>
                        <li><Link to="/request">Reuquest 
                            <span className="badge">New</span>
                        </Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default NavBar
