import React from 'react';
import PropTypes from 'prop-types';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

function List(props) {
  return (
     <ul>
        {props.children.map((child, idx) => (
          <li key={idx}>
            <Heading headingText={child.title} postSlug={child.slug} />
            <Timestamp date={child.date_updated} dateFormat={'dddd, MMMM Do YYYY'} />
          </li>))}
     </ul>
  );
}

List.propTypes = {
  children: PropTypes.array,
};
export default List;
