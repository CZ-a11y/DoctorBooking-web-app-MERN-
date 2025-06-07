import React from "react";
import heroImg01 from "../assets/images/hero-Img01.png";
import heroImg02 from "../assets/images/hero-Img02.png";
import heroImg03 from "../assets/images/hero-Img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import About from "../components/About/About";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import featureImg from "../assets/images/feature-img.png";
import ServicesList from "../components/Services/ServicesList";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import DoctorList from "../components/Doctor/DoctorList";
import faqImg from "../assets/images/faq-img.png";
import Faqlist from "../components/Faq/Faqlist";
import Testimonial from "../components/Testimonial/Testimonial";
import { motion } from "framer-motion";
// ... your other imports remain the same ...

const Home = () => {
  // ===== Animation Variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <>
      {/* ===== Hero Section (Original structure preserved) ===== */}
      <motion.section 
        className="hero__section pt-16 pb-24 xl:pt-24 xl:pb-32 2xl:h-[800px] bg-gradient-to-br from-blue-50/80 to-white/90 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center justify-between">
            {/* Hero Content */}
            <motion.div 
              className="lg:w-[580px] xl:w-[620px]"
              variants={containerVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-[58px] leading-tight font-extrabold text-gray-900 mb-6"
                variants={itemVariants}
              >
                <motion.span 
                  className="text-primaryColor"
                  whileHover={{ scale: 1.02 }}
                >
                  Together
                </motion.span> we can help each other live healthier lives.
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
                variants={itemVariants}
              >
                Our compassionate healthcare team provides personalized, evidence-based care 
                to help you achieve your best health. Experience medicine that puts you first.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.button 
                  className="btn-primary px-8 py-3.5 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  whileTap={{ scale: 0.98 }}
                >
                  Request an Appointment
                </motion.button>
                <motion.button 
                  className="btn-outline px-8 py-3.5 rounded-full text-lg font-semibold border-2 border-primaryColor text-primaryColor hover:bg-primaryColor/10 transition-colors duration-300"
                  whileHover={{ 
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                    borderColor: "rgba(59, 130, 246, 0.8)"
                  }}
                >
                  Meet Our Doctors
                </motion.button>
              </motion.div>

              {/* Stats Counter */}
              <motion.div 
                className="mt-12 lg:mt-16 grid grid-cols-3 gap-6 max-w-md"
                variants={itemVariants}
              >
                {[
                  { value: "30+", color: "bg-yellowColor", text: "Years Experience" },
                  { value: "15+", color: "bg-purpleColor", text: "Clinics Nationwide" },
                  { value: "100%", color: "bg-irisBlueColor", text: "Patient Focused" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-4xl lg:text-5xl font-bold text-gray-900 block">{stat.value}</span>
                    <div className={`w-20 h-1.5 ${stat.color} rounded-full mx-auto mb-2`}></div>
                    <p className="text-gray-600 font-medium text-sm md:text-base">{stat.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Images */}
            <motion.div 
              className="flex gap-[30px] justify-end"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <motion.img 
                  className="w-full rounded-lg shadow-xl" 
                  src={heroImg01} 
                  alt="Doctor consulting with patient"
                  whileHover={{ scale: 1.02 }}
                />
              </motion.div>
              <motion.div className="mt-[30px]" variants={itemVariants}>
                <motion.img 
                  src={heroImg02} 
                  alt="Medical team discussion" 
                  className="w-full mb-[30px] rounded-lg shadow-xl"
                  whileHover={{ scale: 1.02 }}
                />
                <motion.img 
                  src={heroImg03} 
                  alt="Modern hospital facility" 
                  className="w-full mb-[30px] rounded-lg shadow-xl"
                  whileHover={{ scale: 1.02 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== Services Section (Original structure preserved) ===== */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeIn}
      >
        <div className="container">
          <motion.div 
            className="max-w-2xl mx-auto mb-14 lg:mb-20"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-primaryDark leading-tight">
              Our aim is to facilitate things for our users
            </h2>
            <p className="mt-6 text-xl text-center text-gray-600">
         This are the methods in which we plan to better things all round
            </p>
          </motion.div>

          {/*  Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
            variants={containerVariants}
          >
            {/*  Card 1 */}
            <motion.div 
              className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-10">
                <motion.img 
                  src={icon01} 
                  alt="Doctor icon" 
                  className="h-28 w-28 object-contain"
                  whileHover={{ rotate: 5 }}
                />
              </div>
              <h3 className="text-3xl font-bold text-center text-primaryDark mb-6">
                Find a Specialist
              </h3>
              <p className="text-lg text-gray-600 text-center mb-8">
                Connect with our network of board-certified physicians and specialists.
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    to="/doctors"
                    className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center group hover:bg-irisBlueColor hover:border-irisBlueColor transition-all duration-300"
                    aria-label="Find a doctor"
                  >
                    <BsArrowRight className="text-gray-500 group-hover:text-white text-2xl" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/*  Card 2 */}
            <motion.div 
              className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-10">
                <motion.img 
                  src={icon02} 
                  alt="Location icon" 
                  className="h-28 w-28 object-contain"
                  whileHover={{ rotate: 5 }}
                />
              </div>
              <h3 className="text-3xl font-bold text-center text-primaryDark mb-6">
                Our Locations
              </h3>
              <p className="text-lg text-gray-600 text-center mb-8">
                State-of-the-art facilities conveniently located near you.
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    to="/locations"
                    className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center group hover:bg-purpleColor hover:border-purpleColor transition-all duration-300"
                    aria-label="View locations"
                  >
                    <BsArrowRight className="text-gray-500 group-hover:text-white text-2xl" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/*  Card 3 */}
            <motion.div 
              className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-center mb-10">
                <motion.img 
                  src={icon03} 
                  alt="Appointment icon" 
                  className="h-28 w-28 object-contain"
                  whileHover={{ rotate: 5 }}
                />
              </div>
              <h3 className="text-3xl font-bold text-center text-primaryDark mb-6">
                Easy Booking
              </h3>
              <p className="text-lg text-gray-600 text-center mb-8">
                Schedule appointments with our 24/7 online system.
              </p>
              <div className="flex justify-center">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link
                    to="/appointments"
                    className="w-14 h-14 rounded-full border-2 border-gray-200 flex items-center justify-center group hover:bg-yellowColor hover:border-yellowColor transition-all duration-300"
                    aria-label="Book appointment"
                  >
                    <BsArrowRight className="text-gray-500 group-hover:text-white text-2xl" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
  {/* =======services section========= */}
    
     <motion.section 
      
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container ">
          <motion.div 
            className="xl:w-[-460px] mx:auto"
            variants={itemVariants}
          >
           
            <ServicesList />
          </motion.div>
        </div>
      </motion.section>
      {/*========services end==========*/}
      {/* ===== Feature Section  ===== */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Feature Content */}
            <motion.div 
              className="lg:w-1/2 xl:w-[670px]"
              variants={itemVariants}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Get Virtual Treatment <br className="hidden md:block" /> Anytime, Anywhere
              </h2>
              
              <ul className="space-y-4 pl-2 mb-8">
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-primaryColor font-bold mr-3">1.</span>
                  <p className="text-lg text-gray-600">
                    Schedule appointments directly through our easy-to-use platform
                  </p>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-primaryColor font-bold mr-3">2.</span>
                  <p className="text-lg text-gray-600">
                    Search for specialists and contact their offices instantly
                  </p>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-primaryColor font-bold mr-3">3.</span>
                  <p className="text-lg text-gray-600">
                    View available physicians and select your preferred time with our online scheduler
                  </p>
                </motion.li>
              </ul>

              <motion.div whileHover={{ scale: 1.02 }}>
                <Link 
                  to="/virtual-care" 
                  className="inline-block bg-primaryColor hover:bg-primaryColorDark text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                  aria-label="Learn more about virtual treatments"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Feature Image */}
            <motion.div 
              className="relative lg:w-1/2 xl:w-[770px] flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <motion.img 
                src={featureImg} 
                alt="Doctor providing virtual consultation" 
                className="w-full max-w-[600px] rounded-lg shadow-xl"
                whileHover={{ scale: 1.01 }}
              />
              
              {/* Appointment Card */}
              <motion.div 
                className="absolute -bottom-8 left-4 md:bottom-10 md:left-8 w-[180px] md:w-[240px] bg-white p-4 rounded-xl shadow-lg z-20"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm md:text-base font-semibold text-gray-800">Mon, June 20</p>
                    <p className="text-xs md:text-sm text-gray-500">12:00 PM</p>
                  </div>
                  <div className="bg-yellowColor p-2 rounded-full">
                    <img 
                      src={videoIcon} 
                      alt="Video call icon" 
                      className="w-4 h-4 md:w-5 md:h-5" 
                    />
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-600 text-xs md:text-sm font-medium py-1 px-3 rounded-full inline-block mb-3">
                  Consultation
                </div>

                <div className="flex items-center gap-3">
                  <img 
                    src={avatarIcon} 
                    alt="Dr. Wayne Collins" 
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full" 
                  />
                  <h4 className="text-sm md:text-base font-bold text-gray-800">
                    Dr. Wayne Collins
                  </h4>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== Doctors Section (Original structure preserved) ===== */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto mb-12 lg:mb-16 text-center"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Exceptional Doctors
            </h2>
            <p className="text-xl text-gray-600">
              World-class care for everyone. Our health system offers unmatched expertise with compassionate healthcare professionals.
            </p>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 lg:p-8"
            variants={containerVariants}
          >
            <DoctorList />
          </motion.div>

          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <Link
              to="/doctors"
              className="inline-block bg-primaryColor hover:bg-primaryColorDark text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
              aria-label="View all doctors"
            >
              View All Specialists
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== FAQ Section (Original structure preserved) ===== */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            <motion.div 
              className="hidden md:block md:w-1/2 lg:w-[45%]"
              variants={itemVariants}
            >
              <motion.img 
                src={faqImg} 
                alt="Patient asking questions to doctor" 
                className="w-[70%] h-auto rounded-lg shadow-xl"
                whileHover={{ scale: 1.02 }}
              />
            </motion.div>

            <motion.div 
              className="w-full md:w-1/2 lg:w-[55%]"
              variants={containerVariants}
            >
              <motion.div className="mb-10" variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Answers to Common Patient Questions
                </h2>
                <p className="text-lg text-gray-600">
                  We've compiled answers to the most frequently asked questions by our patients.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-sm p-6 lg:p-8"
                variants={containerVariants}
              >
                <Faqlist />
              </motion.div>

              <motion.div 
                className="mt-8 text-center md:text-left"
                variants={itemVariants}
              >
                <p className="text-gray-600 mb-4">
                  Still have questions? We're here to help.
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-primaryColor hover:bg-primaryColorDark text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-md hover:shadow-lg"
                  aria-label="Contact us for more questions"
                >
                  Contact Our Team
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== Testimonial Section (Original structure preserved) ===== */}
      <motion.section 
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-2xl mx-auto mb-12 text-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Patient Testimonials
            </h2>
            <p className="text-lg text-gray-600">
              Hear from those who've experienced our exceptional care firsthand
            </p>
          </motion.div>

          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
          >
            <Testimonial />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Home;