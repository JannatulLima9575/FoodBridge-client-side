import React from "react";
import Banner from "../Components/Banner";
import FeaturedDonations from "../Components/FeaturedDonations";
import LatestCharityRequests from "../Components/LatestCharityRequests";
import ImpactStats from "../Components/ImpactStats";
import CommunityStories from "../Components/CommunityStories";
import HowItWorks from "../Components/HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedDonations></FeaturedDonations>
      <LatestCharityRequests></LatestCharityRequests>
      <HowItWorks></HowItWorks>
      <ImpactStats />
      <CommunityStories />
    </div>
  );
};

export default Home;
