import React from "react";
import Banner from "../Components/Banner";
import FeaturedDonations from "../Components/FeaturedDonations";
import LatestCharityRequests from "../Components/LatestCharityRequests";
import ImpactStats from "../Components/ImpactStats";
import CommunityStories from "../Components/CommunityStories";
import HowItWorks from "../Components/HowItWorks";
import Coverage from "../Components/Coverage";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedDonations></FeaturedDonations>
      <LatestCharityRequests></LatestCharityRequests>
      <HowItWorks></HowItWorks>
      <ImpactStats />
      <CommunityStories />
      <Coverage/>
    </div>
  );
};

export default Home;
