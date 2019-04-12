import React from 'react';
import { Form, Field } from 'react-final-form';

const AdminForm = props => <div className="column content is-two-thirds-tablet is-full-mobile">
    <Form
        // onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
            <form>
                <h2>Write a Post</h2>
                <div className="field">
                    <label className="field-label is-normal">Title</label>
                    <div className="control is-expanded">
                        <Field name="title" component="input" placeholder="Enter a Title" className="input" />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-info">Highlight</span>
                            <a className="tag is-delete"></a>
                        </div>
                    </div>
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-info">General</span>
                            <a className="tag is-delete"></a>
                        </div>
                    </div>
                </div>
            </form>
        )} />
</div>;

export default AdminForm;
