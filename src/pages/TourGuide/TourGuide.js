import Button from "components/Button/Button";
import { useScrollPos } from "components/utility/scrollPos";
import Banner from "containers/Banner/Banner";
import HeaderTourGuide from "containers/HeaderTourGuide/HeaderTourGuide";
import LearnMore from "containers/LearnMore/LearnMore";
import ProfileSlider from "containers/ProfileSlider/ProfileSlider";
import React from "react";

const TourGuide = () => {
  const { scrollPos } = useScrollPos();

  return (
    <div>
      <HeaderTourGuide hidden={scrollPos < 600} />
      <div className="container-fluid">
        <Banner />
        <ProfileSlider />
        <LearnMore />
      </div>
      <div
        style={{ zIndex: 2 }}
        className="position-sticky d-flex d-md-none bottom-0 py-4 px-4 bg-white shadow-lg"
      >
        <Button
          fullWidth
          label="Join"
          justifyContent="center"
          size="large"
          color="secondary"
          shadow="medium"
        />
      </div>
    </div>
  );
};

export default TourGuide;
