import React, { Fragment } from 'react';

import logo from '../images/logo.svg';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-expand-md navbar-light  py-1'>
        <img src={logo} id='animationlogo' height='28' width='30' />
        <a className='navbar-brand' id='heading' href='#'>
          Recipes
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            <li>
              <a className='nav-link' href='#'>
                <span className='ss1'>Home</span>{' '}
                <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li>
              <a className='nav-link' href='#'>
                <span className='ss1'>Browse</span>
              </a>
            </li>
            <li>
              <a className='nav-link' href='#'>
                <span className='ss1'>About</span>
              </a>
            </li>
          </ul>
          <form className='form-inline my-2 my-lg-0'>
            <input
              className='form-control mr-sm-2'
              type='search'
              placeholder='Search'
              aria-label='Search'
              id='searchstyle'
            />
          </form>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
