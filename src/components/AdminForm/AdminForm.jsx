import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

const onSubmit = async (values) => {
  console.log('submitted');
};

const AdminForm = props => <div className="column content is-two-thirds-tablet is-full-mobile">
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
                    <h3>Write a Post</h3>
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

                    <div className="field is-grouped">
                        {props.formData.tags.map((tag, idx) => <div className="control" key={idx}>
                            <div className="tags has-addons">
                                <span className="tag is-link">{tag.id}</span>
                                <a className="tag is-delete"></a>
                            </div>
                        </div>)}
                    </div>

                    <div className="field">
                        <label className="field-label is-normal">Content</label>
                        <div className="control is-expanded">
                            <Field name="content" component="textarea" placeholder="Write" className="textarea" rows="14" />
                        </div>
                    </div>

                    <div className="field">
                        <label className="field-label is-normal">Excerpt</label>`
                        <div className="control is-expanded">
                            <Field name="title" component="textarea" placeholder="Write" className="textarea is-small" rows="3" />
                        </div>
                    </div>
                </form>
        )} />
</div>;

AdminForm.propTypes = {
  formData: PropTypes.object,
};

export default AdminForm;
