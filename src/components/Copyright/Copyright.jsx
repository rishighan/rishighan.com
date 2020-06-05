import React from "react";
import moment from "moment";

const Copyright = (props) => {
  return (
    <div className="column is-half">
      <small>
        &copy; Copyright {moment().year()}, {props.options.entity}
        <p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            <img
              alt="Creative Commons License"
              src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg"
            />
          </a>

          <br />
          {props.options.articleToUse} {props.options.copyrightObject} is
          licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
        </p>
      </small>
    </div>
  );
};

export default Copyright;
