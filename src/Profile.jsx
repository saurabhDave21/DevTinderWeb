import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { FiEdit } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import EditProfile from "./EditProfile";
const Profile = () => {
  const user = useSelector((store) => store.user);
  const [modal, setModal] = useState(false)
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {modal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/40 rounded-xl p-6 w-full max-w-md ">
            <EditProfile setModal={setModal} />
          </div>
        </div>
      )}
      <div className="min-h-screen bg-base-200 py-10 px-4">
        <div className="max-w-4xl mx-auto card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-8 items-center">

              <div className="avatar">
                <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>

                <p className="text-base-content/70 mt-2">
                  {user.about || "No bio available"}
                </p>

                <div className="flex gap-2">
                  <Link to="/"><button className="btn btn-neutral btn-outline bg-red-600 text-white py-1 px-3"><IoMdArrowBack /></button></Link>
                  <button className="btn btn-neutral btn-outline bg-blue-500 text-white py-1 px-3" onClick={() => setModal((prev) => !prev)}>Update<FiEdit /></button>
                </div>
              </div>
            </div>

            <div className="divider">Profile Details</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">First Name</h3>
                <p>{user.firstName}</p>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">Last Name</h3>
                <p>{user.lastName}</p>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">Email</h3>
                <p>{user.emailId}</p>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">Age</h3>
                <p>{user.age}</p>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">Gender</h3>
                <p>{user.gender}</p>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg">Skills</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skils?.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-base-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p>{user.about}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;