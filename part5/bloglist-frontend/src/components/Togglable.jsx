import React from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, cancelLabel, children, visible, setVisible }) => {
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
  }

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
  )
}

export default Togglable