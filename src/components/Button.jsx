import React, { Component } from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <button>{ this.props.buttonText }</button>
        )
    }
}

export default Button