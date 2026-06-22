import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { setFeed, removeUserFromFeed } from "../utils/feedReducer"
const Feed = () => {
  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const fetchFeed = async () =>{
    try{
      const res = await axios.get("http://localhost:7777/feed", { withCredentials: true }) 
      dispatch(setFeed(res.data.users))
    }catch(err){
      console.log(err?.message)
    }
  }
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    else{
      fetchFeed()
    }
  }, []);
  if(feed?.value?.length==0){
    return <h1 className="flex justify-center my-10 ">No User Found</h1>
  }
  const handleRequest = async (status,id) =>{
    try{
      const res = await axios.post(`http://localhost:7777/request/send/${status}/${id}`,{},{withCredentials:true})
      dispatch(removeUserFromFeed(id))
    }
    catch(err){
      console.log(err?.message)
    }
  }
  const currentUser = feed?.value?.[0];
  return (
    <div>
      {!currentUser ? (
        <div className="h-screen w-1/3 absolute left-1/2 -translate-x-1/2 rounded-xl overflow-hidden bg-cover bg-center flex items-end justify-center">
          <p>Here no such Cards</p>
        </div>
      ) : (
        <div
          key={currentUser._id}
          className="h-screen w-1/3 absolute left-1/2 -translate-x-1/2 rounded-xl overflow-hidden bg-cover bg-center flex items-end"
          style={{
            backgroundImage: `url(${currentUser.photoURL})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 p-6 text-white">
            <h2 className="text-3xl font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </h2>

            <p>{currentUser.gender}</p>
            <p>Age: {currentUser.age}</p>
            <p>{currentUser.about}</p>
          </div>
        </div>
      )}

      <button className="py-3 px-4 bg-red-400 rounded-xl absolute left-1/4 top-1/2 cursor-pointer"
      onClick={()=>handleRequest("ignored",currentUser._id)}>
        Ignored
      </button>

      <button className="py-3 px-4 bg-blue-400 rounded-xl absolute right-1/4 top-1/2 cursor-pointer" onClick={()=>handleRequest("interested",currentUser._id)}>
        Interested
      </button>
    </div>
  );
};

export default Feed;