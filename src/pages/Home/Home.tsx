import React from "react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1 className="hero-title">Welcome to Las Naves Coworking</h1>
        <p className="hero-text">
          Discover a vibrant coworking space where productivity meets community.
          Las Naves is designed to provide you with the perfect environment to
          work, meet, and collaborate. Whether you need a quiet corner for
          focused work, a meeting room for brainstorming sessions, or a larger
          space to gather with your team, we have rooms for every purpose.
        </p>
        <p className="hero-text">
          We’re open Monday to Friday from 9:00 AM to 6:00 PM, offering flexible
          spaces that cater to your needs. With just a few clicks, you can check
          room availability, reserve your preferred space, and seamlessly check
          in or out.
        </p>
        <p className="hero-text">
          Join us at Las Naves—where ideas come to life!
        </p>
      </section>
    </div>
  );
};

export default Home;
