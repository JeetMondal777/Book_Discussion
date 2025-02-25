import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Nav from "./Components/Nav";

const UploadBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [bookCover, setBookCover] = useState(null);
  const [bookLink, setBookLink] = useState("");
  const [testField, setTestField] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (testField) {
      setBookLink("https://drive.google.com/file/d/1oRBYB5fvPgByGF2cbGzxIQJf1mCxCNlY/view?usp=drivesdk");
      setTitle("The Competitive Programmer's Handbook");
      setAuthor("Antti Laaksonen");
      setDescription("A comprehensive guide designed to introduce readers to the world of competitive programming.");
    }
  }, [testField]);

  const uploadImage = async () => {
    if (!bookCover) return null;

    const formData = new FormData();
    formData.append("file", bookCover);
    formData.append("upload_preset", "Book Discussion");
    formData.append("cloud_name", "dy3noysat");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dy3noysat/image/upload", formData);
      return response.data.url;
    } catch (error) {
      toast.error("Image upload failed. Please try again.", { position: "top-center" });
      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !author || !description || !bookLink || !bookCover) {
      toast.error("All fields are required!", { position: "top-center" });
      return;
    }

    setIsUploading(true);

    const uploadedImageUrl = await uploadImage();
    if (!uploadedImageUrl) {
      setIsUploading(false);
      return;
    }

    try {
      const newBook = {
        coverImage: uploadedImageUrl,
        title,
        author,
        description,
        bookLink,
      };

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/books/upload`, newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        toast.success("Book uploaded successfully!", { position: "top-center" });

        const chatCreateResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/chats/createGroup`,
          { title: newBook.title },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (chatCreateResponse.status === 201) {
          toast.success("Chat created successfully!", { position: "top-center" });
          setBookCover(null);
          setTitle("");
          setAuthor("");
          setDescription("");
          setBookLink("");
          navigate("/dashboard");
        } else {
          toast.error("Failed to create chat!", { position: "top-center" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal server error. Please try again later.", { position: "top-center" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Nav />
      <div className="w-full max-w-3xl backdrop-blur-lg shadow-lg rounded-xl p-8 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-200">Upload a Book</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title */}
          <input
            className="w-full border-2 border-amber-600 px-4 py-3 rounded-lg focus:outline-none  bg-transparent text-amber-200"
            placeholder="Enter Book Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Author */}
          <input
            className="w-full border-2 border-amber-600 px-4 py-3 rounded-lg focus:outline-none  bg-transparent text-amber-200"
            placeholder="Enter Author Name"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          {/* Book Link */}
          <input
            className="w-full border-2 border-amber-600 px-4 py-3 rounded-lg focus:outline-none  bg-transparent text-amber-200"
            placeholder="Enter Book's Link"
            type="text"
            value={bookLink}
            onChange={(e) => setBookLink(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            className="w-full h-32 border-2 border-amber-600 px-4 py-3 rounded-lg focus:outline-none  bg-transparent text-amber-200"
            placeholder="Enter Book Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Book Cover Upload */}
          <p className="font-semibold text-amber-200 ml-1">Choose Book Cover:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBookCover(e.target.files[0])}
            className="w-full border-2 border-amber-600 px-4 py-3 rounded-lg focus:outline-none  bg-transparent text-amber-200"
            required
          />

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-amber-700 text-amber-200 py-3 rounded-lg font-semibold hover:bg-amber-900 transition duration-300 flex items-center justify-center"
          >
            {isUploading ? <span>Uploading...</span> : "Upload Book"}
          </button>

          {/* Test Fields Button */}
          <button
            type="button"
            onClick={() => setTestField(true)}
            className="w-full text-[#5A3E2B] bg-amber-100 border-2 border-[#5A3E2B] py-3 rounded-lg font-semibold hover:bg-[#8B5E3C] hover:text-white transition duration-300"
          >
            Use Test Fields
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadBook;
