import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  return (<div>
            <input type="text"
                   autoComplete="off"
                   onChange={props.searchBarChangeHandler} />
        </div>);
};

SearchBar.propTypes = {
  searchBarChangeHandler: PropTypes.func,
};
export default SearchBar;
