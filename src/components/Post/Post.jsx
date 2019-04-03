import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

const renderPost = (data) => ({
    'blogPost': <div className="column content is-two-thirds-tablet is-full-mobile">
                    {data.map((post, idx) => <article key={idx}>
                        <Heading headingText={post.title} />
                        <Timestamp date={post.date_updated} dateFormat={'D MMM, YYYY '} />
                        <section><MarkdownRenderer text={post.content} /></section>
                    </article>)}
                </div>,
    'titles':   <div className="column content is-two-thirds-tablet is-full-mobile">
                    {data.map((post, idx) => <div key={ idx }>
                            <Heading headingText={ post.title } />
                            <span>{ post.excerpt } </span>
                        </div>
                    )}
                </div>,
    'single':   <div className="column content is-two-thirds-tablet is-full-mobile">
                    {}
                </div>
});

const Post = (props) => renderPost(props.data.posts)[props.postType];

Post.propTypes = {
};
export default Post;
