import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import axios from 'axios';
import { POSTS_SERVICE_URI } from '../../constants/endpoints';
import PropTypes from 'prop-types';
import { postsAPICall } from '../../actions';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

Modal.setAppElement('#app');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0px',
        backgroundColor: 'transparent none',
    }
};

class SeriesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postsSearchResults: [],
            open: false,
            formData: {},
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

    editPost(series) {
        console.log(series);
        this.setState({
            formData: series,
        });
    }

    onSubmit(values) {
        console.log(values);
    }
    render() {
        return (
            <div className="column content is-two-thirds is-full-tablet is-full-mobile">
                <Form
                    onSubmit={this.onSubmit}
                    initialValues={{
                        ...this.state.formData
                    }}
                    render={({
                        pristine, submitting, values,
                    }) => (
                            <div className="form">
                                <h2>Manage Series</h2>

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
                                                                    values.post.push(result);
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
                                            return (<div key={idx}
                                                className="tags has-addons">
                                                <span className="tag is-light-grey">{selection.title}</span>
                                                <a className="tag is-delete"
                                                   onClick={() => {
                                                        return _.pull(values.post, selection);
                                                    }}></a>
                                            </div>)
                                        })}
                                    </div>
                                    <div className="is-6">
                                        {/* Create Series */}
                                        <p className="control" >
                                            <button className="button is-inverted"
                                                onClick={() => this.props.createSeries(values)}>
                                                <span className="icon">
                                                    <i className="fas fa-save"></i>
                                                </span>
                                                <span>Create Series</span>
                                            </button>

                                            {!pristine ? (<button className="button is-inverted"
                                                    onClick={() => this.props.createSeries(values)}>
                                                <span className="icon">
                                                    <i className="fas fa-save"></i>
                                                </span>
                                                <span>Update Series</span>
                                            </button>): null} 
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
                            {this.props.series.map((series, idx) => (<tr key={idx} onClick={() => this.editPost(series)}>
                                <td> {series.series_name} </td>
                                <td><div className="tags">{series.post.map((post, idx) => <span className="tag is-light" key={idx}>{post.title}</span>)}</div></td>
                                <td><div className="field is-grouped are-small">
                                    <span className="icon has-text-grey">
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </div></td>
                            </tr>))}
                        </>) : null}

                    </tbody>
                </table>
                {/* {JSON.stringify(this.state)} */}
            </div>
        )
    }
}

function mapStateToProps(state) {
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
    updateSeries: values => {
        dispatch(postsAPICall({
            callURIAction: 'updateSeries',
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

