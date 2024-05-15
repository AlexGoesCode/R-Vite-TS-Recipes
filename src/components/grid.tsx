import React from 'react';
import './Grid.css';

const Grid: React.FC = () => {
  return (
    <div className="grid-container">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index} className="grid-item">
          Item {index + 1}
        </div>
      ))}
    </div>
  );
};

export default Grid;
