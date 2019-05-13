import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

const onSubmit = async (values) => {
  console.log('submitted');
};

const onDrop = async (file) => {
  console.log('dropped', file);
};

const tabs = [
  {
    displayName: 'Content',
    markup: <div>coa</div>,
  },
  {
    displayName: 'Preview',
    markup: <div>preview</div>,
  },
];

function AdminForm(props) {
  const [tabContent, changeTab] = useState({
    markup: tabs[0].markup,
    currentlyActiveTab: tabs[0].displayName,
  });

  return (
        <div className="column content is-two-thirds-tablet is-full-mobile">
            <Form
                onSubmit={onSubmit}
                initialValues={
                    {
                      ...props.formData,
                    }
                }
                render={({
                  handleSubmit, pristine, invalid,
                }) => (
                        <form>
                            <h2>Write a Post</h2>
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
                                    <div className="field is-grouped">
                                        {props.formData.tags.map((tag, idx) => <div className="control" key={idx}>
                                            <div className="tags has-addons">
                                                <span className="tag is-link">{tag.id}</span>
                                                <a className="tag is-delete"></a>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>

                            <div className="tabs">
                                <ul>
                                    {tabs.map((tab, idx) => <li
                                        className={tabContent.currentlyActiveTab === tab.displayName ? 'is-active' : ''}
                                        key={idx}
                                        onClick={() => {
                                          changeTab({ markup: tab.markup, currentlyActiveTab: tab.displayName });
                                        }}>
                                        <a>{tab.displayName}</a>
                                    </li>)}
                                </ul>
                            </div>
                            <div id="tab-content">
                                {tabContent.markup}
                            </div>

                            <div className="field">
                                <label className="field-label is-normal">Excerpt</label>
                                <div className="control is-expanded">
                                    <Field name="title" component="textarea" placeholder="Write" className="textarea" rows="1" />
                                </div>
                            </div>
                            {/* Media management */}
                            <div className="box">
                                <section>
                                    <Dropzone onDrop={onDrop}>
                                        {({ getRootProps, getInputProps }) => (
                                            <section>
                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                    <input {...getInputProps()} />
                                                    <p>Drag and drop some files here, or click to select files</p>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                    <ul className="is-clearfix">
                                        {props.formData.attachment.map((mediaObj, idx) => <li className="is-pulled-left" key={idx}>
                                            <div className="card">
                                                <div className="card-image">
                                                    <figure className="image is-128x128">
                                                        <img src={mediaObj.url} />
                                                    </figure>
                                                </div>
                                                <div className="card-content">
                                                    <ul className="content is-family-monospace is-size-7">
                                                        <li>{mediaObj.name}</li>
                                                        <li>{mediaObj.size / 1024}</li>
                                                    </ul>
                                                </div>
                                                <footer className="card-footer">
                                                    <a href="#" className="card-footer-item is-size-7">Make Hero</a>
                                                    <a href="#" className="card-footer-item is-size-7">Delete</a>
                                                </footer>
                                            </div>
                                        </li>,)}
                                    </ul>
                                </section>
                            </div>
                        </form>
                )} />
        </div>);
}


AdminForm.propTypes = {
  formData: PropTypes.object,
};

export default AdminForm;
