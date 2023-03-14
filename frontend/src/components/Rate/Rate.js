import React, { useMemo, useState } from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Rate({ count, rating, color, onRating }) {
  const [hoverRating, setHoverRating] = useState(0);
  const getColor = index => {
    if (hoverRating >= index) {
        return color.filled;
    }else if (!hoverRating && rating >= index)
    {
        return color.filled;
    }

    return color.unfilled
  };
  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((idx) => (
        <FontAwesomeIcon
          key={idx}
          className="cursor-pointer fa-1x"
          icon={faStar}
          style = {{color: getColor(idx) , marginBottom:"2vh"}}
          onClick={() => onRating(idx)}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ));
  }, [count, rating,hoverRating]);

  return <div>{starRating}</div>;
}

Rate.propTypes = {
  count: propTypes.number,
  rating: propTypes.number,
  onChange: propTypes.func,
  color: {
    filled: propTypes.string,
    unfilled: propTypes.string,
  },
};

Rate.defaultProps = {
  count: 5,
  rating: 0,
  color: {
    filled: "#f5eb3b",
    unfilled: "#dcdcdc",
  },
};

export default Rate;
