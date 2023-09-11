import React from "react";
import "./Contact.css";

function Contact() {
  return (
    // render contact component
    <div className="container contact">
      <h1>Save time, save money!</h1>
      <p>Sign up and we'll send the best deals to you</p>
      <div className="contact-submit">
        <input type="text" placeholder="Your Email" />
        <button type="button">Subcribe</button>
      </div>
    </div>
  );
}

export default Contact;
