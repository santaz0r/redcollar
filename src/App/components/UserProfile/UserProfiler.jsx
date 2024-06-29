import styles from './user.module.scss';
import MyButton from '../ui/Button/Button';

const UserProfiler = () => {
  //   const currentUser = useSelector(getCurrentuserData);
  return (
    <div className={styles.profiler}>
      <MyButton classes={styles.profiler__btn} />

      <div className={styles.profiler__photo}></div>
    </div>
  );
};

export default UserProfiler;
