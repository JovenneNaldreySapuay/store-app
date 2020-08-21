import React from 'react';

const Popup = ({message}) => {
	
    return (
      <div className="popup">
        <div className="popup_inner p-3" style={{ width: 300, height: 50 }}>
          <p className="text-center">{message}</p>
        </div>
      </div>
    );
}

export default Popup;