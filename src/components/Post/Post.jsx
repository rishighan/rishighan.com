import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';

const Post = props => (
    <div className="column content is-two-thirds-tablet is-half-mobile">
        {props.data.posts.map((post, idx) => <article key={ idx }>
            <header><h2>{ post.title }</h2></header>
            <section><MarkdownRenderer text={ post.content }/></section>
        </article>)}
    </div>);

Post.propTypes = {
  data: PropTypes.object,
  format: PropTypes.string,
  type: PropTypes.string,
};
export default Post;
