import Select from 'react-select';
import { useFormContext, Controller } from 'react-hook-form';

import styles from './multi.module.scss';
import './multi.scss';

const UserOptionLabel = ({ name }) => (
  <div className={styles.user}>
    <div className={styles.photo}></div>
    <span>{name}</span>
  </div>
);

const MultiSelect = ({ options }) => {
  const { control } = useFormContext();
  const optionsArr = options.map((u) => ({
    label: <UserOptionLabel name={u.username} />,
    value: u.id,
  }));

  //   const customStyles = {
  //     control: (base) => ({
  //       ...base,
  //       height: '60px',
  //       borderRadius: '12px',
  //       border: '1px solid #0d0c0c',
  //       caretColor: '#23ae00',
  //       ':hover': {
  //         border: '1px solid #0d0c0c',
  //       },
  //     }),
  //     option: (base) => ({
  //       ...base,
  //     }),
  //     menu: (base) => ({
  //       ...base,
  //       maxWidth: '344px',
  //       textAlign: 'left',
  //     }),
  //     multiValue: (base) => ({
  //       ...base,
  //       backgroundColor: '#EFEFEF',
  //       borderRadius: 12,
  //       width: 'fit-content',
  //       paddingRight: 10,
  //       position: 'relative',
  //       height: '30px',
  //     }),
  //     multiValueLabel: (base) => ({
  //       ...base,
  //       color: '#0d0c0c',
  //     }),
  //     multiValueRemove: (base) => ({
  //       ...base,
  //       opacity: 0,
  //       position: 'absolute',
  //       top: 3,
  //       right: 0,
  //       cursor: 'pointer',
  //       height: '20px',
  //       ':hover': {
  //         ...base,
  //         opacity: 1,
  //         borderRadius: 12,
  //         zIndex: 100,
  //         svg: {
  //           width: '20px',
  //           height: '30px',
  //           color: 'black',
  //         },
  //         ':hover': {
  //           backgroundColor: 'gray',
  //         },
  //       },
  //     }),
  //   };
  const ClearIndicator = () => null;
  const DropdownIndicator = () => null;
  const customFilterOption = (option, rawInput) => {
    const words = rawInput.split(' ');
    return words.every((word) => option.data.label.props.name.toLowerCase().includes(word.toLowerCase()));
  };
  return (
    <div>
      <Controller
        name="select"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={optionsArr}
            isMulti
            // styles={customStyles}
            filterOption={customFilterOption}
            getOptionLabel={(option) => option.label}
            className={styles.reactSelect}
            classNamePrefix="react-select"
            components={{ ClearIndicator, DropdownIndicator }}
          />
        )}
        //
      />
    </div>
  );
};

export default MultiSelect;
