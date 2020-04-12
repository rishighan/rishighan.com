import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import axios from 'axios';
import { POSTS_SERVICE_URI } from '../../constants/endpoints';
import PropTypes from 'prop-types';

class SeriesForm extends Component {
    constructor(props) {
        super(props);
    }

    handlePostsSearch(e) {
        const searchPostsURI = POSTS_SERVICE_URI + 'searchPosts';
        axios.post(searchPostsURI, {
            searchTerm: e.target.value,
            pageOffset: 1,
            pageLimit: 10
        }).then(result => {
            this.setState({
                postsSearchResults: result.data.docs.map(post => {
                    return {
                        id: post._id,
                        title: post.title,
                    };
                }),
            });
        });
    }

    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    async save(values) {
      this.props.updatePost(values);
      await this.sleep(5000);
    }

    onSubmit() {
        console.log(submitted);
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

                                {/* Related Posts */}
                                <div className="box">
                                    <div className="columns">
                                        <div className="column">
                                            <label className="field-label is-normal">Related Posts</label>
                                            <Field name="series_name" component="input" className="input" placeholder="Series name" />
                                        </div>
                                        <div className="column">
                                            <div className="control is-expanded lookup-posts">
                                                <DebounceInput
                                                    minLength={3}
                                                    className="input"
                                                    placeholder='Search Posts'
                                                    debounceTimeout={450}
                                                    onChange={this.handlePostsSearch}
                                                />
                                            </div>
                                            {/* search results */}
                                            {!_.isEmpty(this.state.postsSearchResults) ? (<div className="dropdown is-active">
                                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                                    <div className="dropdown-content">
                                                        <ul>
                                                            {_.map(this.state.postsSearchResults, (result, idx) => {
                                                                return (<li onClick={() => {
                                                                    values.series.push(result.id)
                                                                }}
                                                                    key={idx}>
                                                                    {result.title}
                                                                </li>);
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>) : null}
                                        </div>
                                    </div>
                                    {/* selections */}
                                    <div className="field is-grouped is-grouped-multiline">
                                        {_.map(values.series, selection => {
                                            return (<span className="tags has-addons">
                                                <span className="tag is-info">{selection}</span>
                                                <a className="tag is-delete"></a>
                                            </span>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                />
            </div>
        )
    }
}

export default connect()(SeriesForm)

