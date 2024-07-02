import { useFormContext } from 'react-hook-form';

import styles from './multi.module.scss';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentuserData } from '../../../../store/users';

const UserOptionLabel = ({ name, classes, onClick }) => (
  <div className={`${styles.user} ${classes}`} onClick={onClick}>
    <div className={styles.photo}></div>
    <span>{name}</span>
  </div>
);

const ChoosedUser = ({ name, onDelete }) => (
  <div className={styles.choosed__item}>
    <div className={styles.photo}></div>
    <span>{name}</span>
    <button className={styles.choosed__remove} onClick={onDelete}></button>
  </div>
);

const MultiSelect = ({ options }) => {
  const { setValue } = useFormContext();
  const currentUser = useSelector(getCurrentuserData);
  const [isFocused, setIsFocused] = useState(false);
  const [choosedList, setChoosedList] = useState([]);
  const listRef = useRef(null);
  const [search, setSearch] = useState('');

  const hasContent = () => (choosedList.length ? styles.has_content : '');

  const handleClick = (item) => {
    setChoosedList((prev) => {
      const newList = [item, ...prev];
      setValue('participants', [currentUser.id, ...newList.map((i) => i.id)]);
      return newList;
    });
  };

  const handleDelete = (id) => {
    setChoosedList((prev) => {
      const newList = prev.filter((i) => i.id !== id);

      setValue('participants', [currentUser.id, ...newList.map((i) => i.id)]);
      return newList;
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!listRef.current.contains(document.activeElement)) {
        setIsFocused(false);
      }
    }, 100);
  };

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  };
  const filteredWOowner = options.filter((i) => currentUser.id !== i.id);
  const filteredArr = filteredWOowner.filter((item) => item.username.toLowerCase().includes(search));
  const filteredByChoosed = filteredArr.filter((i) => !choosedList.includes(i));

  return (
    <div className={styles.select}>
      <div className={styles.select__wrapper}>
        <div className={styles.select__monitor}>
          <div className={styles.choosed}>
            {choosedList.length
              ? choosedList.map((i) => <ChoosedUser key={i.id} name={i.username} onDelete={() => handleDelete(i.id)} />)
              : null}
          </div>
          <label className={styles.label}>
            <div className={styles.label__title}>Участники</div>
            <input
              className={`${styles.search} ${hasContent()}`}
              type="text"
              placeholder="Введите имя"
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
        </div>
        {isFocused && (
          <div className={styles.border}>
            <div className={styles.select__options} ref={listRef}>
              {filteredByChoosed.length
                ? filteredByChoosed.map((i) => (
                    <UserOptionLabel
                      key={i.id}
                      classes={styles.option}
                      name={i.username}
                      onClick={() => handleClick(i)}
                    />
                  ))
                : 'Не найдено'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
