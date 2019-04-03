import React from 'react';
import PropTypes from 'prop-types';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

const renderPost = (data) => ({
    'blogPost': <React.Fragment>
                    {data.map((post, idx) => <article key={idx}>
                        <Heading headingText={post.title} />
                        <Timestamp date={post.date_updated} dateFormat={'D MMM, YYYY '} />
                        <section><MarkdownRenderer text={post.content} /></section>
                    </article>)}
                </React.Fragment>,
    'titles':   <React.Fragment>
                    {data.map((post, idx) => <div key={ idx }>
                            <Heading headingText={ post.title } />
                            <span>{ post.excerpt } </span>
                        </div>
                    )}
                </React.Fragment>,
    'single':   <React.Fragment>
                    <article>
                        <Heading headingText={ data.title } />
                        <Timestamp date={ data.date_updated } dateFormat={ 'D MMM, YYYY' } />
                        <section><MarkdownRenderer text={ data.content } /></section>
                    </article>
                </React.Fragment>
});

const Post = (props) => renderPost(props.data.posts)[props.postType];

Post.propTypes = {
};
export default Post;
