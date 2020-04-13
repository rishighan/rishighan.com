import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import axios from 'axios';
import { POSTS_SERVICE_URI } from '../../constants/endpoints';
import PropTypes from 'prop-types';
import { postsAPICall } from '../../actions';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class SeriesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsSearchResults: [],
            open: false,
        };
        this.handlePostsSearch = this.handlePostsSearch.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllSeries();
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

    openModal() {
        this.setState({
            open: true,
        });
    }
    onCloseModal() {
        this.setState({
            open: false,
        });
    }
    onSubmit(values) {
        console.log(values);
    }

    render() {
        const { open } = this.state;
        return (
            <div className="column content is-two-thirds is-full-tablet is-full-mobile">
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{
                        ...this.props.data
                    }}
                    render={({
                        pristine, submitting, values,
                    }) => (
                            <div className="form">
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
                                            {/* Search Results */}
                                            {!_.isEmpty(this.state.postsSearchResults) ? (<div className="dropdown is-active">
                                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                                    <div className="dropdown-content">
                                                        <ul>
                                                            {_.map(this.state.postsSearchResults, (result, idx) => {
                                                                return (<li onClick={() => {
                                                                    values.post.push(result.id)
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
                                        {_.map(values.post, (selection, idx) => {
                                            return (<span key={idx} 
                                                          className="tags has-addons">
                                                <span className="tag is-info">{selection}</span>
                                                <a className="tag is-delete"></a>
                                            </span>)
                                        })}
                                    </div>
                                    <div className="is-6">
                                        {/* Save Post */}
                                        <p className="control" >
                                            <button className="button is-inverted"
                                                onClick={() => this.props.createSeries(values)}>
                                                <span className="icon">
                                                    <i className="fas fa-save"></i>
                                                </span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                />

                {/* Table view of series  */}
                <table className="table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                Series Name
                            </th>
                            <th>
                                Posts
                            </th>

                        </tr>
                        {/* Series names */}
                        {!_.isUndefined(this.props.series) ? (<>
                            {this.props.series.map((series, idx) => (<tr key={idx}>
                                <td> {series.series_name} </td>
                                <td><div className="tags">{series.post.map(post => <span className="tag is-light">{post.title}</span>)}</div></td>
                                <td><div className="field is-grouped are-small">
                                        <span className="icon"
                                              onClick={() => this.openModal()}>
                                            <i className="fas fa-edit"></i>
                                        </span>
                                        <span className="icon">
                                            <i className="fas fa-trash-alt"></i>
                                        </span>
                                </div></td>
                            </tr>))}
                        </>) : null}

                    </tbody>
                </table>

                {/* Modal */}
                <Modal open={open} onClose={() => this.onCloseModal()} center>
                    <h2>Simple centered modal</h2>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.posts.series)
    return {
        createStatus: state,
        series: state.posts.series,
    };
}

const mapDispatchToProps = dispatch => ({
    createSeries: values => {
        dispatch(postsAPICall({
            callURIAction: 'createSeries',
            callMethod: 'post',
            data: values,
        }));
    },
    fetchAllSeries: () => {
        dispatch(postsAPICall({
            callURIAction: 'retrieveSeries',
            callMethod: 'get',
        }))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SeriesForm)

