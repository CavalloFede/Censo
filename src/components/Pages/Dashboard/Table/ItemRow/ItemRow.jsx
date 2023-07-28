import { useDispatch, useSelector } from 'react-redux';
import { onDelete } from '../../../../../app/slices/censoSlice';
import { delPersona } from '../../../../../services/censoAPI';
import Button from '../../../../UI/Button/Button';
const ItemRow = ({ id, nombre }) => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);

  const _onDelete = () => {
    delPersona(userLogged.apiKey, userLogged.id, id).then(() => {
      dispatch(onDelete(id));
    });
  };
  
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{nombre}</td>
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
