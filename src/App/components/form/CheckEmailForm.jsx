import styles from './check.module.scss';
import common from '../../../styles/_common.module.scss';
import TextField from './inputs/TextField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, login } from '../../store/users';

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

  const handleTrim = (event) => {
    const { name, value } = event.target;
    setValue(name, value.trim(), { shouldValidate: true });
  };

  const onSubmit = handleSubmit((payload) => {
    console.log(payload);
    dispatch(login({ payload, setActive }));
  });
  const hasError = Object.keys(errors).length;

  const handleCheck = () => {
    const email = getValues('email');
    const isEmailExists = users.some((u) => u.email === email);
    // console.log(email, users, errors, isEmailExists);

    if (isEmailExists) {
      setCheckStatus('login');
    }
    // } else {
    //   setCheckStatus('registration');
    // }
  };

  const handleClose = () => onClose();
  return (
    <div className={styles.login}>
      <div className={styles.login__wrapper}>
        {combineCheckLogin && <h2 className={styles.login__title}>Вход</h2>}
        {isRegistration && <h2 className={styles.login__title}>Регистрация</h2>}
        <form onSubmit={onSubmit}>
          {combineCheckLogin && (
            <>
              <TextField
                label="E-mail"
                field="email"
                placeholder={'Enter e-mail'}
                register={register}
                error={errors}
                isHide={!isCheck}
                handleTrim={handleTrim}
              />
              <TextField
                label="Пароль"
                field="password"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
                isHide={!isLogin}
                handleTrim={handleTrim}
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
              <TextField label="Ваше имя" field="name" placeholder={'Введите имя'} register={register} error={errors} />

              <TextField
                label="Пароль"
                field="password"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
              />

              <TextField
                label="Повторите пароль"
                field="repassword"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
              />
              <button onClick={onSubmit} type="submit">
                Войти
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
