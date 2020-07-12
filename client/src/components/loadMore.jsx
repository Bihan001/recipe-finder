import React, { Fragment } from 'react';

const LoadMore = () => {
  return (
    <Fragment>
      <div className='loadingdiv'>
        <div style={{ position: 'relative', top: '20px' }}>
          <button
            className='btn btn-outline-danger my-2 my-sm-0'
            type='submit'
            id='searchbuttonstyle'
          >
            Load More
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default LoadMore;
