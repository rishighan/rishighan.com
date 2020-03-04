import React from "react";
import PropTypes from "prop-types";
import AspectRatio from "react-aspect-ratio";
import { inferImageDimensions } from '../../utils/image.utils';

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
        <span>{Math.round(props.mediaObject.size / 1024)}</span>
      </div>
    </div>
    <footer className="card-footer">
      <a href="#" className="card-footer-item is-size-7">
        Make Hero
      </a>
      <a href="#" className="card-footer-item is-size-7">
        Delete
      </a>
    </footer>
  </div>
);

export default ImageCard;
