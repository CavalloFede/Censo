import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetPersonasByUser } from "../../../../services/censoAPI";
import { onInitial as iniciarCensados } from "../../../../app/slices/censoSlice";

const Counters = () => {
  const dispatch = useDispatch();

  const userLogged = useSelector((state) => state.user.userLogged);
  const usersData = useSelector((state) => state.censo.censados);

  const [total, setTotal] = useState(0);
  const [totalMontevideo, setTotalMontevideo] = useState(0);
  const [totalInterior, setTotalInterior] = useState(0);

  useEffect(() => {
    if (userLogged) {
      fetchGetPersonasByUser(userLogged.apiKey, userLogged.id)
        .then((users) => {
          dispatch(iniciarCensados(users.personas));
        })
        .catch((e) => {
          console.error(e.message);
        });
    }
  }, [userLogged, dispatch]);

  useEffect(() => {
    if (usersData) {
      setTotal(usersData.length);
      setTotalMontevideo(
        usersData.filter((p) => p.departamento === 3218).length
      );
      setTotalInterior(usersData.filter((p) => p.departamento !== 3218).length);
    }
  }, [usersData, dispatch]);

  return (
    <>
      <Counter title={"Total Censados por mi: "} amount={total}></Counter>
      <Counter
        title={"Total Censados en Montevideo: "}
        amount={totalMontevideo}
      ></Counter>
      <Counter
        title={"Total Censados resto del país: "}
        amount={totalInterior}
      ></Counter>
    </>
  );
};

export default Counters;
