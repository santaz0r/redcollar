import styles from './user.module.scss';
import MyButton from '../ui/Button/Button';

const UserProfiler = ({ setCurrentModal }) => {
  //   const currentUser = useSelector(getCurrentuserData);

  return (
    <div className={styles.profiler}>
      <MyButton onClick={setCurrentModal} classes={styles.profiler__btn} />

      <div className={styles.profiler__photo}></div>
    </div>
  );
};

export default UserProfiler;
