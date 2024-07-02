import { useDispatch } from 'react-redux';
import MyButton from '../ui/Button/Button';
import { logout } from '../../store/users';

import styles from './user.module.scss';

const UserProfiler = ({ setCurrentModal }) => {
  const dispatch = useDispatch();

  const handleClick = () => dispatch(logout());

  return (
    <div className={styles.profiler}>
      <MyButton onClick={setCurrentModal} classes={styles.profiler__btn} />

      <div className={styles.profiler__photo}></div>
      <button className={styles.profiler__logout} onClick={handleClick}>
        Выйти
      </button>
    </div>
  );
};

export default UserProfiler;
