import React from 'react';
import PropTypes from 'prop-types';
import '../Css/slider.css'; // Create a separate CSS file for styling

const Slider = ({ value }) => {
  const maxRange = 40;
  const percentage = (value / maxRange) * 100;

  const dotStyle = {
    background: 'red',
    borderRadius: '50%',
    position: 'absolute',
    left: `calc(${percentage}% + 10px)`,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    margin:'-14px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  };

  return (
    <div className='d-flex flex-column'>
        <div className='d-flex flex-row'>
            <div>
    <h2 className='mb-4 text-white'> {value}</h2>
    
</div>
    <div >
    {value < 18.5 ? (
        <h6 className='underfed mx-3 my-1'> underweight</h6>
      ) : value >= 18.5 && value <= 24.9 ? (
        <h6 className='healthyfed mx-3 my-1'> healthy</h6>
      ) : value >= 25 && value <= 29.9 ? (
        <h6 className='overfed mx-3 my-1'> overweight</h6>
      ) : (
        <h6 className='obesefed mx-3 my-1'> obese</h6>
      )}

    </div>
    </div>
    <div className="slider-container">
      
      <div className="slider" style={{ height: '10px' }}></div>
      <div className="dot" style={dotStyle}></div>
    </div>
    </div>
  );
};

Slider.propTypes = {
  value: PropTypes.number.isRequired,
};

export default Slider;
