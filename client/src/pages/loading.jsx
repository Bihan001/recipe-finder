import React from 'react';
import Load from '../images/loading.gif';

const Loading = () => {
  return (
    <div>
      <center style={{ marginTop: '30vh' }}>
        <img src={Load} />
      </center>
    </div>
  );
};

export default Loading;
