import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faUsers, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';



function Navbar() {
  return (
    <nav className="flex justify-center items-center flex-wrap bg-gray-900 p-4">
      <Link to="/" className="text-cyan-400 font-serif underline-none mr-auto text-xl">BusInfo</Link>
      <div className="flex justify-center items-center space-x-4">
        <Link to="/company" className="text-white font-sans hover:text-blue-500 underline-none">Company Section</Link>
        <Link to="/driver" className="text-white font-sans hover:text-blue-500 underline-none">Driver Section</Link>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <section className="bg-gray-700 text-white p-10">
      <div className="container mx-auto flex flex-wrap items-center">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif">Bus Fleet Management System</h1>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="max-w-lg h-auto" src="images/bus-picture.png" alt="iphone-mockup" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="bg-gray-700 text-white py-8">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-box text-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-6xl text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 font-serif">Easy to use</h3>
            <p className="text-white mt-2">So easy to use that anyone can handle their data safely and efficiently.</p>
          </div>
          <div className="feature-box text-center">
            <FontAwesomeIcon icon={faUsers} className="text-6xl text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 font-serif">Work as a Team</h3>
            <p className="text-white mt-2">At BusInfo we work as a team try to deliver the best possible features.</p>
          </div>
          <div className="feature-box text-center">
            <FontAwesomeIcon icon={faHeart} className="text-6xl text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 font-serif">User Friendly</h3>
            <p className="text-white mt-2">Our aim is to create a User Friendly website for your comfort, as customers are our first priority.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-gray-700 text-white py-10">
      <div className="container-fluid">
        <h2 className="service-heading font-serif">Get the Right Service for your Business</h2>
        <p className="text-white service" style={{ fontSize: '1.15rem', fontFamily: 'Arial, sans-serif' }}>
          We provide tracking of license expiry date of all the drivers registered with your agency as well we keep track of the permit of the vehicles used by your agency.<br />
          As the world is moving at fast pace and everyone is getting adapted to new technologies it is, Your time to use them and get rid of all the old methods of storing your data.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="bg-gray-500 py-4">
      <button className="btn btn-lg mr-4"><FontAwesomeIcon icon={faTwitter} /></button>
      <button className="btn btn-lg mr-4"><FontAwesomeIcon icon={faFacebook} /></button>
      <button className="btn btn-lg mr-4"><FontAwesomeIcon icon={faInstagram} /></button>
      <button className="btn btn-lg mr-4"><FontAwesomeIcon icon={faYoutube} /></button>
      <p style={{color: '#fff', fontFamily: 'Arial, sans-serif'}}>© Copyright BusInfo</p>
    </footer>
  );
}

export default function HomePage() {
    return (
      <>
        <Navbar />
        <Home />
        <Features />
        <CTA />
        <Footer />
      </>
    );
  }

