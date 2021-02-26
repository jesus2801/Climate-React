import React from 'react';
import PropTypes from 'prop-types';

const Clima = ({resultado}) => {
  //estraer los valores
  const {name, main} = resultado;

  if (!main) return null;

  //grados kelvin
  const kelvin = 273.15;

  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es:</h2>
        <p className="temperatura">
          {parseFloat(main.temp - kelvin).toFixed(2)}
          <span>&#x2103;</span>
        </p>
        <p>
          Temperatura máxima: {' '}
          {parseFloat(main.temp_max - kelvin).toFixed(2)}
          <span>&#x2103;</span>
        </p>
        <p>
          Temperatura mínima: {' '}
          {parseFloat(main.temp_min - kelvin).toFixed(2)}
          <span>&#x2103;</span>
        </p>
        <p>
          Humedad: {main.humidity}%
        </p>
      </div>
    </div>
  );
};

Clima.propTypes = {
  resultado: PropTypes.object.isRequired,
};

export default Clima;
