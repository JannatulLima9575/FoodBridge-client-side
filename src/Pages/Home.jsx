import React from "react";
import Banner from "../Components/Banner";
import FeaturedDonations from "../Components/FeaturedDonations";
import LatestCharityRequests from "../Components/LatestCharityRequests";
import ImpactStats from "../Components/ImpactStats";
import CommunityStories from "../Components/CommunityStories";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedDonations></FeaturedDonations>
      <LatestCharityRequests></LatestCharityRequests>
      <ImpactStats />
      <CommunityStories />
    </div>
  );
};

export default Home;
