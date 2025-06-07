import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const FeedbackForm = ({ reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  // Ensure reviews is always an array
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const handleSubmitReview = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText.trim()) {
        setLoading(false);
        toast.error('Rating & Review Fields are required');
        return;
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating, reviewText })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      setLoading(false);
      toast.success(result.message);
      // Reset form after successful submission
      setRating(0);
      setReviewText("");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div>
      {/* Reviews List */}
      <div className="mb-8">
        <h3 className="text-headingColor text-[18px] leading-6 font-semibold mb-4">
          Patient Reviews
        </h3>

        {safeReviews.length > 0 ? (
          <div className="space-y-4">
            {safeReviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar
                      key={i}
                      className={i < review.rating ? "text-yellowColor" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.reviewText}</p>
                <p className="text-sm text-gray-500 mt-2">
                  - {review.user?.name || 'Anonymous'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Feedback Form */}
      <form>
        <div>
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
            How would you rate the overall experience?*
          </h3>

          <div className="flex">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  key={starValue}
                  type="button"
                  className={`${starValue <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                    } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <AiFillStar />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-[30px]">
          <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4">
            Share your feedback or suggestions*
          </h3>

          <textarea
            className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
            rows={5}
            placeholder="Write your message"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          ></textarea>

          <button
            type="submit"
            onClick={handleSubmitReview}
            disabled={loading}
            className="bg-primaryColor py-3 px-6 rounded-[50px] text-white font-semibold mt-4 hover:bg-primaryColorDark transition"
          >
            {loading ? (
              <HashLoader size={20} color="#fff" />
            ) : (
              'Submit Feedback'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;