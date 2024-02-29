import React from 'react'
import Feed from "./Feed"
import {Link, useNavigate} from "react-router-dom"
import { logout } from '../slices/reducers/authSlice';
import { useDispatch } from 'react-redux';

export const Navbar = ({userData}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        navigate('/');
        console.log('click');
      };

  
    return (


<nav className="nav-container"> 
  <div className="sidenav">
    <div className="upper-nav-menu">
      <p className='menu-text'>MENU</p>
      {/* <Link to={`/articleHistory/${userData.userData._id}`} className="nav-item" aria-current="page"> */}
      <Link to={`/archive`} className='nav-item' aria-current='page'>
        <span>
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 3.25H6.75a2.43 2.43 0 0 0-2.5 2.35V18a2.85 2.85 0 0 0 2.94 2.75H19a.76.76 0 0 0 .75-.75V4a.76.76 0 0 0-.75-.75Zm-.75 16H7.19A1.35 1.35 0 0 1 5.75 18a1.35 1.35 0 0 1 1.44-1.25h11.06Zm0-4H7.19a3 3 0 0 0-1.44.37V5.6a.94.94 0 0 1 1-.85h11.5Z"/>
            <path fill="currentColor" d="M8.75 8.75h6.5a.75.75 0 0 0 0-1.5h-6.5a.75.75 0 0 0 0 1.5Zm0 3.5h6.5a.75.75 0 0 0 0-1.5h-6.5a.75.75 0 0 0 0 1.5Z"/>
          </svg>
        </span>History</Link>
      <Link to={`/feed`} className="nav-item" aria-current="page">
        <span>
          <svg className='nav-icon article-icon' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-width="2" d="M16 7h3v4h-3V7Zm-7 8h11M9 11h4M9 7h4M6 18.5a2.5 2.5 0 1 1-5 0V7h5.025M6 18.5V3h17v15.5a2.5 2.5 0 0 1-2.5 2.5h-17"/>
          </svg>
        </span>Article</Link>
      {/* <Link to={`/articleHistory/${userData.userData._id}`} className="nav-item" aria-current="page"> */}
      <Link to={`/articleHistory`} className="nav-item" aria-current="page">
        <span>
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 20q1.875 0 3.188-1.313T16.5 15.5q0-1.875-1.313-3.188T12 11q-1.875 0-3.188 1.313T7.5 15.5q0 1.875 1.313 3.188T12 20ZM9.075 9.7q.5-.275 1.063-.437t1.137-.213L8.75 4h-2.5l2.825 5.7ZM6.4 18.8q-.425-.725-.663-1.563T5.5 15.5q0-.9.238-1.738T6.4 12.2q-1.05.35-1.725 1.238T4 15.5q0 1.175.675 2.063T6.4 18.8Zm11.2 0q1.05-.35 1.725-1.238T20 15.5q0-1.175-.675-2.063T17.6 12.2q.425.725.663 1.563T18.5 15.5q0 .9-.238 1.738T17.6 18.8ZM12 22q-1 0-1.913-.288T8.4 20.925q-.225.05-.45.063T7.475 21Q5.2 21 3.6 19.4T2 15.525Q2 13.35 3.45 11.8t3.575-1.725l-3.3-6.625q-.25-.5.038-.975T4.625 2h4.15q.575 0 1.038.3t.737.8L12 6l1.45-2.9q.275-.5.738-.8t1.037-.3h4.15q.575 0 .863.475t.037.975L17 10.025q2.125.2 3.563 1.75T22 15.5q0 2.3-1.6 3.9T16.5 21q-.225 0-.463-.013t-.462-.062q-.775.5-1.675.788T12 22Zm0-6.5ZM9.075 9.7L6.25 4l2.825 5.7ZM12 16.85l-1.225.925q-.15.125-.3.013t-.1-.288l.475-1.525l-1.225-.875q-.15-.125-.1-.288t.25-.162h1.5l.475-1.625q.05-.175.25-.175t.25.175l.475 1.625h1.5q.2 0 .25.163t-.1.287l-1.225.875l.475 1.525q.05.175-.1.288t-.3-.013L12 16.85Zm2.925-7.15l2.85-5.7H15.25l-2.125 4.25l.475.95q.35.1.675.213t.65.287Z"/>
          </svg>  
        </span>Leaderboard</Link>   
    </div>
    <div className="lower-nav-menu">
      <button onClick={logoutHandler} className="logout-btn" aria-current="page">LOGOUT</button> 
    </div>
  </div>
</nav>
)}

export default Navbar;

