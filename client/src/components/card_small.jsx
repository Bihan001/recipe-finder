import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import spoon_fork from '../images/spoon_fork.png';

const CardSmall = ({ slot, data }) => {
  return (
    <Fragment>
      <div className='col-lg-4 col-sm-12 my-col'>
        <img
          src={logo}
          height='28'
          width='30'
          className='icon'
          style={{
            marginLeft: '-4px',
            marginTop: '5px',
            opacity: '30%',
          }}
        />
        <div className='within1'>Top {slot} Recipes</div>
        <img src={data.image ? data.image : spoon_fork} className='cardimage' />
        <Link to={`/recipe/${data._id}`} id='nounderline'>
          <div className='cards'>
            <div className='within2'>{data.recipeName}</div>
            <div className='within3'>{data.description}</div>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default CardSmall;
