const customStyles = {
  container: (provided, state) => ({
    ...provided,
    marginBottom: 15,
  }),
  multiValue: (provided, state) => ({
    ...provided,
    margin: '2px 4px 2px 0px',
    overflow: 'auto',
  }),
  valueContainer: (provided, ...state) => ({
    ...provided,
    flexWrap: 'nowrap',
  }),
  control: (provided, state) => ({
    ...provided,
    flexWrap: 'nowrap',
    border: '1px solid grey',
    height: 40,
  }),
  placeholder: () => ({
    marginTop: 0,
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: 38,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

export default customStyles;
