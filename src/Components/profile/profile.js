import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../navbars/TopNav';
import './Profile.css';

const ProfileComponent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '**********',
  });

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        setUser({
          email: storedUser.email || '',
          password: '**********',
        });
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='profile-container'>
      <TopNav />
      <div className='profile'>
        <p className='logout' onClick={handleLogout}>Log Out</p>
        <div className='admin-details'>
          <h3>Admin Details</h3>
          <div>
            <p>Name : <span>Teefey Owner</span></p>
            <p>Email : <span>{user.email}</span></p>
            <p>Phone Number : <span>+234 812 234 5445</span></p>
            <p>Password : <span>{user.password}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
