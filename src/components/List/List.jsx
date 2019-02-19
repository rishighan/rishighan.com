import React, { Component } from "react";
import _ from "lodash";

export const List = (props) => (
        <ul>
            { !_.isEmpty(props.info) ?
                <li>
                    {props.info.map((post) => {
                        { post._id }
                    })}
                </li> : "shoo"
            }
        </ul>
)