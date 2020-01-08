import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';
import List from '../List/List';

const renderPageFragment = props => ({
  single: (<>
            {props.singlePostData ? (<article>
                <Heading headingText={props.singlePostData.title} />
                <Timestamp date={props.singlePostData.date_updated} dateFormat={'D MMM, YYYY '} />
                <section>
                    <MarkdownRenderer text={props.singlePostData.content} />
                </section>
            </article>) : null}
        </>),
  blog: (<>
            {_.isArray(props.postsData.posts) ? (<div>
                {props.postsData.posts.map((post, idx) => (<article key={idx}>
                    <Heading headingText={post.title} linkHref={`/post/${post.slug}`} />
                    <Timestamp date={post.date_updated} dateFormat={'D MMM, YYYY '} />
                    <section>
                        <MarkdownRenderer text={post.content} />
                    </section>
                </article>))}
            </div>) : null}
        </>),
  titles: (<>
            {_.isArray(props.postsData.posts) ? (<>
                <List
                    showTags={false}
                    showTimestamps={false}
                    showExcerpts
                >
                    { props.postsData.posts.map(post => post)}
                </List>
            </>) : null}
        </>),
  illustrations: (<>
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
        </>),
  archive: (<>
            {!_.isUndefined(props.postsData.posts[0])
                && !_.isUndefined(props.postsData.posts[0].archivedPosts) ? (<>
                    <List
                        showTags={false}
                        showTimestamps
                    >
                        {props.postsData.posts[0].archivedPosts.map(post => post)}
                    </List>
                </>) : null}
        </>),
});

const PageFragment = props => renderPageFragment(props)[props.postType];

PageFragment.propTypes = {
  postType: PropTypes.string,
  posts: PropTypes.array,
};
export default PageFragment;
