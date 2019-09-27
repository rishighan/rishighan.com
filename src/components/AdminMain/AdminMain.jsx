import React, { Component } from 'react';
import List from '../List/List';

class AdminMain extends Component {
    render() {
        console.log(this.props.data)
        return(
           <div>{ JSON.stringify(this.props.data) }</div>
        )
    }
}

export default AdminMain;