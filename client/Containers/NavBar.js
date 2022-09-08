import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const onProfile = () => {
    navigate('/profile');
  };
  const onSearch = () => {
    navigate('/search');
  };
  const onLogout = () => {
    fetch('/api/auth/logout');
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <div className='navBar'>
      <button onClick={onSearch}>Search</button>
      <button onClick={onProfile}>Profile</button>
      <button onClick={onLogout}>Log out</button>
    </div>
  );
}

export default NavBar;
