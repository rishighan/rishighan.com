import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

const List = props => (
    <ul className="rg-list">
      {!_.isNull(props.children) ? props.children.map((child, idx) => (
        <li key={idx}>
          <Heading headingText={child.title} linkHref={props.linkBase + `${child.slug}`} />
          { props.showTimestamps ? <Timestamp date={child.date_updated} dateFormat={'MMMM DD, YYYY'} /> : null }
          { props.showExcerpts ? <span>{ child.excerpt }</span> : null }
          { props.showTags ? <div className="tags">
          { child.is_archived ? <span className="tag is-warning">Archived</span>  : null }
          { _.map(child.tags, (tag, i) => <span className="tag is-light is-normal" key={i}>{ tag.label }</span>)}
          </div> : null }
        </li>)) : 'No posts found'}
    </ul>
);

List.propTypes = {
  children: PropTypes.array,
  showTags: PropTypes.bool,
  showTimestamps: PropTypes.bool,
  showExcerpts: PropTypes.bool,
};
export default List;
