import styles from './check.module.scss';
import common from '../../../styles/_common.module.scss';
import TextField from './inputs/TextField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const CheckEmailForm = ({ setCurrentModal, setActive, onClose }) => {
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
  } = useForm();

  const onSubmit = handleSubmit((payload) => {
    console.log(payload);
  });

  const handleCheck = () => {
    const email = getValues('email');
    console.log(email);

    if (1 === 1) {
      setCheckStatus('login');
    } else {
      setCheckStatus('registration');
    }
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
              />
              <TextField
                label="Пароль"
                field="password"
                placeholder={'Введите пароль'}
                type="password"
                register={register}
                error={errors}
                isHide={!isLogin}
              />
              {isCheck && (
                <button onClick={handleCheck} type="button">
                  Далее
                </button>
              )}
              {isLogin && (
                <button onClick={onSubmit} type="submit">
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
