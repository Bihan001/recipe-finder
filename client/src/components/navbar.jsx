import React, { Fragment } from 'react';

import logo from '../images/logo.svg';

const Navbar = () => {
  return (
    <Fragment>
      <nav className='navbar navbar-expand-md navbar-light'>
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
          <ul className='navbar-nav '>
            <li>
              <a className='nav-link' href='#'>
                <span className='ss1'>Home</span>{' '}
                <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li>
              <a className='nav-link' href='#'>
                <span className='ss1'>Link</span>
              </a>
            </li>
            <li className='dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <span className='ss1'>Recipes</span>
              </a>
              <span className='dropdownbutton'>
                <div
                  className='dropdown-menu'
                  aria-labelledby='navbarDropdown'
                  id='dropdownmenustyle'
                >
                  <a className='dropdown-item' id='dp1' href='#'>
                    <span className='boldd'>Action</span>
                  </a>
                  <a className='dropdown-item' id='dp2' href='#'>
                    <span className='boldd'>Another action</span>
                  </a>
                  <div className='dropdown-divider'></div>
                  <a className='dropdown-item' id='dp3' href='#'>
                    <span className='boldd'>Something else here</span>
                  </a>
                </div>
              </span>
            </li>
            <li>
              <a
                className='nav-link disabled'
                href='#'
                tabIndex='-1'
                aria-disabled='true'
                id='disablestyle'
              >
                <span className='ss1'>Disabled</span>
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
            <button
              className='btn btn-outline-dark my-2 my-sm-0'
              type='submit'
              id='searchbuttonstyle'
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
