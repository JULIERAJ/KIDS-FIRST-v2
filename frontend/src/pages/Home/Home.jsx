import React from 'react';
import { Button } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';

import './Home.css';

import feature_2 from '../../media/homePage/feature_child_info.png';
import feature_1 from '../../media/homePage/feature_interactive_calendar.png';
import feature_3 from '../../media/homePage/feature_law_popups.png';
import value_2 from '../../media/homePage/value_co-parenting.png';
import value_1 from '../../media/homePage/value_kid_harmony.png';
import value_3 from '../../media/homePage/value_learning.png';
import video from '../../media/homePage/video_placeholder.png';

export default function Home() {
  return ( 
    <>
      <div className="banner-section" id="first-banner" >
        <div className="left-blurb">
          <h1>A CO-PARENTING APP SOLUTION</h1>
          <p>that maintain harmony in your kid’s lives with the help of one click</p>
          <Button className="home-signup-btn-2" href="/register">
            Sign up now
          </Button>
        </div>
      </div>
      
      <section className="site-section" >
        <h1 className="value">KIDS FIRST VALUES</h1>
        <div className="features-prev">
          <div className="feature-1">
            <p>
              Help children have more harmony in their upbringing by reducing
              conflicts that arise when divorced parents schedule who has the
              kids.
            </p>
            <img src={value_1} alt=""></img>
          </div>
          <div className="feature-1">
            <p>
              Provide a fair and simple co-parenting solution that has less
              chance for conflict and more time and focus on the children&#39;s
              well-being.
            </p>
            <img src={value_2} alt=""></img>
          </div>
          <div className="feature-1">
            <p>
              Allow parents to grow and improve their parenting by making
              helpful information on child health and Ontario law more
              accessible.
            </p>
            <img src={value_3} alt=""></img>
          </div>
        </div>
      </section>
      <section className="banner-section" id="middle-banner-homepage">
        <div className="right-blurb">
          <h1>KIDS HAPPINESS IS OUR PRIORTY</h1>
          <p>
            KIDS FIRST aspires to help families with simpler custody scheduling
            by providing an interactive shared calendar solution that reduces
            misunderstandings and conflict.
         
          </p>
        </div>
      </section>
      <section className="site-section" id="features-prev">
        <h1 className="value">KIDS FIRST FEATURES</h1>
        <div className="features-prev-1">
          <div className="feature-2">   
            <p>Interactive Calendar</p>
            <img src={feature_1} alt=""></img>
          </div>
          <div className="feature-2">
            <p>Child Info</p>
            <img src={feature_2} alt=""></img> 
          </div>

          <div className="feature-2">
            <p>Law Pop-Ups</p>

            <img src={feature_3} alt=""></img>
          </div>
        </div>
        <span className="more-link">
         {/* eslint-disable-next-line */}
          <a href="#" alt="">
            More Features
          </a>
        </span>
      </section>
      <section className="site-sections">
        <h1>WHY KIDS FIRST</h1>
        <div className="features-3 video">
          <div className="left-blurbs">
            <p>KIDSFIRST Takes A Different Approach To Reduce Conflicts Revolving;</p>
            <br />
            <p>We Understand Who The Users Are, A Diverse Group Of Co-Partners</p>
            <p>With Different Backgrounds And Needs.</p>
            <br />
            <p>Our Solutions Can Accommodate Parents’ Needs With A Simple And</p>
            <p>Particular App Design And A Clever Tool For Peaceful Communication.</p> 
          </div>
          <div className="video-section">
            <img src={video} alt=""></img>
            {/* <img className="img-logo" src={logo} alt="" />			 */}
          </div>
         
        </div>
      </section>
      {/* <footer>
        <a href="#">Terms of use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact us</a>
        <a href="#">About us</a>
        <a href="#">Our team</a>
      </footer> */}
    </>
  );
}
