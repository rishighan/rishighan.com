import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import AspectRatio from 'react-aspect-ratio';
import Autosave from '../Autosave/Autosave';
import MarkdownRenderer from '../MarkdownRenderer/MarkdownRenderer';
import { postsAPICall, onDroppedFile } from '../../actions/index';
import { inferImageDimensions } from '../../utils/image.utils';

const onSubmit = () => {
  console.log('submitted');
};
class AdminForm extends Component {
  constructor(props) {
    super(props);
    
    this.tabs = [
      {
        displayName: 'Preview',
        markup: <MarkdownRenderer text={this.props.formData.content} />,
      },
      {
        displayName: 'Raw',
        markup: <div className="control is-expanded">
                  <Field name="content" component="textarea" placeholder="Write" className="textarea is-family-monospace" rows="20" />
              </div>,
      },
      {
        displayName: 'Diff History',
        markup: <div>yaaa</div>,
      },
      {
        displayName: 'JSON',
        markup: <div><pre>{JSON.stringify(this.props.formData, null, 2) }</pre></div>,
      },
    ];
    this.state = {
      posts: this.props.formData,
      currentlyActiveTab: this.tabs[0].displayName,
      markup: this.tabs[0].markup,
    };
  }

  changeTab = (newTab) => {
    this.setState({
      currentlyActiveTab: newTab.displayName,
      markup: newTab.markup,
    });
  };

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
                render={({
                  handleSubmit, pristine, invalid,
                }) => (
                        <div className="form">
                            <h2>Write a Post</h2>
                            <div>
                                <span className="is-size-7 has-text-grey-lighter">{ this.props.formData._id}</span>
                            </div>
                            {/* <Autosave debounce={1000} save={this.props.updatePost} /> */}
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

                            <div className="field">
                                <label className="field-label is-normal">Tags</label>
                                <div className="field-body">
                                    {this.props.formData.tags.map((tag, idx) => <div key={idx}>
                                        <div className="tags has-addons is-grouped">
                                            <span className="tag is-light">{tag.id}</span>
                                            <a className="tag is-delete"></a>
                                        </div>
                                    </div>)}
                                </div>
                            </div>

                            <div className="tabs">
                                <ul>
                                    {this.tabs.map((tab, idx) => <li
                                        className={this.state.currentlyActiveTab === tab.displayName ? 'is-active' : ''}
                                        key={idx}
                                        onClick={ () => { this.changeTab({ markup: tab.markup, displayName: tab.displayName }); }}>
                                        <a>{tab.displayName}</a>
                                    </li>)}
                                </ul>
                            </div>
                            <div id="tab-content">
                                {this.state.markup}
                            </div>

                            <div className="field">
                                <label className="field-label is-normal">Excerpt</label>
                                <div className="control is-expanded">
                                    <Field name="excerpt" component="textarea" placeholder="Write" className="textarea" rows="1" />
                                </div>
                            </div>
                            {/* Media management */}
                            <div className="box">
                                <section>
                                    <Dropzone onDrop={onDroppedFile}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps({ name: 'asset' })} />
                                                    <p>Drag and drop some files here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <ul className="is-clearfix">
                                        {this.props.formData.attachment.map((mediaObj, idx) => <li className="is-pulled-left" key={idx}>
                                            <div className="card">
                                                <div className="card-image">
                                                    <AspectRatio ratio={inferImageDimensions(mediaObj.url)} style={{ maxWidth: '200px' }}>
                                                        <figure className="image">
                                                            <img src={mediaObj.url} />
                                                        </figure>
                                                    </AspectRatio>
                                                </div>
                                                <div className="card-content">
                                                    <div className="content is-family-monospace is-size-7">
                                                        <p>{mediaObj.name}</p>
                                                        <span >{Math.round(mediaObj.size / 1024)}</span>
                                                    </div>
                                                </div>
                                                <footer className="card-footer">
                                                    <a href="#" className="card-footer-item is-size-7">Make Hero</a>
                                                    <a href="#" className="card-footer-item is-size-7">Delete</a>
                                                </footer>
                                            </div>
                                        </li>)}
                                    </ul>
                                </section>
                            </div>
                            {/* Metadata */}
                            <div className="field is-grouped">
                            <label className="checkbox">
                              <input type="checkbox" name="is_sticky" value={this.props.formData.is_sticky} />
                               Make post sticky
                            </label>
                            </div>
                            {/* Global Form controls */}
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" onClick={ () => this.props.updatePost(this.state.posts) }>Save Topic</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link">Save As Draft</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-danger">Delete Post</button>
                                </div>
                            </div>
                        </div>
                )} />
        </div>);
  }
}

function mapStateToProps(state) {
  return {
    updateStatus: state.posts.posts,
  };
}

const mapDispatchToProps = dispatch => ({
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
  onDroppedFile: PropTypes.func,
  updatePost: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminForm);
