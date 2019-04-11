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
                    <label className="label">Name</label>
                    <div className="control">
                        <Field name="title" component="input" placeholder="Enter a Title" className="input" />
                    </div>
                </div>
            </form>
        )} />
</div>;

export default AdminForm;
