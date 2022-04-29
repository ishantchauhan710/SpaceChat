import { Button } from "@mui/material";
import React, { useState } from "react";
import Lottie from "lottie-react";
import landingPageAnimation from "../data/anim/landing_page_animation.json";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AuthModalComponent from "../components/LandingPage/AuthModalComponent";

export const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAuthModal = () => {
    setShowAuthModal(!showAuthModal);
  };

  return (
    <>
      <div className="landing-page">
        <div className="container-header">
          <ul>
            <li style={{ marginRight: 20 }}>
              <div className="app-logo">
                <RocketLaunchIcon style={{ color: "#0a091c" }} />
              </div>
            </li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">More</a>
            </li>
          </ul>

          <div style={{ marginLeft: "auto" }}>
            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                borderColor: "rgba(0,0,0,0)",
                color: "#ffffff",
                marginRight: 20,
                fontSize: "1rem",
              }}
              onClick={handleAuthModal}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                borderColor: "#ffffff",
                color: "#ffffff",
                fontSize: "1rem",
              }}
              onClick={handleAuthModal}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="container-landing-page">
          <div className="container-login-content">
            <div className="login-content">
              <span className="text-h1">
                Discover friends and people around you
              </span>
              <span className="text-h2">
                SpaceChat is the place where you can meet and chat with anyone
                in this world! Built using the power of NodeJs and Socket.io,
                this app is completely free and open source!
              </span>
              <div className="container-landing-page-buttons">
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={handleAuthModal}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    marginLeft: 20,
                    fontSize: 18,
                    fontWeight: "bold",
                    textTransform: "none",
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  }}
                >
                  View Source Code
                </Button>
                <AuthModalComponent
                  open={showAuthModal}
                  handleClose={handleAuthModal}
                />
              </div>
            </div>
          </div>

          <div className="container-login-animation">
            <Lottie
              autoPlay={true}
              loop={true}
              animationData={landingPageAnimation}
            />
          </div>
        </div>
      </div>
    </>
  );
};
