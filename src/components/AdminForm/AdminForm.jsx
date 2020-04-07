import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';
import CreatableSelect from 'react-select/creatable';

import format from 'date-fns/format';
import { Markup } from 'interweave';
import Dropzone from '../Dropzone/Dropzone';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Autosave from '../Autosave/Autosave';

import customStyles from '../Select/select-styles';

import tags from '../../constants/tags';
import { createSlug } from '../../utils/slug.util';
import { postsAPICall } from '../../actions/index';

const onSubmit = () => {
  console.log('submitted');
};

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.tabs = ['Markdown', 'Preview', 'Diff History', 'JSON'];

    this.state = {
      currentlyActiveTab: this.tabs[0],
      markup: <div className="control is-expanded">
        <this.MarkdownEditor content={this.props.formData.content} />
      </div>,
    };
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  save = async (values) => {
    this.props.updatePost(values);
    await this.sleep(5000);
  };

  ReactSelect = ({ input, ...rest }) => (<CreatableSelect
    {...input}
    {...rest}
    styles={customStyles}
    isMulti
  />);

  MarkdownEditor = ({ content }) => (<Field name="content"
    component="textarea"
    value={content}
    placeholder="Write"
    className="textarea is-family-monospace"
    rows="20" />)

  renderTabContent = (tabName, values) => {
    switch (tabName) {
      case 'JSON':
        this.setState({
          currentlyActiveTab: tabName,
          markup: <>
            <pre>
              <Markup content={JSON.stringify(values, null, 2)} />
            </pre>
          </>,
        });
        break;
      case 'Preview':
        this.setState({
          currentlyActiveTab: tabName,
          markup: <MarkdownRenderer text={values.content} />,
        });
        break;
      case 'Diff History':
        this.setState({
          currentlyActiveTab: tabName,
          markup: <>{_.map(this.props.diffHistories, (diffHistory, i) => <pre key={i}>
            <p>{format(diffHistory.createdAt, 'MMMM Do, YYYY')}</p>
            <Markup content={JSON.stringify(diffHistory.diff, null, 4)} />
          </pre>)}</>,
        });
        break;

      case 'Markdown':
        this.setState({
          currentlyActiveTab: tabName,
          markup: <div className="control is-expanded">
            {<this.MarkdownEditor content={values.content} />}
          </div>,
        });
        break;
      default:
        return null;
    }
  }

  componentDidMount() {
    this.props.getDiffHistories(this.props.formData._id);
  }

  render() {
    return (
      <div className="column content is-two-thirds is-full-tablet is-full-mobile">
        <Form
          onSubmit={onSubmit}
          initialValues={
            {
              ...this.props.formData,
            }
          }
          render={({
            pristine, submitting, values,
          }) => (
              <div className="form">
                {/* Autosave */}
                <Autosave debounce={1000} save={this.save} />

                <h2>Write a Post</h2>
                <div>
                  <span className="is-size-7">
                    {/* Statuses */}
                    <div className="tags has-addons has-text-grey-lighter is-pulled-left">
                      {values._id ? <span className="tag is-light">{values._id}</span> : null}
                      {values.is_draft ? <span className="tag is-warning">Draft</span> : null}
                      {values.is_sticky ? <span className="tag is-primary">Sticky</span> : null}
                      {values.is_archived ? <span className="tag is-info">Archived Post</span> : null}
                    </div>

                    {/* Preview post */}
                    <a href={`/post/${values.slug}`} target="blank" title="Preview Post">
                      <span className="icon is-small has-text-dark-grey preview-post">
                        <i className="fas fa-external-link-alt" />
                      </span>
                    </a>
                  </span>
                </div>

                {/* Title */}
                <div className="field">
                  <label className="field-label is-normal">Title</label>
                  <div className="control is-expanded">
                    <Field name="title"
                      component="input"
                      className="input is-size-5"
                      placeholder="Title for this content" />
                  </div>
                </div>

                {/* Slug */}
                <div className="field">
                  <label className="field-label is-normal">Slug</label>
                  <div className="control is-expanded">
                    <Field name="slug" component="input" className="input" />
                  </div>
                </div>

                {/* Tags */}
                <div className="field">
                  <label className="field-label is-normal">Tags</label>
                  <Field
                    name="tags"
                    component={this.ReactSelect}
                    options={tags}
                  />
                </div>

                {/* Tabs: Content, MD preview, JSON model and more */}
                <div className="tabs">
                  <ul>
                    {this.tabs.map((tab, idx) => <li
                      className={this.state.currentlyActiveTab === tab ? 'is-active' : ''}
                      key={idx}
                      onClick={() => { this.renderTabContent(tab, values); }}>
                      <a>{tab}</a>
                    </li>)}
                  </ul>
                </div>
                <div id="tab-content">
                  {this.state.markup}
                </div>

                {/* Excerpt */}
                <div className="field">
                  <label className="field-label is-normal">Excerpt</label>
                  <div className="control is-expanded">
                    <Field name="excerpt" component="textarea" placeholder="Write" className="textarea" rows="1" />
                  </div>
                </div>

                {/* Media management */}
                <div className="box">
                  <label className="field-label is-normal">Attachments</label>
                  {/* TODO: Figure out how to use setFieldTouched mutator.
                            Currently, all changes are manually saved using this.save()
                            Blurring of the input is necessary to update form model */}
                  <Field name="attachment"
                    onChange={(file) => { values.attachment.unshift(file[0]); this.save(values); }}
                    toggleHeroStatus={(file) => {
                      const formModel = values;
                      const affectedFileIndex = _.findIndex(values.attachment, fileObj => fileObj._id === file._id);
                      formModel.attachment[affectedFileIndex].isHero = file.isHero === false;
                      _.each(values.attachment, (fileObj) => {
                        if (fileObj._id !== file._id) {
                          fileObj.isHero = false;
                        }
                      });
                      this.save(values);
                    }}
                    onFileObjectRemoved={(file) => { _.remove(values.attachment, fileObject => fileObject._id === file._id); this.save(values); }}
                    component={() => null}
                  >
                    {props => <div>
                      <Dropzone {...props} />
                    </div>
                    }
                  </Field>
                </div>

                {/* Global Form controls */}
                <div className="field">
                  <div className="buttons has-addons">
                    {/* Save Post */}
                    <button className="button is-inverted"
                      onClick={() => this.props.updatePost(values)}
                      disabled={submitting || pristine}>
                      <span className="icon">
                        <i className="fas fa-save"></i>
                      </span>
                    </button>

                    {/* Save draft */}
                    <button className="button is-primary" disabled={submitting} >
                      <span className="icon">
                        <i className="fas fa-paperclip"></i>
                      </span>
                      <label>
                        <Field
                          name="is_sticky"
                          component="input"
                          type="checkbox"
                        />{' '}
                        <span>{values.is_sticky ? 'Unstick' : 'Make Sticky'}</span>
                      </label>
                    </button>

                    {/* Make Sticky */}
                    <button className="button is-warning" disabled={submitting}>
                      <span className="icon">
                        <i className="fab fa-firstdraft"></i>
                      </span>
                      <label>
                        <Field
                          name="is_draft"
                          component="input"
                          type="checkbox"
                        />{' '}
                        <span>{values.is_draft ? 'Unmark Draft' : 'Save Draft'}</span>
                      </label>
                    </button>
                  </div>

                  <div className="buttons has-addons">
                    {/* Archive */}
                    <button className="button is-info" disabled={submitting} >
                      <span className="icon">
                        <i className="fas fa-archive"></i>
                      </span>
                      <label>
                        <Field
                          name="is_archived"
                          component="input"
                          type="checkbox"
                        />{' '}
                        <span>{values.is_archived ? 'Unarchive' : 'Archive'}</span>
                      </label>
                    </button>

                    {/* Delete */}
                    <button className="button is-link is-danger">
                      <span className="icon">
                        <i className="far fa-trash-alt"></i>
                      </span>
                      <span>Delete Post</span>
                    </button>
                  </div>
                </div>
              </div>
          )}
        />
      </div>);
  }
}

function mapStateToProps(state) {
  return {
    updateStatus: state.posts.posts,
    diffHistories: state.posts.diffHistories,
  };
}

const mapDispatchToProps = dispatch => ({
  getDiffHistories: (postId) => {
    dispatch(postsAPICall({
      callURIAction: 'getDiffHistories',
      callMethod: 'get',
      callParams: {
        postId,
      },
    }));
  },
  updatePost: (post) => {
    _.assign(post, {
      upsertValue: false,
      slug: createSlug(post.title),
      is_archived: post.is_archived,
      is_sticky: post.is_sticky,
    });
    dispatch(postsAPICall({
      callURIAction: 'update',
      callMethod: 'post',
      callParams: {
        postId: post._id,
      },
      data: post,
    }));
  },
});

AdminForm.propTypes = {
  formData: PropTypes.object,
  updatePost: PropTypes.func,
  getDiffHistories: PropTypes.func,
  diffHistories: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
