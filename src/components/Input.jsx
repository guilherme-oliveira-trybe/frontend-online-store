import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, placeHolder, value, dataTestid, onChange } = this.props;
    return (
      <div>
        <input
          type={ type }
          name={ name }
          placeholder={ placeHolder }
          value={ value }
          onChange={ onChange }
          data-testid={ dataTestid }
        />
      </div>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dataTestid: PropTypes.string,
}.isRequired;

export default Input;
