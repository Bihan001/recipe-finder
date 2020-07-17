import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import spoon_fork from '../images/spoon_fork.png';

const CardBig = ({ data }) => {
  return (
    <Fragment>
      <div className='cards2two'>
        <div className='cards2-within1two'>
          <div className='cards2-headingtwo'>
            <i class='fas fa-utensils pl-3 pr-2'></i>
            {data.category.charAt(0).toUpperCase() +
              data.category.slice(1).toLowerCase()}
          </div>
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
          {data.description.length >= 40
            ? data.description.slice(0, 40) + '...'
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
