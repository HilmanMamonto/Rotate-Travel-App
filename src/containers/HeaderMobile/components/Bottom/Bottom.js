import React from "react";
import "./styles.scss";
import Icons from "components/Icons";
import IconButton from "components/IconButton/IconButton";
import Slider from "components/DataDisplay/Slider/Slider";
import SimpleCard from "components/DataDisplay/SimpleCard/SimpleCard";
import _dataVacStay from "json/vacations-staycations-recomendation.json";
import { useState } from "react";
import ButtonUnderlline from "components/ButtonUnderline/ButtonUnderlline";
import DateRangePicker from "components/Input/DateRangePicker/DateRangePicker";
import Counter from "components/Counter/Counter";
import Button from "components/Button/Button";
import SearchList from "components/DataDisplay/SearchList/SearchList";
import { useEffect } from "react";
import { format } from "date-fns";

const Location = ({ isActive, onClick, onStatus }) => {
  const [value, setValue] = useState("");
  const [active, setActive] = useState("Vacations");
  const [as, setAs] = useState("recomendate");

  const data =
    active === "Vacations" ? _dataVacStay.vacations : _dataVacStay.staycations;

  useEffect(() => {
    if (!value) setAs("recomendate");
  }, [value]);

  return (
    <section>
      <div hidden={!isActive} className="items shadow  p-4">
        <h5 className="mb-3">Where Are You Going?</h5>
        <div className="d-flex gap-2 h-100 align-items-center border rounded px-3 py-2">
          <Icons variant="search" size="large" />
          <input
            name="search"
            onKeyDown={() => setAs("manual")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Where to?"
          />
          {value && (
            <IconButton
              onClick={() => setValue("")}
              className="h-100 d-flex align-items-center"
              variant="close-bg-gray"
              size="large"
            />
          )}
        </div>
        <div hidden={as === "manual"}>
          <div className="d-flex gap-4 mt-4 mb-3">
            <ButtonUnderlline
              onClick={() => setActive("Vacations")}
              isActive={active === "Vacations"}
              label="Vacations"
            />
            <ButtonUnderlline
              onClick={() => setActive("Staycations")}
              isActive={active === "Staycations"}
              label="Staycations"
            />
          </div>
          <Slider className="gap-2">
            {data.map((item, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setValue(active + " " + item.tittle);
                    onStatus("done");
                  }}
                >
                  <SimpleCard tittle={item.tittle} imageUrl={item.image} />
                </button>
              );
            })}
          </Slider>
        </div>
        <SearchList
          onChange={(val) => {
            setValue(val);
            if (val) onStatus("done");
            setAs("recomendate");
          }}
          className="mt-3"
          value={value}
          hidden={as === "recomendate"}
        />
      </div>
      <button
        type="button"
        onClick={onClick}
        hidden={isActive}
        className="minimize w-100 items shadow px-4 py-3 "
      >
        <span className="fw-semibold">Where</span>
        <span>{value ? value : "anywhere"}</span>
      </button>
    </section>
  );
};

const Date = ({ isActive, onClick }) => {
  const [data, setData] = useState();
  const [values, setValues] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    if (data) {
      const startDate = format(data.startDate, "MM/dd/yyyy");
      const endDate = format(data.endDate, "MM/dd/yyyy");
      setValues({
        startDate: startDate.split("/").join("-"),
        endDate: endDate.split("/").join("-"),
      });
    }
  }, [data]);

  return (
    <section>
      <div hidden={!isActive} className="items shadow  p-4 ">
        <h5 className="mb-3">When's your trip?</h5>
        <DateRangePicker onChange={(val) => setData({ ...val })} />
      </div>
      <button
        type="button"
        onClick={onClick}
        hidden={isActive}
        className="minimize items shadow w-100  px-4 py-3 justify-content-between"
      >
        <span className="fw-semibold">When</span>
        <span>{values.startDate + " to " + values.endDate}</span>
        <input type="hidden" name="startDate" value={values.startDate} />
        <input type="hidden" name="endDate" value={values.endDate} />
      </button>
    </section>
  );
};

const Who = ({ isActive, onClick }) => {
  const [value, setValue] = useState(1);

  return (
    <section>
      <div hidden={!isActive} className="items shadow p-4 ">
        <h5 className="mb-3">Who's will go?</h5>
        <div className="d-flex align-items-center justify-content-between">
          <label>People you love</label>
          <Counter
            initial={1}
            max={9}
            value={value}
            onChange={(val) => setValue(val)}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onClick}
        hidden={isActive}
        className={"minimize items w-100 shadow  px-4 py-3 "}
      >
        <span className="fw-semibold">People</span>
        <span>{value}</span>
        <input type="hidden" name="people" value={value} />
      </button>
    </section>
  );
};

const Bottom = ({ isActive, onClick }) => {
  const [active, setActive] = useState("location");
  const classes = {
    activate: isActive ? "active " : "",
  };

  const handleSkip = () => {
    if (active === "location") setActive("date");
    if (active === "date") setActive("who");
  };

  return (
    <form
      method="GET"
      action="/"
      className={"header-mobile-bottom bg-light " + classes.activate}
    >
      <div className="container bg-light hmb-head d-flex pt-4 pb-2 ps-4 align-items-center align-items-center gap-2 mb-2">
        <IconButton
          onClick={onClick}
          className="hmb-btn-close shadow-sm rounded-pill"
          variant="close"
          size="xlarge"
        />
        <h5 className="mb-0 d-flex justify-content-center w-100">
          Start Your Search
        </h5>
      </div>
      <div className="hmb-items bg-light py-4 container px-4">
        <div className="d-flex flex-column gap-4">
          <Location
            isActive={active === "location"}
            onClick={() => setActive("location")}
            onStatus={(stat) => stat === "done" && setActive("date")}
          />
          <Date
            isActive={active === "date"}
            onClick={() => setActive("date")}
          />
          <Who isActive={active === "who"} onClick={() => setActive("who")} />
        </div>
      </div>
      <div className="container border-top hmb-nav py-3">
        <button type="button" onClick={handleSkip}>
          skip
        </button>
        <Button
          type="submit"
          className="px-5"
          label="search"
          size="large"
          color="secondary"
          shadow="medium"
        />
      </div>
    </form>
  );
};

export default Bottom;
