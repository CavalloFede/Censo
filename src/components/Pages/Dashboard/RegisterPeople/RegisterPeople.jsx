import RegisterPeopleForm from './RegisterPeopleForm';
const RegisterPeople = ({ userLogged }) => {
  return (
    <>
      <RegisterPeopleForm userLogged={userLogged} />
    </>
  );
};
export default RegisterPeople;
