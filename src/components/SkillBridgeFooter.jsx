import React from "react";
import { Mail, Phone, MapPin, Briefcase, Users, Star, Shield } from "lucide-react";
import "../styles/skillbridgefooter.css";


export default function SkillBridgeFooter() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">SkillBridge</h2>

          <p className="footer-description">
            SkillBridge connects people who need help with skilled workers nearby.
            Post jobs, apply for work, and build trust using ratings and reviews.
          </p>

          <div className="footer-buttons">
            <button className="footer-btn primary">Post Job</button>
            <button className="footer-btn secondary">Find Work</button>
          </div>
        </div>


        {/* Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>My Services</li>
            <li>Post Service</li>
            <li>Profile</li>
          </ul>
        </div>


        {/* Features */}
        <div className="footer-section">
          <h3>Features</h3>

          <ul>
            <li><Briefcase size={16}/> Nearby Jobs</li>
            <li><Users size={16}/> Skilled Workers</li>
            <li><Star size={16}/> Ratings & Reviews</li>
            <li><Shield size={16}/> Secure Platform</li>
          </ul>
        </div>


        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <ul>
            <li><Mail size={16}/> support@skillbridge.com</li>
            <li><Phone size={16}/> +91 9876543210</li>
            <li><MapPin size={16}/> India</li>
          </ul>

          <button className="contact-btn">
            Contact Support
          </button>

        </div>

      </div>


      <div className="footer-bottom">
        © {new Date().getFullYear()} SkillBridge. All Rights Reserved.
      </div>

    </footer>
  );
}