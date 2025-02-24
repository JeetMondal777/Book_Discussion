import { useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsReviewPanelOpenFalse } from "../../redux/Slices/isReviewPanelOpenSlice";
import gsap from "gsap";
import { Star } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import toast from "react-hot-toast";

const ReviewPanel = ({ bookId }) => {
  const dispatch = useDispatch();
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  
  const isReviewPanelOpen = useSelector((state) => state.isReviewPanelOpen.isReviewPanelOpen);
  const reviewPanelRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  // State for Rating & Review Text
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button

  useLayoutEffect(() => {
    if (reviewPanelRef.current) {
      const timeline = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.inOut" } });

      const axis = isMobile ? "y" : "x";
      const position = isMobile ? "100%" : "100%";

      if (isReviewPanelOpen) {
        timeline.to(reviewPanelRef.current, { 
          [axis]: "0%",
          opacity: 1
        });
      } else {
        timeline.to(reviewPanelRef.current, { 
          [axis]: position,
          opacity: 0
        });
      }
    }
  }, [isReviewPanelOpen, isMobile]);

  // ⭐ Handle Star Click (User Rating)
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // 🔥 Handle Review Submission
  const handleSubmitReview = async () => {
    if (!reviewText.trim() || rating === 0) {
      toast.error("Please give a rating and enter a review before submitting.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/sendReview`,
        {
          content: reviewText,
          rating,
          bookId: book._id
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}` // JWT token for auth
          }
        }
      );

      if (response.status === 201) {
        toast.success("Review submitted successfully! 🎉");
      }

      // Clear the form after submission
      setRating(0);
      setReviewText("");

      // Close the panel
      dispatch(setIsReviewPanelOpenFalse());
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      ref={reviewPanelRef}
      className={`fixed ${
        isMobile ? "bottom-0 w-full h-auto rounded-t-3xl" : "bottom-0 rounded-l-3xl right-0 w-full sm:w-2/3 lg:w-1/3 min-h-auto"
      } bg-white shadow-2xl backdrop-blur-lg p-5`}
      style={{ 
        transform: isMobile ? "translateY(100%)" : "translateX(100%)",
        opacity: 0
      }}
    >
      <div className="p-6 space-y-6 border-2 border-blue-400 rounded-xl h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Share Your Experience</h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => dispatch(setIsReviewPanelOpenFalse())}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Star Rating Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Your Rating</label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                  star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300 hover:text-amber-300"
                }`} 
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>

        {/* Review Input Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Your Review</label>
          {/* Review Textarea with Different Sizes for Mobile & Laptop */}
          <textarea 
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all resize-none"
            rows={isMobile ? 3 : 6} // Smaller on mobile, larger on laptop
            placeholder="What did you like or dislike about this book?"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          onClick={handleSubmitReview}
          disabled={loading} // Disable when loading
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
        
      </div>
    </div>
  );
};

export default ReviewPanel;
