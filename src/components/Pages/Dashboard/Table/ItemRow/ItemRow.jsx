import { useDispatch, useSelector } from "react-redux";
import { onDelete } from "../../../../../app/slices/censoSlice";
import { delPersona } from "../../../../../services/censoAPI";
import Button from "../../../../UI/Button/Button";
import { useEffect, useState } from "react";
const ItemRow = ({ id, nombre, ocupacion, ocupaciones }) => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const [ocupacionNombre, setOcupacionNombre] = useState("");

  const _onDelete = () => {
    delPersona(userLogged.apiKey, userLogged.id, id).then(() => {
      dispatch(onDelete(id));
    });
  };

  useEffect(() => {
    setOcupacionNombre(
      ocupaciones.find((ocupacionItem) => ocupacionItem.id === ocupacion)
        ?.ocupacion
    );
  }, [ocupaciones, ocupacion]); //si algo que traigo del find falla osea que no me trae nada, que queda guardado en el usestate

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{nombre}</td>
      <td>{ocupacionNombre ?? "No tiene trabajo xd"}</td>
      <td>
        <Button
          cta={"Delete"}
          classColor="btn-danger"
          onHandleClick={_onDelete}
        />
      </td>
    </tr>
  );
};

export default ItemRow;
