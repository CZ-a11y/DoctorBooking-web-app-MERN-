import { useState } from "react";
import { formateDate } from "../../utils/formateDate";
import { AiFillStar } from "react-icons/ai";
import avatar from "../../assets/images/avatar-icon.png";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({ reviews = [], totalRating = 0 }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img
                  src={review?.user?.photo || avatar}
                  className="w-full"
                  alt={review?.user?.name || 'User'}
                />
              </figure>

              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review?.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {review?.createdAt ? formateDate(review.createdAt) : 'Date not available'}
                </p>
                <p className="text__para mt-3 font-medium text-[15px]">
                  {review?.reviewText || 'No review text provided'}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {[...Array(Math.min(5, Math.max(0, review?.rating || 0)))].map((_, starIndex) => (
                <AiFillStar key={starIndex} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
          <p className="text-textColor">No reviews yet.</p>
        )}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="bg-primaryColor py-[15px] px-[35px] rounded-[50px] text-white font-semibold mt-[38px] hover:bg-primaryColorDark transition"
            onClick={() => setShowFeedbackForm(true)}
          >
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;