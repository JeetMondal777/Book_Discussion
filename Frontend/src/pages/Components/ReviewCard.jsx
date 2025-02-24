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
      setSelectedRating(null);
      setFilteredReviews(reviews); // Show all reviews if no rating is selected
    } else {
      setSelectedRating(rating);
      const filtered = reviews.filter((review) => review.rating === rating);
      setFilteredReviews(filtered); // Show only matching reviews, or nothing if empty
    }
  };
  

  return (
    <div className="w-full p-5">
      {/* 🔍 Filter Section */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`p-2 rounded-lg transition-all duration-300 border ${
              selectedRating === star
                ? "bg-amber-400 text-white border-amber-500"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
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
              className="w-full max-w-lg bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition-all hover:shadow-2xl"
            >
              {/* Reviewer Details */}
              <div className="flex items-center gap-4">
                <img
                  src={review.sender?.coverImage || "/default-avatar.png"}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.sender?.fullname?.firstname || "Anonymous"}{" "}
                    {review.sender?.fullname?.lastname || ""}
                  </h3>
                  <p className="text-sm text-gray-500">{review.sender?.email}</p>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Content */}
              <p className="mt-3 text-gray-700">{review.content}</p>

              {/* Book Details */}
              <div className="mt-4 flex gap-4 items-center border-t pt-4">
                <img
                  src={book.coverImage}
                  alt="Book Cover"
                  className="w-16 h-20 rounded-lg object-cover"
                />
                <div>
                  <h4 className="text-lg font-medium">{book.title}</h4>
                  <p className="text-sm text-gray-500">By {book.author}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-gray-700 text-2xl font-bold mt-10">No reviews found!</h2>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
