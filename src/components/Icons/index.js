import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const sizes = {
  small: "icon-small ",
  medium: "icon-medium ",
  large: "icon-large ",
  xlarge: "icon-xlarge ",
};

const variants = {
  warning: "/icons/warning-alert.svg",
  checkmark: "/icons/checkmark-alert.svg",
  dollar: "/icons/dollar.svg",
  "arrow-up": "/icons/arrow-up.svg",
  "arrow-right": "/icons/arrow-right.svg",
  "arrow-right-white-rounded": "/icons/arrow-right-white-rounded.svg",
  home: "/icons/home.svg",
  dashboard: "/icons/dashboard.svg",
  bell: "/icons/bell.svg",
  bag: "/icons/bag.svg",
  "plus-background-rounded": "/icons/plus-background-rounded.svg",
  "star-fill": "/icons/star-fill.svg",
  "checkmark-single": "/icons/checkmark-single.svg",
  "checkmark-single-green": "/icons/checkmark-single-green.svg",
  search: "/icons/search.svg",
  plus: "/icons/plus.svg",
  min: "/icons/min.svg",
  person: "/icons/person.svg",
  "close-bg-gray": "/icons/close-bg-gray.svg",
  "close-white": "/icons/close-white.svg",
  close: "/icons/close-gray.svg",
  "location-fill": "/icons/location-fill.svg",
  burger: "/icons/burger.svg",
};

const Icons = ({ size, variant, onClick, style, className }) => {
  const sizeClass = sizes[size];
  const clickAbility = onClick ? "icon-clickable " : "";
  const classIcon = "icon " + sizeClass + clickAbility + className;
  const url = variants[variant];
  const alt = variant ? url : "";

  return (
    <img
      className={classIcon}
      onClick={onClick}
      style={style}
      src={url}
      alt={alt}
    />
  );
};

Icons.defaultProps = {
  size: "medium",
  url: "",
};

Icons.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string.isRequired,
  style: PropTypes.string,
  onClick: PropTypes.func,
  fullHeight: PropTypes.bool,
  className: PropTypes.string,
};

export default Icons;
