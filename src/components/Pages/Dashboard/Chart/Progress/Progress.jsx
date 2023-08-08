import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { fetchGetTotalCenso } from '../../../../../services/censoAPI';

const Progress = ({ censadosPorUsuario }) => {
  const userLogged = useSelector((state) => state.user.userLogged);

  const [totalCensados, setTotalCensados] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  // Llamada a la API para obtener el total de censados
  useEffect(() => {
    if (userLogged) {
      fetchGetTotalCenso(userLogged.apiKey, userLogged.id)
        .then((data) => {
          setTotalCensados(data.total);
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged]);

  // Calcular el porcentaje y actualizarlo cuando cambie el total de censados o la cantidad de censados por el usuario
  useEffect(() => {
    const calculoPorcentaje = (censadosPorUsuario / totalCensados) * 100;
    setPorcentaje(calculoPorcentaje);
  }, [totalCensados, censadosPorUsuario]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Porcentaje censado por mí:</h2>
      <div
        style={{
          flex: '1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="progress" style={{ width: '100%' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${porcentaje}%` }}
          >
            <span
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'black',
              }}
            >
              {porcentaje.toFixed(5)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
