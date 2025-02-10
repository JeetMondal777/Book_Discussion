import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BookCard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.search.query); // Get search query from Redux

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/books/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClick = (book) => {
    navigate("/bookDetails", { state: book }); // Navigate with book data
  };

  return (
    <div className="flex flex-wrap w-full">
      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <div
            key={book._id}
            onClick={() => handleClick(book)}
            className="h-44 w-[18%] hover:bg-white/25 transition-all duration-300 flex bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg mr-7 mb-4 cursor-pointer"
          >
            <img className="h-full w-1/2 rounded-2xl p-2" src={book.coverImage} alt="book cover" />
            <div className="flex flex-col overflow-y-auto scrollbar-hide justify-between">
              <div>
                <h3 className="text-white p-2 font-bold">{book.title}</h3>
                <p className="px-2 text-sm text-blue-500 font-medium mb-2">By {book.author}</p>
              </div>
              <p className="px-2 text-sm text-blue-500 hover:text-blue-700 transition-all duration-300 font-medium mb-5">Click For Open</p>
            </div>
          </div>
        ))
      ) : (
        <h2 className="text-white text-2xl font-bold mt-10">No book found!</h2> // Display message if no book matches search
      )}
    </div>
  );
};

export default BookCard;
