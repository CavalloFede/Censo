import { removeUserFromLocalStorage } from '../../../../utils/storage';
import Button from '../../../UI/Button';

const LogoutButton = () => {
  const _onLogout = () => {
    removeUserFromLocalStorage();
  };
  return (
    <form className="form-inline ml-auto my-2 my-lg-0">
      <Button
        cta={'Logout'}
        classColor={'btn-outline-success my-2 my-sm-0'}
        onHandleClick={_onLogout}
      />
    </form>
  );
};

export default LogoutButton;
