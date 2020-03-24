import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import setFieldTouched from 'final-form-set-field-touched';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import _ from 'lodash';
import CreatableSelect from 'react-select/creatable';
import Dropzone from '../Dropzone/Dropzone';

import format from 'date-fns/format';
import hljs from 'highlight.js';
import Interweave from 'interweave';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import Autosave from '../Autosave/Autosave';

import customStyles from '../Select/select-styles';
import 'highlight.js/styles/atom-one-dark.css';

import tags from '../../constants/tags';
import { postsAPICall } from '../../actions/index';

const onSubmit = () => {
  console.log('submitted');
};

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      {
        displayName: 'Markdown',
        markup: <div className="control is-expanded">
          <Field name="content" component="textarea" placeholder="Write" className="textarea is-family-monospace" rows="20" />
        </div>,
      },
      {
        displayName: 'Preview',
        markup: <MarkdownRenderer text={this.props.formData.content} />,
      },
      {
        displayName: 'Diff History',
        markup: <div></div>,
      },
      {
        displayName: 'JSON',
        markup: <div></div>,
      },
    ];

    this.state = {
      currentlySelectedTags: this.formatTags(this.props.formData.tags),
      currentlyActiveTab: this.tabs[0].displayName,
      markup: this.tabs[0].markup,
    };
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  save = async (values) => {
    this.props.updatePost(values);
    await this.sleep(2000);
  };

  formatTags = input => _.map(input, tag => ({ value: tag.value, label: tag.displayName }));

  ReactSelect = ({ input, ...rest }) => (
    <CreatableSelect
      {...input}
      { ...rest }
      styles={customStyles}
      isMulti
    /> 
  );

  changeTab = (newTab) => {
    switch (newTab.displayName) {
      case 'Diff History':
        this.setState({
          currentlyActiveTab: newTab.displayName,
          markup: <>{_.map(this.props.diffHistories, (diffHistory, i) => <pre key={i}>
            <p>{format(diffHistory.createdAt, 'MMMM Do, YYYY')}</p>
            <Interweave content={hljs.highlightAuto(JSON.stringify(diffHistory.diff, null, 4)).value} />
          </pre>)}</>,
        });
        break;
      default:
        this.setState({
          currentlyActiveTab: newTab.displayName,
          markup: newTab.markup,
        });
    }
  };

  componentDidMount() {
    this.props.getDiffHistories(this.props.formData._id);
  }

  render() {
    return (
      <div className="column content is-two-thirds-tablet is-full-mobile">
        <Form
          onSubmit={onSubmit}
          initialValues={
            {
              ...this.props.formData,
            }
          }
          mutators={{ setFieldTouched }}
          render={({
            form, mutators, handleSubmit, pristine, invalid, submitting, values,
          }) => (
              <div className="form">
                {/* Autosave */}
                <Autosave debounce={1000} save={this.save} />

                <h2>Write a Post</h2>
                <div>
                  <span className="is-size-7 has-text-grey-lighter">{this.props.formData._id}</span>
                </div>
                <div className="field">
                  <label className="field-label is-normal">Title</label>
                  <div className="control is-expanded">
                    <Field name="title" component="input" placeholder="Title for this content" className="input" />
                  </div>
                </div>

                {/* Edit mode only */}
                <div className="field">
                  <label className="field-label is-normal">Slug</label>
                  <div className="control is-expanded">
                    <Field name="slug" component="input" className="input" />
                  </div>
                </div>

                {/* Tags */}
                <div>
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
                      className={this.state.currentlyActiveTab === tab.displayName ? 'is-active' : ''}
                      key={idx}
                      onClick={() => { this.changeTab({ markup: tab.markup, displayName: tab.displayName }); }}>
                      <a>{tab.displayName}</a>
                    </li>)}
                  </ul>
                </div>
                <div id="tab-content">
                  {this.state.currentlyActiveTab !== 'JSON' ? this.state.markup
                    : <div><pre><Interweave content={hljs.highlightAuto(JSON.stringify(values, null, 2)).value} /></pre></div>}
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
                  {/* TODO: this is a hack, till I figure out how to use setFieldTouched mutator */}
                  <Field name="attachment"
                    onChange={file => { values.attachment.unshift(file[0]); this.save(values); }}
                    onFileObjectRemoved={file => { _.remove(values.attachment, fileObject => fileObject._id === file._id); this.save(values); }}>
                    {props => <div>
                      <Dropzone {...props} />
                    </div>
                    }
                  </Field>
                </div>

                {/* Metadata */}
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" name="is_sticky" value={this.props.formData.is_sticky} />
                    <span>Make post sticky</span>
                  </label>
                </div>

                {/* Global Form controls */}
                <div className="field is-grouped">
                  <div className="control">
                    <button className="button is-link"
                      onClick={() => this.props.updatePost(values)}
                      disabled={submitting || pristine}
                    >Save Topic</button>
                  </div>
                  <div className="control">
                    <button className="button is-link"
                      disabled={submitting || pristine}
                    >Save As Draft</button>
                  </div>
                  <div className="control">
                    <button className="button is-link is-danger">Delete Post</button>
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
    _.assign(post, { upsertValue: false });
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
