import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

const onSubmit = async (values) => {
    console.log('submitted');
};

const contentDirectory = {
    content: <div>coa</div>,
    preview: <div>preview</div>
}

function AdminForm(props) {
    const [tabContent, changeTab] = useState(contentDirectory['content']);
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
                                    <li className="is-active" onClick={() => changeTab(contentDirectory['content'])}>
                                        <a>Content</a>
                                    </li>
                                    <li onClick={() => changeTab(contentDirectory['preview'])}>
                                        <a>Preview</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="tab-content">
                                {tabContent}
                            </div>

                            <div className="field">
                                <label className="field-label is-normal">Excerpt</label>
                                <div className="control is-expanded">
                                    <Field name="title" component="textarea" placeholder="Write" className="textarea is-small" rows="3" />
                                </div>
                            </div>
                        </form>
                    )} />
        </div>);
}





AdminForm.propTypes = {
    formData: PropTypes.object,
};

export default AdminForm;
