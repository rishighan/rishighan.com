const customStyles = {
  container: (provided, state) => ({
    ...provided,
    marginBottom: 10,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: '100%',
    color: state.selectProps.menuColor,
    padding: 3,
  }),
  multiValue: (provided, state) => ({
    ...provided,
    margin: '2px 4px 2px 0px',
  }),
  control: (provided, state) => ({
    ...provided,
    border: '1px solid grey',
    height: 40,
  }),
  placeholder: () => ({
    marginTop: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 3,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default customStyles;
