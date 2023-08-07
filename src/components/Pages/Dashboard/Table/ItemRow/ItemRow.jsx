import { useDispatch, useSelector } from 'react-redux';
import { onDelete } from '../../../../../app/slices/censoSlice';
import { delPersona } from '../../../../../services/censoAPI';
import { useEffect, useState } from 'react';

import Button from '../../../../UI/Button/Button';
const ItemRow = ({
  id,
  nombre,
  departamento,
  ocupacion,
  ocupaciones,
  departamentos,
}) => {
  const dispatch = useDispatch();
  const [ocupacionMostrar, setOcupacionMostrar] = useState(0);

  const userLogged = useSelector((state) => state.user.userLogged);
  const minDepartamentoId = Math.min(
    ...departamentos.map((departamento) => departamento.id)
  );
  console.log(departamentos);

  const _onDelete = () => {
    delPersona(userLogged.apiKey, userLogged.id, id).then(() => {
      dispatch(onDelete(id));
    });
  };

  useEffect(() => {
    if (ocupacion > 5) {
      setOcupacionMostrar(ocupacion - 2);
    } else {
      setOcupacionMostrar(ocupacion - 1);
    }
  }, [ocupacion]);

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{nombre}</td>
      <td>{departamentos[departamento - minDepartamentoId].nombre}</td>
      <td>
        {ocupaciones[ocupacionMostrar].ocupacion ?? 'No tiene trabajo xd'}
      </td>
      <td>
        <Button
          cta={'Delete'}
          classColor="btn-danger"
          onHandleClick={_onDelete}
        />
      </td>
    </tr>
  );
};

export default ItemRow;
