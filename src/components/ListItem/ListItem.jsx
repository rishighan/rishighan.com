import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

const ListItem = props => (
    <div className="column content is-two-thirds-desktop is-two-thirds-tablet is-mobile">
        {props.data.posts.map((post, idx) => <div key={ idx }>
                <h2>{ post.title }</h2>
                <div><MarkdownRenderer text={ post.content }/></div>
            </div>)}
    </div>);

ListItem.propTypes = {
  data: PropTypes.object,
};
export default ListItem;