import Button from '../../../../UI/Button/Button';
const ItemRow = ({ id, nombre, onDelete }) => {
  const _onDelete = () => onDelete(id);
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
