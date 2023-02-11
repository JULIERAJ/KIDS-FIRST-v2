import { Button, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './Home.css';

import feature_1 from '../../media/homePage/feature_1.png';
import feature_2 from '../../media/homePage/feature_2.png';
import feature_3 from '../../media/homePage/feature_3.png';
// import value_1 from '../../media/homePage/value_1.png';
// import value_2 from '../../media/homePage/value_2.png';
// import value_3 from '../../media/homePage/value_3.png';
import value_4 from '../../media/homePage/value_4.png';
import value_5 from '../../media/homePage/value_5.png';
import value_6 from '../../media/homePage/value_6.png';
import video from '../../media/homePage/video_placeholder.png';
import logo from '../../media/kids_first_logo_beta.png';

export default function Home() {
  return (
    <div className="home">
      <header className="banner-section" id="header-banner">
        <div className="header-nav">
          <div className="site-nav">
            <img src={logo} alt="" />
            <div className="nav-links">
              <li>
                <a href="#features-prev" data-text="Features">
                  Features
                </a>
              </li>
              <li>
                <a href="#" data-text="About us">
                  About us
                </a>
              </li>
              <li>
                <a href="#" data-text="Contact us">
                  Contact us
                </a>
              </li>
            </div>
          </div>
          <div className="profile-nav">
            <Dropdown>
              <Dropdown.Toggle
                className="lang-menu"
                id="langDropdown"
                size="sm"
              >
                EN
              </Dropdown.Toggle>
              <Dropdown.Menu className="lang-menu">
                <Button type="button" className="lang-option">
                  FR
                </Button>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="home-login-btn">
              <NavLink to="/Signin">Log in </NavLink>
            </Button>
            <Button className="home-signup-btn">
              <NavLink to="/Register">Sign up </NavLink>
            </Button>

            {/* <Button classNameName="home-login-btn" href="/Signin">
              Sign in
            </Button>
            <Button classNameName="home-signup-btn" href="/Signup">
              Register
            </Button> */}
          </div>
        </div>
        <div className="left-blurb">
          <h1>A co-parenting app solution</h1>
          <p>that maintain harmony in your kid’s lives with the help of one click</p>
          <Button className="home-signup-btn-2" href="/Register">
            Sign up now
          </Button>
        </div>
      </header>
      <section className="site-section" >
        <h1 className="value">KIDS FIRST VALUES</h1>
        <div className="features-prev">
          <div className="feature-1">
            <p>
              Help children have more harmony in their upbringing by reducing
              conflicts that arise when divorced parents schedule who has the
              kids.
            </p>
            <img src={value_4} alt=""></img>
          </div>
          <div className="feature-1">
            <p>
              Provide a fair and simple co-parenting solution that has less
              chance for conflict and more time and focus on the children&#39;s
              well-being.
            </p>
            <img src={value_5} alt=""></img>
          </div>
          <div className="feature-1">
            <p>
              Allow parents to grow and improve their parenting by making
              helpful information on child health and Ontario law more
              accessible.
            </p>
            <img src={value_6} alt=""></img>
          </div>
        </div>
      </section>
      <section className="banner-section" id="middle-banner">
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
        <h1 className="value">Kids First Features</h1>
        <div className="features-prev">
          <div className="feature-2"> 
          <p>Interactive Calendar</p>
       <img src={feature_1} alt=""></img>
          </div>
          <div className="feature-2">
          <p>Child Information</p>

           <img src={feature_2} alt=""></img> 
          </div>

          <div className="feature-2">
          <p>Law Pop-Ups</p>

           <img src={feature_3} alt=""></img> 
          </div>
		  
        </div>
        <span className="more-link">
          <a href="#" alt="">
            More Features
          </a>
        </span>
      </section>
      <section className="site-section">
        <h1>Why Kids First</h1>
        <div className="feature-3 video">
          <img src={video} alt=""></img>
        </div>
      </section>
      <footer>
        <a href="#">Terms of use</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Contact us</a>
        <a href="#">About us</a>
        <a href="#">Our team</a>
      </footer>
    </div>
  );
}
