import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

const ListItem = props => (
    <div className="column content is-two-thirds-desktop is-two-thirds-tablet is-mobile is-full-mobile">
        {props.data.posts.map((post, idx) => <article key={ idx }>
            <header><h2>{ post.title }</h2></header>
            <section><MarkdownRenderer text={ post.content }/></section>
        </article>)}
    </div>);

ListItem.propTypes = {
  data: PropTypes.object,
};
export default ListItem;
