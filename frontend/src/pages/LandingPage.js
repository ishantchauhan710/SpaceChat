import { Button } from "@mui/material";
import React, { useState } from "react";
import Lottie from "lottie-react";
import landingPageAnimation from "../data/anim/landing_page_animation.json";
import AuthModalComponent from "../components/LandingPage/AuthModalComponent";
import {
  colorOnPrimary,
  colorPrimaryVariant,
  colorTransparent,
} from "../data/color/appColor";
import "../stylesheets/LandingPage.css";

export const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("1"); // 1: Login, 2: Signup

  const handleAuthModalTab = (tabNumber) => {
    setAuthModalTab(tabNumber);
    setShowAuthModal(!showAuthModal);
  };


  return (
    <>
      <div className="landing-page">
        <div className="container-header">
          <ul>
            <li style={{ marginRight: 20 }}>
              <div className="container-app-logo">
                <img className="app-logo" src="./icons/app_logo_light.png" />
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
                borderColor: colorTransparent,
                color: colorOnPrimary,
                marginRight: 20,
                fontSize: "1.2rem",
              }}
              onClick={() => handleAuthModalTab("1")}
              className="landing-page-login-signup-btn"
            >
              Login
            </Button>

            <Button
              variant="outlined"
              style={{
                textTransform: "none",
                borderColor: colorOnPrimary,
                color: colorOnPrimary,
              }}
              className="landing-page-login-signup-btn"
              onClick={() => handleAuthModalTab("2")}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div className="container-landing-page">
          <div className="container-login-content">
            <div className="login-content">
              <span className="landing-page-text-h1">
                Discover friends and people around you
              </span>
              <span className="landing-page-text-h2">
                SpaceChat is the place where you can meet and chat with anyone
                in this world! Built using the power of NodeJs and Socket.io,
                this app is completely free and open source!
              </span>
              <div className="container-landing-page-buttons">
                <Button
                  variant="contained"
                  color="success"
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() => handleAuthModalTab("1")}
                  className="landing-page-control-btn"
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    fontWeight: "bold",
                    textTransform: "none",
                    borderColor: colorOnPrimary,
                    color: colorOnPrimary
                  }}
                  className="landing-page-control-btn btn-view-source-code"
                >
                  View Source Code
                </Button>

                <AuthModalComponent
                  open={showAuthModal}
                  handleClose={handleAuthModalTab}
                  tabNum={authModalTab}
                  setTabNum={setAuthModalTab}
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
