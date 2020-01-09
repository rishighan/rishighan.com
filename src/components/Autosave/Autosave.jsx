import React from 'react';
import { FormSpy } from 'react-final-form';
import _ from 'lodash';
import diff from 'object-diff';

class Autosave extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { values: props.values, submitting: false };
  }

  componentDidUpdate(nextProps) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.save, this.props.debounce);
  }

  save(){
   console.log(s);
    const { values, save } = this.props;
    // This diff step is totally optional
    const difference = diff(this.props.values, values);
    if (Object.keys(difference).length) {
      console.log("here");
      // values have changed
      this.props.save(difference);
      
    }
  }

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return (
      <div className="submitting"><i className="fas fa-save"></i> Autosaving...</div>
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
  <FormSpy {...props} subscription={{ values: true }} component={Autosave} />
);
