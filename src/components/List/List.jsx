import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

function List(props) {
  return (
    <ul className="rg-list">
      {!_.isEmpty(props.children) ? props.children.map((child, idx) => (
        <li key={idx}>
          <Heading headingText={child.title} linkHref={`/admin/edit/${child.slug}`} />
          <Timestamp date={child.date_updated} dateFormat={'dddd, MMMM Do YYYY'} />
          {props.showTags ? <div className="tags">
            { _.map(child.tags, (tag, i) => <span className="tag is-light is-normal" key={i}>{ tag.id }</span>)}
          </div> : null }
        </li>)) : 'No posts found'}
    </ul>
  );
}

List.propTypes = {
  children: PropTypes.array,
  showTags: PropTypes.bool,
};
export default List;
