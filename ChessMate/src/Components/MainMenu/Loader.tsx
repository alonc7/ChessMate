import React from 'react';
import Lottie from 'lottie-react';
import loader from '../../../public/assets/Lottie/loading.json';
import './Loader.css'; // Import the CSS file

const Loader: React.FC = () => {
  return (
    <div className='loading-container'>
      <div className='loading-inner-container'>
        <Lottie
          animationData={loader}
          loop={true}
        />
        <p className="messageText">
          Waiting on other player to join
        </p>
      </div>
    </div>
  );
}

export default Loader;
