import React, { Component } from 'react';
import { FormSpy } from 'react-final-form';
import diff from 'object-diff';

class AutoSave extends Component {
  constructor(props) {
    super(props);
    this.state = { values: props.values, submitting: false };
    this.save = this.save.bind(this);
  }

  componentDidUpdate() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.save, this.props.debounce);
  }

  async save() {
    if (this.promise) {
      await this.promise;
    }
    const { values, save } = this.props;
    const difference = diff(this.state.values, values);
    if (Object.keys(difference).length) {
      this.setState({ submitting: true, values });
      this.promise = save(this.state.values);
      await this.promise;
      delete this.promise;
      this.setState({ submitting: false });
    }
  }

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return (
      this.state.submitting && <div className="submitting"><i className="fa fa-save"> </i> Saving...</div>
    );
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
export default props => (
  <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
);
