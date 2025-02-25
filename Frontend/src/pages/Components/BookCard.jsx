import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const BookCard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.search.query);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/books`);
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (book) => {
    navigate("/bookDetails", { state: book });
    localStorage.setItem("selectedBook", JSON.stringify(book));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 w-full">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => handleClick(book)}
            className="relative group h-48 sm:w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18%] max-w-[300px] sm:max-w-[260px] md:max-w-[240px] lg:max-w-[220px] xl:max-w-[270px] 
                      transition-all duration-500 flex bg-white/10 backdrop-blur-lg border border-yellow-300/40 rounded-xl shadow-lg cursor-pointer overflow-hidden"
          >
            {/* Blurry Glow Effect */}
            <div className="absolute inset-0 bg-yellow-300 blur-3xl opacity-15 transition-all duration-500 group-hover:opacity-40"></div>

            <img className="h-full w-1/2 rounded-2xl p-2 z-10" src={book.coverImage} alt="book cover" />
            <div className="flex flex-col overflow-y-auto scrollbar-hide justify-between z-10">
              <div>
                <h3 className="text-yellow-300 p-2 font-bold">{book.title}</h3>
                <p className="px-2 text-sm text-yellow-400 font-medium mb-2">By {book.author}</p>
              </div>
              <p className="px-2 text-sm text-yellow-400 hover:text-yellow-300 transition-all duration-300 font-medium mb-5">
                Click For Open
              </p>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-yellow-300 text-2xl font-bold mt-10">No book found!</h2>
      )}
    </div>
  );
};

export default BookCard;
