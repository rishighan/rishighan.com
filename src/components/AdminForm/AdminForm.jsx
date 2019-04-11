import React from 'react';
import { Form, Field } from 'react-final-form'

const AdminForm = (props) => <React.Fragment>
    <Form
        // onSubmit={onSubmit}
        // validate={validate}
        render={({ handleSubmit, pristine, invalid }) => (
            <form>
                <h2>Write a Post</h2>
                <div className="field is-horizontal">
                    <label className="field-label is-normal">Title</label>
                    <div className="control is-expanded">
                        <Field name="title" component="input" placeholder="Enter a Title" className="input" />
                    </div>
                </div>
            </form>
        )} />
</React.Fragment>

export default AdminForm;