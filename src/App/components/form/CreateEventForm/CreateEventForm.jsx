import styles from './create.module.scss';
import common from '../../../../styles/_common.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import MyButton from '../../ui/Button/Button';
import TextField from '../inputs/TextField';
import TextareaField from '../inputs/TextareaField';
import isInRange from '../../../utils/isInRange';
import { useSelector } from 'react-redux';
import { getUsersList } from '../../../store/users';
import MultiSelect from '../inputs/MultiSelect';
import FileInput from '../inputs/FileInput';

const CreateEventForm = ({ onClose }) => {
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const allUsers = useSelector(getUsersList);
  const onSubmit = handleSubmit((payload) => {
    console.log(payload);
  });

  const handleTrim = (event) => {
    const { name, value } = event.target;
    setValue(name, value.trim(), { shouldValidate: true });
  };
  const handleClose = () => onClose();
  return (
    <div className={styles.create}>
      <div className={styles.create__wrapper}>
        <div className={styles.create__title}>Создание события</div>
        <FormProvider {...methods}>
          <form className={`${styles.create__form} ${styles.form}`} onSubmit={onSubmit}>
            <div className={styles.form__wrapper}>
              <div className={styles.title}>
                <TextField
                  label="Название"
                  field="title"
                  placeholder={'Введите название'}
                  handleTrim={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      isLongEnough: (value) => isInRange([0, 40], value.length) || 'Слишком длинное название',
                    },
                  }}
                />
              </div>
              <div className={styles.start}>Начало</div>
              <div className={styles.end}>конец</div>
              <div className={styles.descr}>
                <TextareaField
                  textarea
                  label="Описание"
                  field="description"
                  placeholder={''}
                  handleTrim={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      isLongEnough: (value) => isInRange([0, 255], value.length) || 'Слишком длинное описание',
                    },
                  }}
                />
              </div>
              <div className={styles.time}>
                <TextField
                  label="Время проведения"
                  field="time"
                  placeholder={'Введите место'}
                  type="password"
                  handleTrim={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                  }}
                />
              </div>
              <div className={styles.location}>
                <TextField
                  label="Место проведения"
                  field="location"
                  placeholder={'Введите место'}
                  type="password"
                  handleTrim={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                  }}
                />
              </div>
              <div className={styles.members}>
                <MultiSelect options={allUsers} />
              </div>
              <div className={styles.owner}>
                <div>мое инфо</div>
              </div>
              <div className={styles.files}>
                <FileInput />
              </div>
            </div>
            <MyButton type="submit" onClick={onSubmit}>
              Создать
            </MyButton>
          </form>
        </FormProvider>
      </div>
      <button className={common.modal__btn_close} onClick={handleClose}></button>
    </div>
  );
};

export default CreateEventForm;
