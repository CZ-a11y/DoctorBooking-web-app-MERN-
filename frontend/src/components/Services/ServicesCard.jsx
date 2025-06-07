import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServicesCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor, logo: Icon } = item;

  return (
    <div className="group p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      {/* Service Icon */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: bgColor }}>
        {Icon && <Icon className="text-3xl" style={{ color: textColor }} />}
      </div>

      {/* Service Content */}
      <div>
        <h2 className="text-2xl font-bold text-headingColor mb-3">{name}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{desc}</p>
      </div>

      {/* Footer with Link and Index */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-5">
        <Link
          to="/doctors"
          className="flex items-center gap-2 text-sm font-medium text-primaryColor hover:text-primaryColorDark transition-colors"
          aria-label={`Explore ${name}`}
        >
          Learn more
          <BsArrowRight className="text-lg" />
        </Link>
        <span 
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{
            backgroundColor: bgColor,
            color: textColor
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default ServicesCard;