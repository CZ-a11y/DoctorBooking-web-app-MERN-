import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCarding from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* About Image Section */}
          <div className="relative w-full lg:w-1/2 max-w-[600px] mx-auto lg:mx-0">
            <img 
              src={aboutImg} 
              alt="Hospital facility" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
            <div className="absolute -right-8 -bottom-8 w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px]">
              <img 
                src={aboutCarding} 
                alt="Award recognition" 
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* About Content Section */}
          <div className="w-full lg:w-1/2 max-w-[650px]">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Proud to be one of the nation's best
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              For 30 years in a row, U.S. News & World Report has recognized us 
              as one of the best public hospitals in the nation and #1 in Texas. 
              Our commitment to excellence in patient care, innovative treatments, 
              and community service sets us apart in the healthcare industry.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dolore 
              adipisci cum accusantium, beatae explicabo minus alias culpa molestias 
              facilis eaque corrupti molestiae numquam modi.
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-primaryColor hover:bg-primaryColorDark text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;