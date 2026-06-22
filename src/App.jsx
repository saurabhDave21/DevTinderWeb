import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Feed from "./Feed";
import Profile from "./Profile";
import Register from "./Register";
import Connection from "./Connection";
import RequestReview from "./RequestReview";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/connection" element={<Connection/>}/>
          <Route path="/request" element={<RequestReview/>}/>
          <Route path="/request/:id" element={<RequestReview/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;