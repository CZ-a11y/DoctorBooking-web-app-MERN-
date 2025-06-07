import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();

  // Social links with proper attributes
  const socialLinks = [
    {
      path: "https://www.youtube.com",
      icon: <AiFillYoutube size={18} />,
      name: "YouTube"
    },
    {
      path: "https://github.com",
      icon: <AiFillGithub size={18} />,
      name: "GitHub"
    },
    {
      path: "https://instagram.com",
      icon: <AiOutlineInstagram size={18} />,
      name: "Instagram"
    },
    {
      path: "https://www.linkedin.com",
      icon: <AiOutlineLinkedin size={18} />,
      name: "LinkedIn"
    },
  ];

  // Organized footer links
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { path: "/home", display: "Home" },
        { path: "/about", display: "About Us" },
        { path: "/services", display: "Services" },
        { path: "/blog", display: "Blog" },
      ]
    },
    {
      title: "I Want To",
      links: [
        { path: "/find-doctor", display: "Find a Doctor" },
        { path: "/appointment", display: "Request Appointment" },
        { path: "/locations", display: "Find Location" },
        { path: "/second-opinion", display: "Get a Second Opinion" },
      ]
    },
    {
      title: "Support",
      links: [
        { path: "/donate", display: "Donate" },
        { path: "/contact", display: "Contact Us" },
        { path: "/faq", display: "FAQs" },
        { path: "/privacy", display: "Privacy Policy" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <Link to="/">
              <img 
                src={logo} 
                alt="Company Logo" 
                className="h-10 object-contain" 
              />
            </Link>
            <p className="text-gray-600 text-sm">
              Providing exceptional healthcare services with compassion and expertise.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  href={link.path}
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-primaryColor hover:border-primaryColor transition-colors duration-300 group"
                  aria-label={link.name}
                >
                  <span className="text-gray-600 group-hover:text-white">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-primaryColor transition-colors duration-300 text-sm"
                    >
                      {link.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {year} All Rights Reserved. Developed with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;