import React from 'react';
import AspectRatio from 'react-aspect-ratio';
import PropTypes from 'prop-types';
import { inferImageDimensions } from '../../utils/image.utils';

const ImageCard = props => (
  <div
    className={`card ${
      props.mediaObject.isHero ? 'has-background-grey-lighter' : ''
    }`}
  >
    <div className="card-image">
      <AspectRatio
        ratio={inferImageDimensions(props.mediaObject.url)}
        style={{ maxWidth: '200px' }}
      >
        <figure className="image">
          <img src={props.mediaObject.url} />
        </figure>
      </AspectRatio>
    </div>
    <div className="card-content">
      <div className="tags has-addons metadata is-family-monospace is-size-7">
        <span className="tag has-background-light">
          <span className="truncated" alt={props.mediaObject.name}>{props.mediaObject.name}</span>
        </span>
        <span className="tag has-background-grey-light">
          {props.mediaObject.size
            ? Math.round(parseInt(props.mediaObject.size, 10) / 1024)
            : 'Size not available.'}
        </span>
      </div>
    </div>
    <footer className="card-footer">
      <a
        className="card-footer-item is-size-7"
        onClick={props.toggleHeroStatus}
      >
        {props.mediaObject.isHero ? 'Unmark' : 'Mark as Hero'}
      </a>

      <a
        className="card-footer-item is-size-7"
        onClick={props.deleteFileHandler}
      >
        Delete
      </a>
    </footer>
  </div>
);

ImageCard.propTypes = {
  mediaObject: PropTypes.object,
  toggleHeroStatus: PropTypes.func,
  deleteFileHandler: PropTypes.func,
};

export default ImageCard;
