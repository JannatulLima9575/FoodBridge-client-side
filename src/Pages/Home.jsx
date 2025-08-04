import React, { Suspense } from "react";
import Banner from "../Components/Banner";
import LatestCharityRequests from "../Components/LatestCharityRequests";
import ImpactStats from "../Components/ImpactStats";
import CommunityStories from "../Components/CommunityStories";
import HowItWorks from "../Components/HowItWorks";
import Coverage from "../Components/Coverage";
import FoodSliderSection from "../Components/FoodSliderSection";
import FeatureDonations from "../Components/FeatureDonations";


const Home = () => {
  // const donationsPromise = fetch('https://food-bridge-server-side.vercel.app/donations').then(res => res.json());
  return (
    <div>
      <Banner></Banner>
      <FeatureDonations></FeatureDonations>
      <LatestCharityRequests></LatestCharityRequests>
      <HowItWorks></HowItWorks>
      <ImpactStats />
      <FoodSliderSection />
      <CommunityStories />
      <Coverage />
    </div>
  );
};

export default Home;
