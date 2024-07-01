import styles from './user.module.scss';

const UserView = ({ name, isOwner }) => {
  return (
    <div className={styles.user}>
      <div className={styles.user__photo}></div>
      <div className={styles.user__info}>
        <div className={styles.user__name}>{name}</div>
        {isOwner && <div className={styles.user__owner}>Организатор</div>}
      </div>
    </div>
  );
};

export default UserView;
