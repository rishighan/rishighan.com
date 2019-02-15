import React, { Component } from "react";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <ul>
                { this.props.map((data) => {
                    <li key={ data.id }>
                        { data.title }
                    </li>
                })}
            </ul>
        )
    }
}

export default List;