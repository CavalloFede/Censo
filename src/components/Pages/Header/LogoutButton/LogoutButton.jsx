import { useDispatch } from 'react-redux';
import { onLogout } from '../../../../app/slices/userSlice';
import { removeUserFromLocalStorage } from '../../../../utils/storage';
import Button from '../../../UI/Button';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const _onLogout = (e) => {
    e.preventDefault();
    removeUserFromLocalStorage();
    dispatch(onLogout());
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
