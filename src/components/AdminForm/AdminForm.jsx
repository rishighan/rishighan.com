import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

const onSubmit = async (values) => {
    console.log('submitted');
};

const tabs = [
    {
        displayName: 'Content',
        markup: <div>coa</div>,
    },
    {
        displayName: 'Preview',
        markup: <div>preview</div>
    }
]

function AdminForm(props) {
    const [tabContent, changeTab] = useState(tabs[0].markup);
    const [currentlyActiveTab, setTab] = useState(tabs[0].displayName);
    
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
                                        className={currentlyActiveTab === tab.displayName ? "is-active" : ""}
                                        key={idx}
                                        onClick={e => {
                                            changeTab(tab.markup);
                                            setTab(tab.displayName);
                                        }}>
                                        <a>{tab.displayName}</a>
                                    </li>)}
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
