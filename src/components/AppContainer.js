import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store/index';
import EditorJs from 'react-editor-js';

const data = {
  // time: 1556098174501,
  blocks: [
      {
        "type" : "header",
        "data" : {
            "text" : "Why Telegram is the best messenger",
            "level" : 2
        }
    }
  ],
  // version: "2.12.4"
};
const AppContainer = () => (
 <div>
   { data && <EditorJs data={data} /> }
 </div> 
);

export default AppContainer;
