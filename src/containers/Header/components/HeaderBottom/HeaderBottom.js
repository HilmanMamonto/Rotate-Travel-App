import React, { useState } from "react";
import "./styles.scss";
import PropTypes from "prop-types";
import Recomended from "../Form/Location/Recomended/Recomended";
import { useEffect } from "react";
import Manual from "../Form/Location/Manual";
import SearchDate from "../Form/Date/SearchDate";
import { ANIMATE_BACKINDOWN } from "assets/animate/animate";
import SearchPax from "../Form/Pax/SearchPax";
import Icons from "components/Icons";

const HeaderBottom = ({ isActive }) => {
  const [active, setActive] = useState("left");
  const [location, setLocation] = useState("recomended");
  const [values, setValues] = useState({ location: "", date: "", people: "" });

  const classes = {
    left: active === "left" ? "active " : "",
    mid: active === "mid" ? "active " : "",
    right: active === "right" ? "active " : "",
    animate: ANIMATE_BACKINDOWN,
    activate: isActive ? "active " : "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if (!values.location) setLocation("recomended");
  }, [values]);

  const lineLeft = document.querySelector(".line-left");
  const lineRight = document.querySelector(".line-right");

  const hidden = {
    line: {
      left: active === "left" || active === "mid",
      right: active === "mid" || active === "right",
    },
  };

  return (
    <div className={"header-bottom border-bottom  " + classes.activate}>
      <div
        className={"form-search-wrapper d-flex flex-column " + classes.activate}
      >
        <h5
          className={
            "fw-bold d-sm-flex justify-content-center align-items-center "
          }
        >
          Start Your Search
        </h5>
        <form action="search" className={classes.activate}>
          <button
            onClick={() => setActive("left")}
            type="button"
            className={"item-search location " + classes.left}
            onMouseOver={() => (lineLeft.className = "line-left hide")}
            onMouseOut={() => (lineLeft.className = "line-left ")}
          >
            <span>Location</span>
            <input
              autoFocus
              onKeyDown={() => setLocation("manual")}
              onChange={handleChange}
              name="location"
              value={values.location}
              placeholder="Location"
            />
          </button>
          <button
            onClick={() => setActive("mid")}
            type="button"
            className={"item-search date " + classes.mid}
            onMouseOver={() => {
              lineLeft.className = "line-left hide";
              lineRight.className = "line-right hide";
            }}
            onMouseOut={() => {
              lineLeft.className = "line-left";
              lineRight.className = "line-right";
            }}
          >
            <label hidden={hidden.line.left} className="line-left" />
            <span>Date</span>
            <input
              readOnly
              onChange={handleChange}
              name="date"
              value={values.date}
              placeholder="make your day"
            />
            <label hidden={hidden.line.right} className="line-right" />
          </button>
          <div
            onClick={() => setActive("right")}
            type="button"
            className={"item-search people " + classes.right}
            onMouseOver={() => (lineRight.className = "line-right hide")}
            onMouseOut={() => (lineRight.className = "line-right ")}
          >
            <div>
              <span>People who you love</span>
              <input
                readOnly
                onChange={handleChange}
                name="people"
                value={values.people}
                placeholder="add them"
              />
            </div>
            <button type="submit">
              <Icons
                variant="search-white"
                size="large"
                style={{ marginBottom: "1px" }}
              />
            </button>
          </div>
          <div className="hb-left" hidden={active !== "left"}>
            <Recomended
              onChange={handleChange}
              isActive={location === "recomended"}
            />
            <Manual value={values.location} isActive={location === "manuFal"} />
          </div>
          <SearchDate
            onChange={(date) => setValues({ ...values, date: date })}
            hidden={active !== "mid"}
          />
          <SearchPax
            hidden={active !== "right"}
            onChange={(val) => setValues({ ...values, people: val })}
          />
        </form>
      </div>
    </div>
  );
};

HeaderBottom.prototype = {
  isActive: PropTypes.bool,
};

export default HeaderBottom;
