import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
  const [search, saveSearch] = useState({
    ciudad: '',
    pais: '',
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const {ciudad, pais} = search;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appID = '6e0f22e5ee51ba64f74e5937d82462c3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
        const response = await fetch(url);
        const data = await response.json();

        guardarResultado(data);
        guardarConsultar(false);

        //si huebieron errores en la consulta
        if (data.cod === '404') {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);

  let component;
  if (error) {
    component = <Error mensaje="No hay resultados" />;
  } else {
    component = <Clima resultado={resultado}></Clima>;
  }

  return (
    <Fragment>
      <Header title="Clima React" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                search={search}
                saveSearch={saveSearch}
                guardarConsultar={guardarConsultar}
              ></Formulario>
            </div>
            <div className="col m6 s12">{component}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
