import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import Heading from "../Heading/Heading";
import Timestamp from "../Timestamp/Timestamp";

const renderPageFragment = props => {
  // console.log(props);
  return {
    single: (
      <React.Fragment>
        {props.singlePostData ? (
          <>
            <Heading headingText={props.singlePostData.title} />
            <Timestamp
              date={props.singlePostData.date_updated}
              dateFormat={"D MMM, YYYY "}
            />
            <section>
              <MarkdownRenderer text={props.singlePostData.content} />
            </section>
          </>
        ) : null}
      </React.Fragment>
    ),
    blog: (
      <React.Fragment>
        {_.isArray(props.postsData.posts) ? (
          <div>
            {props.postsData.posts.map((post, idx) => (
              <article key={idx}>
                <Heading
                  headingText={post.title}
                  linkHref={`/post/${post.slug}`}
                />
                <Timestamp
                  date={post.date_updated}
                  dateFormat={"D MMM, YYYY "}
                />
                <section>
                  <MarkdownRenderer text={post.content} />
                </section>
              </article>
            ))}
          </div>
        ) : null}
      </React.Fragment>
    ),
    titles: (
      <React.Fragment>
        {_.isArray(props.postsData.posts) ? (
          <>
            {props.postsData.posts.map((post, idx) => (
              <div key={idx}>
                <Heading
                  headingText={post.title}
                  linkHref={`/post/${post.slug}`}
                />
                <span>{post.excerpt} </span>
              </div>
            ))}
          </>
        ) : null}
      </React.Fragment>
    ),
    illustrations: (
      <React.Fragment>
        {_.isArray(props.postsData.posts) ? (
          <div>
            {props.postsData.posts.map((post, idx) => (
              <div key={idx}>
                <Heading headingText={post.title} />
                <figure className="image">
                  {post.attachment &&
                    post.attachment.map((pic, i) => (
                      <img key={i} src={pic.url} data-meta={pic.isHero} />
                    ))}
                </figure>
                <section>
                  <MarkdownRenderer text={post.content} />
                </section>
              </div>
            ))}
          </div>
        ) : null}
      </React.Fragment>
    ),
    archive: (
      <React.Fragment>
        {!_.isUndefined(props.postsData.posts[0]) &&
        !_.isUndefined(props.postsData.posts[0].archivedPosts) ? (
          <div>
            <ul>
              {props.postsData.posts[0].archivedPosts.map((post, idx) => (
                <li key={idx}>
                  <Heading
                    headingText={post.title}
                    linkHref={`/post/${post.slug}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </React.Fragment>
    )
  };
};

const PageFragment = props => renderPageFragment(props)[props.postType];

PageFragment.propTypes = {
  postType: PropTypes.string,
  posts: PropTypes.array
};
export default PageFragment;
