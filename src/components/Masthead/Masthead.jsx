import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  calculateOppositeColor,
  getDominantColor,
  getImageLoadStatus,
} from "../../utils/color.utils";
import styled from "styled-components";

const CaptionContainer = styled.div`
  position: relative;
  top: 400px;
  align-self: flex-end;
  font-weight: normal;
  background: ${(props) => props.bgColor};
  z-index: 99;
  margin-right: 10px;
  padding: 0px 8px;
  border-radius: 5px;
`;

const Caption = styled.span`
  font-size: 0.7em;
  color: ${(props) => props.textColor};
`;
class Masthead extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.imageRef = React.createRef();
    this.state = {
      titleContainerBg: "",
      titleTextColor: "",
    };
  }

  async componentDidMount() {
    const isImageLoaded = await getImageLoadStatus(this.imageRef.current);
    if (isImageLoaded.status === 'ok') {
      const dominantColor = getDominantColor(this.imageRef.current);
      const titleContainerBg = calculateOppositeColor(dominantColor);
      this.setState({
        titleContainerBg,
        textColor: calculateOppositeColor(titleContainerBg),
      });
    }
  }
  render() {
    return (
      <div className="masthead-container">
        {!_.isUndefined(this.imageRef) ? <><figure className="masthead">
          <img crossorigin="anonymous" src={this.props.mastheadImage.url} ref={this.imageRef} />
        </figure>
          <CaptionContainer bgColor={this.state.titleContainerBg} className="masthead-title-container">
            <Caption textColor={this.state.textColor} className="masthead-title">
              {this.props.mastheadImage.title}
            </Caption>
          </CaptionContainer>)</> : null}
      </div>
    );
  }
}

export default Masthead;
