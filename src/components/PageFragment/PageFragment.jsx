import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { extractPostByTagName } from "../../utils/post.utils";
import MarkdownRenderer from "../MarkdownRenderer/MarkdownRenderer";
import Heading from "../Heading/Heading";
import Timestamp from "../Timestamp/Timestamp";
import List from "../List/List";
import CalloutCard from "../CalloutCard/CalloutCard";
import axios from "axios";

const getSeriesDataForPost = async (postId) => {
  const series = await axios({
    method: "GET",
    url: "https://posts.services.rishighan.com/api/v1/posts/findSeriesByPostId",
    params: {
      postId,
    },
  });
  return series;
};

const renderPageFragment = (props) => {
  switch (props.postType) {
    case "single":
      return (
        <>
          {!_.isNil(props.singlePostData) ? (
            <article>
              <Heading headingText={props.singlePostData.title} />
              <Timestamp
                date={props.singlePostData.date_updated}
                dateFormat={"D MMM, YYYY "}
              />
              <section>
                <MarkdownRenderer
                  text={props.singlePostData.content}
                  metadata={{
                    postId: props.singlePostData._id,
                  }}
                />
              </section>
            </article>
          ) : null}
        </>
      );

    case "blog":
      // This is to filter out the masthead, blog posts and boxed sets
      // since I format them differently
      let mastheadPost = extractPostByTagName(
        props.postsData.posts,
        "Masthead"
      );
      let boxedSets = extractPostByTagName(props.postsData.posts, "boxedset");
      let blogPosts = _.without(props.postsData.posts, mastheadPost[0]);
      return (
        <>
          {_.isArray(props.postsData.posts) ? (
            <div>
              {blogPosts.map((post, idx) => (
                <article key={idx}>
                  <Heading
                    headingText={post.title}
                    linkHref={`/post/${post.slug}`}
                  />
                  <Timestamp
                    date={post.date_updated}
                    dateFormat={"D MMM, YYYY "}
                  />
                  {/* Series */}
                  {_.findIndex(
                    boxedSets,
                    (boxedPost) => boxedPost._id === post._id
                  ) !== -1 ? (
                    <CalloutCard
                      dataPromise={getSeriesDataForPost(post._id)}
                      calloutText={"This post is a part of a series."}
                    />
                  ) : null}
                  {/* Content */}
                  <section>
                    <MarkdownRenderer
                      text={post.content}
                      metadata={{
                        postId: post._id,
                      }}
                    />
                  </section>
                </article>
              ))}
            </div>
          ) : null}
        </>
      );

    case "work":
      return (
        <>
          {_.isArray(props.postsData.posts) ? (
            <>
              <List
                showTags={false}
                showTimestamps={false}
                showExcerpts
                linkBase={"/post/"}
              >
                {props.postsData.posts.map((post) => post)}
              </List>
            </>
          ) : null}
        </>
      );
    case "illustrations":
      return (
        <>
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
        </>
      );
    case "archive":
      return (
        <>
          {_.isArray(props.postsData.posts) ? (
            <div>
              {props.postsData.posts.map((archive, idx) => (
                <div key={idx}>
                  <h2 className="is-size-3 has-text-grey has-text-weight-normal">
                    {archive._id.year}
                  </h2>
                  <List showTimestamps linkBase={"/post/"}>
                    {!_.isNil(archive.archivedPosts) &&
                      archive.archivedPosts.map((post) => post)}
                  </List>
                </div>
              ))}
            </div>
          ) : null}
        </>
      );
    default:
      return true;
  }
};

const PageFragment = (props) => renderPageFragment(props);

PageFragment.propTypes = {
  postType: PropTypes.string,
  posts: PropTypes.array,
};
export default PageFragment;
