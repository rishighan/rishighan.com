import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';
import List from '../List/List';

const renderPageFragment = (props) => {
    switch (props.postType) {
        case 'single':
            return (<>
                {!_.isNil(props.singlePostData) ? (<article>
                    <Heading headingText={props.singlePostData.title} />
                    <Timestamp date={props.singlePostData.date_updated} dateFormat={'D MMM, YYYY '} />
                    <section>
                        <MarkdownRenderer text={props.singlePostData.content} />
                    </section>
                </article>) : null}
            </>);

        case 'blog':
            // this is to filter out the masthead post
            let mastheadPost = _.chain(props.postsData.posts)
                .map(posts => {
                    return _.map(posts.tags, tag => {
                        if (tag.value === 'Masthead') {
                            return posts;
                        }
                    });
                })
                .each(posts => {
                    let fr = _.each(posts, post => {
                        if (!_.isUndefined(post)) {
                            return post;
                        }
                    })
                    return _.pull(fr, undefined)
                })
                .value()
            let blogPosts = _.without(props.postsData.posts, _.flatten(mastheadPost)[0])
            return (<>
                {_.isArray(props.postsData.posts) ? (<div>
                    {blogPosts.map((post, idx) => (<article key={idx}>
                        <Heading headingText={post.title} linkHref={`/post/${post.slug}`} />
                        <Timestamp date={post.date_updated} dateFormat={'D MMM, YYYY '} />
                        <section>
                            <MarkdownRenderer text={post.content} />
                        </section>
                    </article>))}
                </div>) : null}
            </>);

        case 'titles':
            return (<>
                {_.isArray(props.postsData.posts) ? (<>
                    <List
                        showTags={false}
                        showTimestamps={false}
                        showExcerpts
                    >
                        {props.postsData.posts.map(post => post)}
                    </List>
                </>) : null}
            </>);
        case 'illustrations':
            return (<>
                {_.isArray(props.postsData.posts) ? (<div>
                    {props.postsData.posts.map((post, idx) => (<div key={idx}>
                        <Heading headingText={post.title} />
                        <figure className="image">
                            {post.attachment
                                && post.attachment.map((pic, i) => (<img key={i} src={pic.url} data-meta={pic.isHero} />))}
                        </figure>
                        <section>
                            <MarkdownRenderer text={post.content} />
                        </section>
                    </div>))}
                </div>) : null}
            </>);
        case 'archive':
            return (<>
                {_.isArray(props.postsData.posts) ? (<div>
                    {props.postsData.posts.map((archive, idx) => (<div key={idx}>
                        <h2 className="is-size-3 has-text-grey has-text-weight-normal">{archive._id.year} </h2>
                        <List showTimestamps>
                            {!_.isNil(archive.archivedPosts) && archive.archivedPosts.map(post => post)}
                        </List>
                    </div>))}
                </div>) : null}
            </>);
        default:
            return true;
    };
}

const PageFragment = props => renderPageFragment(props);

PageFragment.propTypes = {
    postType: PropTypes.string,
    posts: PropTypes.array,
};
export default PageFragment;
