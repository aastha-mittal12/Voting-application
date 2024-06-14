import React, { Fragment } from "react";
import Navbar from "../NavBar/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <section className="container">
        <img
          src="https://caltechsites-prod.s3.amazonaws.com/scienceexchange/images/Caltech-Voting-Phone-Online-S.2e16d0ba.fill-933x525-c100.jpg"
          alt=""
        />
        <div className="content">
          <p>REMEMBER! Every Vote Matters.</p>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
