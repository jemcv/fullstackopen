import React from 'react';

const Togglable = ({ buttonLabel, cancelLabel, children, visible, setVisible }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{cancelLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;