import React from 'react';
import '../stylesheets/Btn.css'

const Btn = (props) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
};

export default Btn;