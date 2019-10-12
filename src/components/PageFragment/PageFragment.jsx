import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Heading from '../Heading/Heading';
import Timestamp from '../Timestamp/Timestamp';

const renderPageFragment = (props) => {
  return {
      single: <React.Fragment>
          <div>{props.postData.docs[0].title}</div>
      </React.Fragment>,
    // blog: <React.Fragment>
    //                 { data.map((post, idx) => <article key={idx}>
    //                     <Heading headingText={ post.title } linkHref={ `/post/${post.slug}` } />
    //                     <Timestamp date={ post.date_updated } dateFormat={ 'D MMM, YYYY ' } />
    //                     <section><MarkdownRenderer text={ post.content } /></section>
    //                 </article>)}
    //     </React.Fragment>,
    // titles: <React.Fragment>
    //                 { data.map((post, idx) => <div key={ idx }>
    //                         <Heading headingText={ post.title } linkHref={ `/post/${post.slug}` } />
    //                         <span>{ post.excerpt } </span>
    //                     </div>)}
    //       </React.Fragment>,
    // single: <React.Fragment>
    //                 { data[0] && <article>
    //                     <Heading headingText={ data[0].title } />
    //                     <Timestamp date={ data[0].date_updated } dateFormat={ 'D MMM, YYYY' } />
    //                     <section><MarkdownRenderer text={ data[0].content } /></section>
    //                 </article>}
    //        </React.Fragment>,
    // illustrations: <React.Fragment>
    //                 { data.map((post, idx) => <div key={ idx }>
    //                     <h4>{ post.title }</h4>
    //                     <figure className="image">
    //                         { post.attachment && post.attachment.map((pic, i) => <img key={ i } src={ pic.url } data-meta={pic.isHero}/>)}
    //                     </figure>
    //                     <section><MarkdownRenderer text={ post.content } /></section>
    //                 </div>) }
    //              </React.Fragment>,
    // archive: <React.Fragment>
    //             <ul>
    //                 { data[0] && data[0].archivedPosts && data[0].archivedPosts.map((post, idx) => <li key={ idx }>
    //                     <Heading headingText={ post.title } linkHref={ `/post/${post.slug}` } />
    //                 </li>) }
    //             </ul>
    //        </React.Fragment>,
  };
};

const PageFragment = props => renderPageFragment(props)[props.postType];

PageFragment.propTypes = {
  postType: PropTypes.string,
  posts: PropTypes.array,
};
export default PageFragment;
