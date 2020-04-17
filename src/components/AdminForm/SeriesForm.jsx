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

    openModal(seriesData) {
        this.setState({
            open: true,
            seriesData,
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
                                                <span>Create Series</span>
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
                                <td><div className="tags">{series.post.map((post, idx) => <span className="tag is-light" key={idx}>{post.title}</span>)}</div></td>
                                <td><div className="field is-grouped are-small">
                                    <span className="icon has-text-grey"
                                        onClick={() => this.openModal(series)}>
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span className="icon has-text-grey">
                                        <i className="fas fa-trash-alt"></i>
                                    </span>
                                </div></td>
                            </tr>))}
                        </>) : null}

                    </tbody>
                </table>

                {/* Edit Series Modal */}
                <Modal
                    isOpen={this.state.open}
                    onRequestClose={() => this.onCloseModal()}
                    style={customStyles}
                >
                    <div className="columns content modal-card-container">
                        <div className="modal-card column is-full-mobile">
                            <header className="modal-card-head">
                                <p className="modal-card-title">Edit Series</p>
                                <button className="delete" aria-label="close" onClick={() => this.onCloseModal()}></button>
                            </header>
                            <section className="modal-card-body">
                                <Form
                                    onSubmit={this.onSubmit}
                                    initialValues={{ ...this.state.seriesData }}
                                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                                        <div className="form" onSubmit={handleSubmit}>
                                            {/* Series Name */}
                                            <div className="field">
                                                <label className="field-label is-normal">Series Name</label>
                                                <div className="control is-expanded">
                                                    <Field name="series_name"
                                                        component="input"
                                                        className="input is-size-5"
                                                        placeholder="Series Name" />
                                                </div>
                                            </div>

                                            {/* Associated Posts */}
                                            <div className="field">
                                                <label className="field-label is-normal">Posts in Series</label>
                                                <div className="control is-expanded">
                                                    <div className="tags has-addons">
                                                        {_.map(values.post, (post, idx) => (<><a className="tag">{post.title}</a>
                                                            <a className="tag is-delete" onClick={ () => {
                                                                let postToBeDeleted = _.find(values.post, {_id: post._id});
                                                                return _.pull(values.post, postToBeDeleted);
                                                            }}></a></>))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="buttons">
                                                <button className="button is-success"
                                                        onClick={() => {}}>Save changes</button>
                                                <button className="button">Cancel</button>
                                            </div>
                                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                                        </div>
                                    )}
                                />
                            </section>
                        </div>
                    </div>
                </Modal>
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

