import InputCheckBox from "components/Input/CheckBox/CheckBox";
import TextArea from "components/Input/TextArea/TextArea";
import TimePicker from "components/TimePicker/TimePicker";
import React from "react";
import { useState } from "react";
import Button from "components/NewButton/Button";
import InputItinerary from "components/DataDisplay/InputItinerary/InputItinerary";
import "./styles.scss";
import "animate.css";
import { Input } from "components/Input/Input/Input";
import { ANIMATE_FADEIN } from "assets/animate/animate";
import { useEffect } from "react";
import { useDifferenceTime } from "components/utility/differenceTime";

const InputSchedule = ({ onChange }) => {
  const getItinerary = JSON.parse(localStorage.getItem("itinerary"));
  const initial = {
    values: {
      schedule: "",
      timeStart: "",
      timeEnd: "",
      validity: "",
    },
    data: [],
  };

  const [data, setData] = useState(initial.data);
  const [values, setValues] = useState(initial.values);
  const [difTime, setDifTime] = useDifferenceTime();

  const handleAdd = () => {
    if (
      values.schedule &&
      values.timeStart &&
      values.timeEnd &&
      values.validity === "valid"
    ) {
      setData([...data, values]);
      setValues({ ...values, schedule: "", timeStart: values.timeEnd });
    }
  };

  useEffect(() => {
    onChange({ target: { name: "itinerary", value: data } });
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, validity } = e.target;
    setValues({ ...values, [name]: value });
    type === "time" &&
      setValues({ ...values, [name]: value, validity: validity });
  };

  useEffect(() => {
    setDifTime(values.timeStart, values.timeEnd);

    if (data.length > 0)
      setDifTime(data[0].timeStart, data[data.length - 1].timeEnd);
  }, [data]);

  const handleReset = () => {
    setValues(initial.values);
    setData(initial.data);
  };

  const currentHour = parseInt(difTime.split(":")[0]);

  return (
    <div className="mb-3">
      <InputItinerary
        numOfTime={difTime}
        onClickReset={handleReset}
        className="mb-3"
        data={data}
      />
      <TimePicker
        onValidate={(v) => setValues({ ...values, validity: v })}
        value={{ timeStart: values.timeStart, timeEnd: values.timeEnd }}
        required={currentHour < 8}
        startDisabled={data.length > 0}
        disabled={currentHour >= 8}
        className="mb-4"
        size="large"
        onChange={handleChange}
      />
      <TextArea
        className="mb-3"
        placeholder="Input schedule..."
        min={50}
        disabled={currentHour >= 8}
        name="schedule"
        required={currentHour < 8}
        value={values.schedule}
        onChange={handleChange}
      />
      <Button
        fullWidth
        type="button"
        size="large"
        variant="outline"
        justifyContent="center"
        label="Add Schedule"
        onClick={handleAdd}
      />
    </div>
  );
};

const dataAmenities = ["sun screen", "lunch", "mineral water"];

const Desc = () => {
  const initial = {
    tittle: "",
    maxPax: "",
    budget: "",
    placeDesc: "",
    itinerary: {},
    amenities: [],
  };

  const [values, setValues] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <form className={ANIMATE_FADEIN} onSubmit={handleSubmit}>
      <Input
        type="text"
        className="mb-3"
        label="Tittle"
        required
        minLength={20}
        maxLength={100}
        name="tittle"
        onChange={handleChange}
      />
      <div className="d-flex gap-3 mb-3">
        <Input
          leftIcon="budget"
          type="number"
          required
          min={1}
          label="Budget / Pax"
          max={1000}
          name="budget"
          onChange={handleChange}
        />
        <Input
          label="Max Pax"
          type="number"
          min={1}
          max={6}
          name="maxPax"
          onChange={handleChange}
          required
        />
      </div>
      <div className="d-flex gap-3 mb-3">
        <InputCheckBox
          required
          onChange={() => ""}
          label="Amenities"
          data={dataAmenities}
          name="amenities"
        />
        <InputCheckBox
          onChange={() => ""}
          label="Not Includes"
          data={dataAmenities}
          name="notIncludes"
        />
      </div>
      <TextArea
        className="mb-3"
        minLength={20}
        required
        name="place description"
        label="Place Descrition"
        value={values.value}
        onChange={(e) => setValues({ ...values, placeDesc: e.target.value })}
      />
      <InputSchedule onChange={handleChange} />
      <TextArea
        className="mb-3"
        min={20}
        name="more"
        label="More Things Visitors Must To Know"
        value={""}
        onChange={() => ""}
      />
      <Button
        fullWidth
        buttonType="submit"
        size="large"
        shadow="medium"
        justifyContent="space-betwen"
        label="Add Desc and Next"
        rightIcon="btn-rounded"
      />
    </form>
  );
};

export default Desc;
