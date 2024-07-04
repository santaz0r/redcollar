import { splitArr } from '../../../utils/splitArr';
import UserView from '../UserView/UserView';

import styles from './members.module.scss';

import Photo from './nophoto.svg'; // фото-заглушка используется для упрощения, т.к. в объектах не передается img-url юзера

const Members = ({ items, ownerId, size = 4 }) => {
  const hiddenCount = items.length > size ? items.length - size : 0;

  const [firstPart, secondPart] = splitArr(items, size);

  const displayCount = secondPart.length > 3 ? 3 : secondPart.length;
  const others = secondPart.slice(0, displayCount);

  return (
    <div className={styles.members}>
      {firstPart.map((item) => (
        <UserView key={item.id} name={item.username} isOwner={ownerId === item.id} />
      ))}
      {hiddenCount > 0 && (
        <div className={styles.members__other}>
          {others.map((i) => (
            <div key={i.id} className={styles.members__img}>
              <Photo />
            </div>
          ))}
          <div className={styles.members__count}>Еще +{hiddenCount}</div>
        </div>
      )}
    </div>
  );
};

export default Members;
