import React, { useState } from 'react';

const ButtonWithTitle = ({ img, text, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block', margin: 70}}
    >
        <img
            className={className}
            src={img}
            alt='reload'
        />
      {isHovered && <div>{text}</div>}
    </div>
  );
};

export default ButtonWithTitle;