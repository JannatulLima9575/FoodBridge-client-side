import React, { Suspense } from "react";
import Banner from "../Components/Banner";
import FeaturedDonations from "../Components/FeaturedDonations";
import LatestCharityRequests from "../Components/LatestCharityRequests";
import ImpactStats from "../Components/ImpactStats";
import CommunityStories from "../Components/CommunityStories";
import HowItWorks from "../Components/HowItWorks";
import Coverage from "../Components/Coverage";
import FoodSliderSection from "../Components/FoodSliderSection";

const Home = () => {

  const donationsPromise = fetch('http://localhost:5000/donations').then(res => res.json());
  return (
    <div>
      <Banner></Banner>
      <Suspense fallback={'Loading featured donations...'}>
        <FeaturedDonations donationsPromise={donationsPromise}></FeaturedDonations>
      </Suspense>
      <LatestCharityRequests></LatestCharityRequests>
      <HowItWorks></HowItWorks>
      <ImpactStats />
      <FoodSliderSection/>
      <CommunityStories />
      <Coverage/>
    </div>
  );
};

export default Home;
