import React from 'react';
import dayjs from 'dayjs';

const Copyright = (props) => {
  return (
    <div className="column copyright is-three-quarters has-text-grey is-size-7">
        <p>
          &copy; Copyright {dayjs().year()}, {props.options.author}
        </p>
        <p>
          {props.options.articleToUse} {props.options.copyrightObject} is
          licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
        </p>
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
        </p>
    </div>
  );
};

export default Copyright;
