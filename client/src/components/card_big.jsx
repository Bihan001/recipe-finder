import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import spoon_fork from '../images/spoon_fork.png';
import food4 from '../images/food4.jpg';

const CardBig = ({ data }) => {
  return (
    <Fragment>
      <div className='cards2two'>
        <div className='cards2-within1two'>
          <img
            src={logo}
            height='24'
            width='36'
            className='icontwo'
            style={{ posiiton: 'relative', top: '5px', opacity: '65%' }}
          />
          <div className='cards2-headingtwo'>{data.ownerName}</div>
        </div>
        <img
          src={data.image ? data.image : spoon_fork}
          className='card2-imagetwo'
        />
        <div className='cards2-within2two'>
          <Link to={`/recipe/${data._id}`} id='nounderline'>
            {data.recipeName.length > 20
              ? data.recipeName.slice(0, 20) + '...'
              : data.recipeName}
          </Link>
        </div>
        <div className='cards2-within3two'>
          {data.description.length > 60
            ? data.description.slice(0, 60) + '...'
            : data.description}
        </div>
        <div className='tagstwo'>
          {data.tags.slice(0, 3).map((tag) => (
            <div className='btn btn-light tagtwo'>
              <Link to='#' style={{ textDecoration: 'none' }}>
                <span>{tag}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CardBig;
