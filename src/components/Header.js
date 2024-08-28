import React from 'react';
import logo from '../img/Logo.svg';
import Button from './Button';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <div className='header-container'>
        <div className='logo'>
          <img src={logo} alt="Logo" />
        </div>
        <nav>
          <ul className='nav'>
            <li className='nav-item'>
                <Button>Users</Button>
            </li>
            <li className='nav-item'>
                <Button>Sign up</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
