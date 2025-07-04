import React from "react";
import Header from "../components/Header";
import Speciality from "../components/Speciality";
import Topdoctors from "../components/Topdoctors";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <Speciality />
      <Topdoctors />
      <Banner />
      <Footer />
    </div>
  );
};

export default Home;
