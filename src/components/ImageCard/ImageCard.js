import React from "react";
import PropTypes from "prop-types";
import AspectRatio from "react-aspect-ratio";
import { inferImageDimensions } from '../../utils/image.utils';
import _ from 'lodash';

const ImageCard = props => (
  <div className="card">
    <div className="card-image">
      <AspectRatio
        ratio={inferImageDimensions(props.mediaObject.url)}
        style={{ maxWidth: "200px" }}
      >
        <figure className="image">
          <img src={props.mediaObject.url} />
        </figure>
      </AspectRatio>
    </div>
    <div className="card-content">
      <div className="content is-family-monospace is-size-7">
        <p>{props.mediaObject.name}</p>
        <span>{props.mediaObject.size ? Math.round(parseInt(props.mediaObject.size, 10) / 1024) : 'Size not available.'}</span>
      </div>
    </div>
    <footer className="card-footer">
      <a className="card-footer-item is-size-7">
        Mark as Hero
      </a>
      <a className="card-footer-item is-size-7"
         onClick={props.deleteFileHandler}>
        Delete
      </a>
    </footer>
  </div>
);

export default ImageCard;
