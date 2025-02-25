import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const ReviewCard = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  
  const book = JSON.parse(localStorage.getItem("selectedBook"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/reviews/getReview/${book._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setReviews(response.data.data);
          setFilteredReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // ⭐ Handle Rating Filter
const handleRatingFilter = (rating) => {
  if (rating === selectedRating) {
    // Reset filter when clicking on the selected rating again
    setSelectedRating(null);
    setFilteredReviews(reviews); // ✅ Show all reviews again
  } else if (rating === null) {
    // ✅ Clear filter and restore all reviews
    setSelectedRating(null);
    setFilteredReviews(reviews);
  } else {
    setSelectedRating(rating);
    const filtered = reviews.filter((review) => review.rating === rating);
    setFilteredReviews(filtered);
  }
};


  return (
    <div className="w-full p-5">
      {/* 🔍 Filter Section */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`p-2 rounded-lg transition-all duration-300 border text-[#ffebc8] ${
              selectedRating === star
                ? "bg-[#f4c77e] text-[#3b290c] border-[#e4a858]"
                : "bg-[#5a3e13]/50 hover:bg-[#f4c77e]/40 border-[#f4c77e]/60"
            }`}
            onClick={() => handleRatingFilter(star)}
          >
            {star} ⭐
          </button>
        ))}
        {selectedRating !== null && (
          <button
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
            onClick={() => handleRatingFilter(null)}
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* 📌 Reviews Display */}
      <div className="flex flex-wrap justify-center gap-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div
              key={review._id}
              className="w-full max-w-lg bg-[#3b290c]/40 backdrop-blur-lg shadow-lg rounded-xl p-5 border border-[#f4c77e]/60 transition-all hover:shadow-2xl hover:bg-[#7d531b]/40"
            >
              {/* Reviewer Details */}
              <div className="flex items-center gap-4">
                <img
                  src={review.sender?.coverImage || "/default-avatar.png"}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border border-[#f4c77e]/50"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#ffebc8]">
                    {review.sender?.fullname?.firstname || "Anonymous"}{" "}
                    {review.sender?.fullname?.lastname || ""}
                  </h3>
                  <p className="text-sm text-[#f4c77e]/70">{review.sender?.email}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= review.rating ? "text-[#f4c77e] fill-[#f4c77e]" : "text-[#d1a669]"
                    }`}
                  />
                ))}
              </div>

              {/* Review Content */}
              <p className="mt-3 text-[#ffebc8]">{review.content}</p>

              {/* Book Details */}
              <div className="mt-4 flex gap-4 items-center border-t border-[#f4c77e]/50 pt-4">
                <img
                  src={book.coverImage}
                  alt="Book Cover"
                  className="w-16 h-20 rounded-lg object-cover border border-[#f4c77e]/40"
                />
                <div>
                  <h4 className="text-lg font-medium text-[#ffebc8]">{book.title}</h4>
                  <p className="text-sm text-[#f4c77e]/70">By {book.author}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-[#ffebc8] text-2xl font-bold mt-10">No reviews found!</h2>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
