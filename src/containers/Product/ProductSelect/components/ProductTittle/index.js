import React from "react";
import Button from "components/Button";
import "./styles.scss";
import Icons from "components/Icons";

const ProductTittle = ({
  tourName,
  maxPax,
  rate,
  sumOfReviews,
  locationSrc,
  location,
  id = "",
}) => {
  const handleClick = () => {};
  return (
    <div id={id} className="d-none d-md-flex product-tittle mb-4">
      <div className="tittle-wraper">
        <div className="mb-2 d-inline-flex gap-2">
          <h4 className="mb-0">{tourName}</h4>
          <span className="dot mt-1" />
          <span className="align-self-end">
            max <span>{maxPax}</span> pax
          </span>
        </div>
        <div className="gap-2 product-tittle-foot">
          <label>
            <img src="/bold-star.svg" alt="" />
            <Button type="a" href="/" children={rate} hasUnderline textGray />
          </label>
          <label>
            <img src="/person.svg" alt="" />
            <Button
              type="a"
              href="/"
              textGray
              children={"Reviews (" + sumOfReviews + ")"}
              hasUnderline
            />
          </label>
          <label>
            <img src="/location.svg" alt="" />
            <Button
              type="a"
              href={locationSrc}
              textGray
              children={location}
              hasUnderline
            />
          </label>
          <span>Only you and your group</span>
        </div>
      </div>
      <button
        className="d-flex align-items-center btn-save px-2 py-1 mt-auto"
        onClick={() => handleClick}
      >
        <Icons variant="heart-fill" />
        <small className="ms-2">save</small>
      </button>
    </div>
  );
};

export default ProductTittle;
