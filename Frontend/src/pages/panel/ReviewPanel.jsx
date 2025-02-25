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

  // ⭐ Rating & Review State
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (reviewPanelRef.current) {
      gsap.to(reviewPanelRef.current, {
        y: isReviewPanelOpen ? "0%" : "100%",
        opacity: isReviewPanelOpen ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isReviewPanelOpen]);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = async () => {
    if (!reviewText.trim() || rating === 0) {
      toast.error("Please provide a rating and review before submitting.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/sendReview`,
        { content: reviewText, rating, bookId: book._id },
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.status === 201) {
        toast.success("Review submitted successfully! 🎉");
        setRating(0);
        setReviewText("");
        dispatch(setIsReviewPanelOpenFalse());
      }
    } catch (error) {
      toast.error(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={reviewPanelRef}
      className={`fixed bottom-0 right-0 w-full sm:w-2/3 lg:w-1/3 min-h-auto p-5 rounded-t-3xl bg-gradient-to-br from-[#3b290c] via-[#5a3e13] to-[#7d531b] shadow-2xl transition-all backdrop-blur-lg`}
    >
      <div className="p-6 space-y-6 border-2 border-[#f4c77e] rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#ffebc8]">Share Your Experience</h2>
          <button className="p-2 transition-all duration-300 cursor-pointer rounded-full hover:bg-[#6a4714]/50" onClick={() => dispatch(setIsReviewPanelOpenFalse())}>
            <i className="ri-close-line text-2xl text-[#ffebc8]"></i>
          </button>
        </div>

        {/* Star Rating */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#ffebc8]">Your Rating</label>
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                  star <= rating ? "text-[#f4c77e] fill-[#f4c77e]" : "text-[#d1a669] hover:text-[#f4c77e]"
                }`} 
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
        </div>

        {/* Review Input */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-[#ffebc8]">Your Review</label>
          <textarea 
            className="w-full p-4 border-2 border-[#f4c77e] bg-[#5a3e13]/50 text-[#ffebc8] rounded-xl focus:ring-2 focus:ring-[#f4c77e] placeholder-[#ffebc8]/50 transition-all resize-none"
            rows={isMobile ? 3 : 6}
            placeholder="What did you like or dislike about this book?"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button 
          className="w-full py-4 cursor-pointer rounded-xl bg-gradient-to-r from-[#f4c77e] to-[#e4a858] hover:from-[#e4a858] hover:to-[#c89150] text-[#3b290c] font-bold shadow-lg hover:shadow-xl transition-all"
          onClick={handleSubmitReview}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewPanel;
