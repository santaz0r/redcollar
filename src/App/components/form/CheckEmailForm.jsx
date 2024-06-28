import styles from './check.module.scss';
import common from '../../../styles/_common.module.scss';
import TextField from './inputs/TextField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, login, signUp } from '../../store/users';
import notifications from '../../utils/notificationsList';
import Notification from '../ui/notification/Notification';

const CheckEmailForm = ({ setCurrentModal, setActive, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList);
  const [checkStatus, setCheckStatus] = useState('check');
  const combineCheckLogin = checkStatus === 'login' || checkStatus === 'check';
  const isCheck = checkStatus === 'check';
  const isLogin = checkStatus === 'login';
  const isRegistration = checkStatus === 'registration';

  // const [isRegistration, setIsRegistration] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({ mode: 'onChange' });
  const hasError = Object.keys(errors).length;

  const handleTrim = (event) => {
    const { name, value } = event.target;
    setValue(name, value.trim(), { shouldValidate: true });
  };

  const onSubmit = handleSubmit((payload) => {
    isRegistration ? dispatch(signUp({ payload, setActive })) : dispatch(login({ payload, setActive }));
  });

  const handleCheck = () => {
    const email = getValues('email');
    const isEmailExists = users.some((u) => u.email === email);

    isEmailExists ? setCheckStatus('login') : setCheckStatus('registration');
  };
  const setClasses = () => {
    return combineCheckLogin ? styles.login : styles.register;
  };
  const handleClose = () => onClose();
  return (
    <div className={`${styles.check} ${setClasses()}`}>
      <div className={styles.check__wrapper}>
        {combineCheckLogin && <h2 className={styles.check__title}>Вход</h2>}
        {isRegistration && <h2 className={styles.check__title}>Регистрация</h2>}
        <form onSubmit={onSubmit} className={styles.check__form}>
          {combineCheckLogin && (
            <>
              <TextField
                label="E-mail"
                field="email"
                placeholder={'Enter e-mail'}
                register={register}
                error={errors}
                handleTrim={handleTrim}
                isHide={!isCheck}
              />

              <TextField
                label="Пароль"
                field="password"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
                handleTrim={handleTrim}
                isHide={!isLogin}
              />

              {isCheck && (
                <button onClick={handleCheck} type="button" disabled={hasError}>
                  Далее
                </button>
              )}
              {isLogin && (
                <button onClick={onSubmit} type="submit" disabled={hasError}>
                  Войти
                </button>
              )}
            </>
          )}
          {isRegistration && (
            <>
              <Notification text={notifications.registration} classes={styles.check__notification} />

              <TextField
                label="Ваше имя"
                field="name"
                placeholder={'Введите имя'}
                register={register}
                error={errors}
                handleTrim={handleTrim}
              />

              <TextField
                label="Пароль"
                field="password"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
                handleTrim={handleTrim}
              />

              <TextField
                label="Повторите пароль"
                field="repassword"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
                handleTrim={handleTrim}
              />

              <button onClick={onSubmit} type="submit">
                Зарегестрироваться
              </button>
            </>
          )}
        </form>
      </div>
      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default CheckEmailForm;
