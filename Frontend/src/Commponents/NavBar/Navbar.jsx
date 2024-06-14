import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { BsHandIndexThumb } from "react-icons/bs";
import { useRef } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let userRef = useRef()
  let userIdRef= useRef()
  
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    console.log(token);
    userRef.current = decodedToken.user;
    userIdRef.current= decodedToken._id;
    console.log(userRef);
    console.log(userIdRef)
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  function profile() {
    if(userRef.current==='Candidate')
    navigate(`/candidate/${userIdRef.current}`);
    else{
      navigate(`/voter/${userIdRef.current}`);
    }
  }

  return (
    <nav className="nav">
      <h1 className="logo"><BsHandIndexThumb />V<IoMdCheckmarkCircleOutline />teWise</h1>
      <ul className='list'>
        {token ? (
          <>
            <li><Link to="/"> <button className="btn">HOME</button></Link></li>
            <li><button className="btn" onClick={logout}>LOGOUT</button></li>
            <li><button className="btn" onClick={profile}>PROFILE</button></li>
          </>
        ) : (
          <li><Link to='/login'><button className="btn">LOGIN</button></Link></li>
        )}
        <li><Link to="/allcandidate"><button className="btn">ALL CANDIDATES</button></Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
