import React from "react";
import { Link } from "react-router-dom";
import eventing1 from "../../assets/images/eventing1.svg";
import Header from "../../components/views/Header/Header";
import "./EventingPage.css";

function EventingPage() {
  // const dummyEventingItems = [
  //   {
  //     events: [
  //       {
  //         idx: 1,
  //         imgUrl: eventing1,
  //       },
  //       {
  //         idx: 2,
  //         imgUrl: eventing1,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="event-div">
      <Header />
      <div className="event-list">
        <Link to="/eventinglist">
          <img src={eventing1} alt="eventing1" className="eventing-img" />
        </Link>
      </div>
    </div>
  );
}

export default EventingPage;
