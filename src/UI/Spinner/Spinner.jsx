import PropTypes from 'prop-types';

export const Spinner = ({width, height, color = 'currentColor', duration = 1.2, rmin = 0, scalemin = 1}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="-50 -50 100 100"
    fill={color}
  >
    <defs>
      <style>{`
      .cross-00 {
        /* transform: rotate(0deg); */
      }

      .cross-30 {
        transform: rotate(30deg);
      }

      .cross-60 {
        transform: rotate(60deg);
      }

      .dot {
        animation: sk-circle-bounce-delay ${duration}s infinite ease-in-out both;
      }

      .dot-01 {
        animation-delay: ${duration - duration / 12 * 1}s;
      }

      .dot-02 {
        animation-delay: ${duration - duration / 12 * 2}s;
      }

      .dot-03 {
        animation-delay: ${duration - duration / 12 * 3}s;
      }

      .dot-04 {
        animation-delay: ${duration - duration / 12 * 4}s;
      }

      .dot-05 {
        animation-delay: ${duration - duration / 12 * 5}s;
      }

      .dot-06 {
        animation-delay: ${duration - duration / 12 * 6}s;
      }

      .dot-07 {
        animation-delay: ${duration - duration / 12 * 7}s;
      }

      .dot-08 {
        animation-delay: ${duration - duration / 12 * 8}s;
      }

      .dot-09 {
        animation-delay: ${duration - duration / 12 * 9}s;
      }

      .dot-10 {
        animation-delay: ${duration - duration / 12 * 10}s;
      }

      .dot-11 {
        animation-delay: ${duration - duration / 12 * 11}s;
      }

      @keyframes sk-circle-bounce-delay {

        0%,
        80%,
        100% {
          transform: scale(${scalemin});
          r: ${rmin <= 0 ? 0 : rmin > 5 ? 5 : rmin};
        }

        40% {
          transform: scale(1);
          r: 5
        }
      }
    `}</style>
    </defs>
    <g className="cross-00">
      <circle
        className="dot dot-00"
        cx="0"
        cy="-45"
        r="5"
      />
      <circle
        className="dot dot-03"
        cx="45"
        cy="0"
        r="5"
      />
      <circle
        className="dot dot-06"
        cx="0"
        cy="45"
        r="5"
      />
      <circle
        className="dot dot-09"
        cx="-45"
        cy="0"
        r="5"
      />
    </g>
    <g className="cross-30">
      <circle
        className="dot dot-01"
        cx="0"
        cy="-45"
        r="5"
      />
      <circle
        className="dot dot-04"
        cx="45"
        cy="0"
        r="5"
      />
      <circle
        className="dot dot-07"
        cx="0"
        cy="45"
        r="5"
      />
      <circle
        className="dot dot-10"
        cx="-45"
        cy="0"
        r="5"
      />
    </g>
    <g className="cross-60">
      <circle
        className="dot dot-02"
        cx="0"
        cy="-45"
        r="5"
      />
      <circle
        className="dot dot-05"
        cx="45"
        cy="0"
        r="5"
      />
      <circle
        className="dot dot-08"
        cx="0"
        cy="45"
        r="5"
      />
      <circle
        className="dot dot-11"
        cx="-45"
        cy="0"
        r="5"
      />
    </g>
  </svg>
);

Spinner.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  rmin: PropTypes.number,
  scalemin: PropTypes.number,
  color: PropTypes.string,
};
