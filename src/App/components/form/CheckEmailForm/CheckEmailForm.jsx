import TextField from '../inputs/TextField/TextField';
import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getLoginError, getUsersList, login, signUp } from '../../../store/users';
import notifications from '../../../utils/notificationsList';
import Regexp from '../inputs/patterns';
import isInRange from '../../../utils/isInRange';
import MyButton from '../../ui/Button/Button';
import Notification from '../../ui/Notification/Notification';

import styles from './check.module.scss';
import common from '../../../../styles/_common.module.scss';
import { removeExtraSpaces } from '../../../utils/removeExtraSpaces';

const CheckEmailForm = ({ setActive, onClose }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersList);
  const [checkStatus, setCheckStatus] = useState('check');
  const loginError = useSelector(getLoginError);
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
    trigger,
  } = methods;
  const passwordWatch = watch('password');
  const rePasswordWatch = watch('repassword');

  const passwordsMatch = passwordWatch === rePasswordWatch;

  const { hasNumber, isLongEnough, hasUpperCase, hasLowerCase, hasSymbol } = Regexp;

  const hasError = Object.keys(errors).length;

  const handleTrim = (event, func) => {
    const { name, value } = event.target;
    const processedValue = typeof func === 'function' ? func(value) : value.trim();
    setValue(name, processedValue, { shouldValidate: true });
  };

  const onSubmit = handleSubmit((payload) => {
    isRegistration ? dispatch(signUp({ payload, setActive })) : dispatch(login({ payload, setActive }));
  });

  const handleCheck = async () => {
    const isValidate = await trigger('email');
    if (!isValidate) return;
    const email = getValues('email');
    const isEmailExists = users.some((u) => u.email === email);
    isEmailExists ? setCheckStatus('login') : setCheckStatus('registration');
  };

  const setClasses = () => {
    return combineCheckLogin ? styles.login : styles.register;
  };

  const handleClose = () => {
    onClose();
    dispatch(clearError());
  };

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
                  onChange={handleTrim}
                  isHide={!isCheck}
                  validationRules={{
                    required: 'Обязательное поле',
                    pattern: {
                      value: Regexp['email'].pattern,
                      message: Regexp['email'].message,
                    },
                  }}
                />
                <div className={styles.login_error}>
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
                  {isLogin && loginError && <span>Неверный пароль</span>}
                </div>
                {isCheck && <MyButton onClick={handleCheck}>Далее</MyButton>}
                {isLogin && (
                  <MyButton disabledOption={hasError} type={'submit'} onClick={onSubmit}>
                    Войти
                  </MyButton>
                )}
              </div>
            )}
            {isRegistration && (
              <>
                <Notification
                  text={notifications.registration}
                  classes={styles.check__notification}
                  hasError={errors.password || errors.repassword || !passwordsMatch}
                />
                <div className={styles.form__wrapper}>
                  <TextField
                    label="Ваше имя"
                    field="name"
                    placeholder={'Введите имя'}
                    onBlur={(e) => handleTrim(e, removeExtraSpaces)}
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
                    onChange={handleTrim}
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
                  <MyButton type="submit" onClick={onSubmit}>
                    Зарегистрироваться
                  </MyButton>
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
