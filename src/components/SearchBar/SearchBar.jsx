import React from 'react';
import propTypes from 'prop-types';

const SearchBar = (props) => {
  console.log(props);
  return (<div>
            <input type="text" 
                   autoComplete="off"
                   onChange={searchHandler} />
        </div>);
};

const searchHandler = (e) => {
  console.log(e);
}
export default SearchBar;
