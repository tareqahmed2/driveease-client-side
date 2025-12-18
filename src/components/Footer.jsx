import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../assets/driveease.jpeg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src={logo}
            alt="DriveEase Logo"
            onClick={() => navigate("/")}
            className="mx-auto w-16 h-16 rounded-full cursor-pointer shadow-md ring ring-primary ring-offset-base-200 ring-offset-2"
          />
          <h2 className="text-2xl font-bold mt-3">DriveEase</h2>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Copyright */}
        <p className="text-sm opacity-80 mb-6">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">DriveEase</span>. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a
            href="#"
            aria-label="Facebook"
            className="btn btn-circle btn-outline btn-primary hover:scale-110 transition-transform"
          >
            <FaFacebookF />
          </a>

          <a
            href="#"
            aria-label="Twitter"
            className="btn btn-circle btn-outline btn-info hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            aria-label="Instagram"
            className="btn btn-circle btn-outline btn-secondary hover:scale-110 transition-transform"
          >
            <FaInstagram />
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="btn btn-circle btn-outline btn-accent hover:scale-110 transition-transform"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
