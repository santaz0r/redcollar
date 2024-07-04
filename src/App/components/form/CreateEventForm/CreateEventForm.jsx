import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentuserData, getUsersList } from '../../../store/users';
import { createEvent, getTriggerLoading } from '../../../store/events';
import MyButton from '../../ui/Button/Button';
import TextField from '../inputs/TextField/TextField';
import TextareaField from '../inputs/TextAreaField/TextareaField';
import MultiSelect from '../inputs/MultiSelect/MultiSelect';
import FileInput from '../inputs/Fileinput/FileInput';
import UserView from '../../ui/UserView/UserView';
import DataPicker from '../../DatePicker/DataPicker';
import Confirm from '../../Confirm/Confirm';
import Modal from '../../Modal/Modal';
import { transformToTimeISO } from '../../../utils/transformToTimeISO';
import isInRange from '../../../utils/isInRange';

import styles from './create.module.scss';
import common from '../../../../styles/_common.module.scss';
import { removeExtraSpaces } from '../../../utils/removeExtraSpaces';

const CreateEventForm = ({ setEvent, onClose, setCurrentModal }) => {
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = methods;
  const [isModalActive, setModalActive] = useState(false);
  const allUsers = useSelector(getUsersList);
  const currentUser = useSelector(getCurrentuserData);
  const triggerLoading = useSelector(getTriggerLoading);
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((payload) => {
    const { dateStart, dateEnd, time, participants, photos, ...rest } = payload;
    const dateTimeISOStart = transformToTimeISO(dateStart, time);
    const dateTimeISOEnd = dateEnd ? transformToTimeISO(dateEnd, time) : transformToTimeISO(dateStart, time);
    const transformMembers = participants ? participants : [currentUser.id];
    const photosArr = photos ? photos : [];

    const newData = {
      ...rest,
      dateStart: dateTimeISOStart,
      dateEnd: dateTimeISOEnd,
      participants: transformMembers,
      owner: currentUser.id,
      photos: photosArr,
    };
    setEvent(newData);
    dispatch(createEvent({ payload: newData, setNewModal: setCurrentModal }));
  });

  const handleTrim = (event) => {
    const { name, value } = event.target;
    setValue(name, removeExtraSpaces(value), { shouldValidate: true });
  };

  const handleCloseModals = () => {
    setModalActive(false);
    onClose();
  };
  return (
    <div className={styles.create}>
      {isModalActive && (
        <Modal>
          <Confirm
            title={'Передумали создавать событие?'}
            onLeave={handleCloseModals}
            onClose={() => setModalActive(false)}
          />
        </Modal>
      )}
      <div className={styles.create__wrapper}>
        <div className={styles.create__title}>Создание события</div>
        <FormProvider {...methods}>
          <form className={`${styles.create__form} ${styles.form}`} onSubmit={onSubmit}>
            <div className={styles.form__wrapper}>
              <div className={`${styles.title} ${styles.item}`}>
                <TextField
                  label="Название"
                  field="title"
                  placeholder={'Введите название'}
                  onBlur={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      isLongEnough: (value) => isInRange([0, 40], value.length) || 'Слишком длинное название',
                    },
                  }}
                />
              </div>
              <div className={`${styles.date} ${styles.item}`}>
                <DataPicker validationRules={{ required: 'Выберите "начало"' }} />
              </div>
              <div className={`${styles.descr} ${styles.item}`}>
                <TextareaField
                  label="Описание"
                  field="description"
                  placeholder={''}
                  onBlur={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      isLongEnough: (value) => isInRange([0, 255], value.length) || 'Слишком длинное описание',
                    },
                  }}
                />
              </div>
              <div className={`${styles.time} ${styles.item}`}>
                <TextField
                  label="Время проведения"
                  field="time"
                  placeholder={'Введите время'}
                  type="time"
                  onChange={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                  }}
                />
              </div>
              <div className={`${styles.location} ${styles.item}`}>
                <TextField
                  label="Место проведения"
                  field="location"
                  placeholder={'Введите место'}
                  onBlur={handleTrim}
                  validationRules={{
                    required: 'Поле обязательно для заполнения',
                    validate: {
                      isLongEnough: (value) => isInRange([0, 50], value.length) || 'Слишком длинное',
                    },
                  }}
                />
              </div>
              <div className={`${styles.members} ${styles.item}`}>
                <MultiSelect options={allUsers} />
              </div>
              <div className={`${styles.owner} ${styles.item}`}>
                <UserView name={currentUser.username} isOwner />
              </div>
              <div className={`${styles.files} ${styles.item}`}>
                <FileInput />
              </div>
            </div>
            <MyButton
              classes={styles.create__btn}
              type="submit"
              onClick={onSubmit}
              disabledOption={triggerLoading || !isValid}
            >
              {triggerLoading ? 'Ожидайте' : 'Создать'}
            </MyButton>
          </form>
        </FormProvider>
      </div>
      <button
        className={common.modal__btn_close}
        disabled={triggerLoading}
        onClick={() => setModalActive(true)}
      ></button>
    </div>
  );
};

export default CreateEventForm;
