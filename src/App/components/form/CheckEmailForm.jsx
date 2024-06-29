import styles from './check.module.scss';
import common from '../../../styles/_common.module.scss';
import TextField from './inputs/TextField';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersList, login, signUp } from '../../store/users';
import notifications from '../../utils/notificationsList';
import Notification from '../ui/Notification/Notification';
import Regexp from './inputs/patterns';
import isInRange from '../../utils/isInRange';
import MyButton from '../ui/Button/Button';

const CheckEmailForm = ({ setCurrentModal, setActive, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList);
  const [checkStatus, setCheckStatus] = useState('check');
  const combineCheckLogin = checkStatus === 'login' || checkStatus === 'check';
  const isCheck = checkStatus === 'check';
  const isLogin = checkStatus === 'login';
  const isRegistration = checkStatus === 'registration';

  const methods = useForm({ mode: 'onSubmit' });
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = methods;
  const passwordWatch = watch('password');

  const { hasNumber, isLongEnough, hasUpperCase, hasLowerCase, hasSymbol } = Regexp;

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
      <FormProvider {...methods}>
        <div className={styles.check__wrapper}>
          {combineCheckLogin && <h2 className={styles.check__title}>Вход</h2>}
          {isRegistration && <h2 className={styles.check__title}>Регистрация</h2>}
          <form onSubmit={onSubmit} className={`${styles.check__form} ${styles.form}`}>
            {combineCheckLogin && (
              <div className={styles.form__wrapper}>
                <TextField
                  label="E-mail"
                  field="email"
                  placeholder={'Enter e-mail'}
                  handleTrim={handleTrim}
                  isHide={!isCheck}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    pattern: {
                      value: Regexp['email'].pattern,
                      message: Regexp['email'].message,
                    },
                  }}
                />

                <TextField
                  label="Пароль"
                  field="password"
                  placeholder={'Введите пароль'}
                  type="password"
                  handleTrim={handleTrim}
                  isHide={!isLogin}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                  }}
                />

                {isCheck && <MyButton disabledOption={hasError} onClick={handleCheck} title={'Далее'} />}
                {isLogin && <MyButton disabledOption={hasError} type={'submit'} onClick={onSubmit} title={'Войти'} />}
              </div>
            )}
            {isRegistration && (
              <>
                <Notification
                  text={notifications.registration}
                  classes={styles.check__notification}
                  hasError={errors.password || errors.repassword}
                />
                <div className={styles.form__wrapper}>
                  <TextField
                    label="Ваше имя"
                    field="name"
                    placeholder={'Введите имя'}
                    handleTrim={handleTrim}
                    validationRules={{
                      required: 'Поле обязательно для заполнения',
                      pattern: {
                        value: Regexp['name'].pattern,
                        message: Regexp['name'].message,
                      },
                    }}
                  />

                  <TextField
                    label="Пароль"
                    field="password"
                    placeholder={'Введите пароль'}
                    type="password"
                    handleTrim={handleTrim}
                    validationRules={{
                      validate: {
                        isLongEnough: (value) => isInRange(isLongEnough.pattern, value.length) || isLongEnough.message,
                        hasNumber: (value) => hasNumber.pattern.test(value) || hasNumber.message,
                        hasUpperCase: (value) => hasUpperCase.pattern.test(value) || hasUpperCase.message,
                        hasLowerCase: (value) => hasLowerCase.pattern.test(value) || hasLowerCase.message,
                        hasSymbol: (value) => hasSymbol.pattern.test(value) || hasSymbol.message,
                      },
                    }}
                  />

                  <TextField
                    label="Повторите пароль"
                    field="repassword"
                    placeholder={'Введите пароль'}
                    type="password"
                    validationRules={{
                      validate: {
                        validate: (value) => value === passwordWatch || 'Пароли не совпадают',
                      },
                    }}
                  />
                  <MyButton type="submit" onClick={onSubmit} title={'Зарегистрироваться'} />
                </div>
              </>
            )}
          </form>
        </div>
      </FormProvider>
      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default CheckEmailForm;
