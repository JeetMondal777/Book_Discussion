import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast
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
  console.log(token);

  useEffect(() => {
    if (testField) {
      setBookLink("https://drive.google.com/file/d/1oRBYB5fvPgByGF2cbGzxIQJf1mCxCNlY/view?usp=drivesdk");
      setTitle("The Competitive Programmer's Handbook");
      setAuthor("Antti Laaksonen");
      setDescription("The Competitive Programmer's Handbook by Antti Laaksonen is a comprehensive guide designed to introduce readers to the world of competitive programming.");
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

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/books/upload`,
        newBook,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success("Book uploaded successfully!", { position: "top-center" });

        const chatCreateResponse = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/chats/createGroup`,
          { title: newBook.title },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#A9B8D9] p-4 overflow-auto">
      <Nav />

      <form onSubmit={submitHandler} className="w-full max-w-4xl mt-20 md:mt-24 lg:mt-28">
        {/* Title Input */}
        <input
          className="w-full placeholder:text-left border-black placeholder:font-semibold focus:outline-none border-2 mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700"
          placeholder="Enter Book Title"
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Author Input */}
        <input
          className="w-full placeholder:text-left border-black placeholder:font-semibold focus:outline-none border-2 mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700"
          placeholder="Enter Book's Author Name"
          type="text"
          name="author"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* Book Link Input */}
        <input
          className="w-full placeholder:text-left border-black placeholder:font-semibold focus:outline-none border-2 mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700"
          placeholder="Enter Book's Link"
          type="text"
          name="bookLink"
          required
          value={bookLink}
          onChange={(e) => setBookLink(e.target.value)}
        />

        {/* Description Textarea */}
        <textarea
          className="w-full h-32 border-black focus:outline-none border-2 mb-4 px-4 pt-4 rounded-xl bg-transparent placeholder:text-left placeholder:text-zinc-700 placeholder:font-semibold"
          placeholder="Enter Book Description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Book Cover Upload */}
        <p className="text-lg font-semibold mb-2 ml-1">Choose Your Book Cover Image</p>
        <input
          className="w-full placeholder:text-left border-black placeholder:font-semibold focus:outline-none border-2 mb-4 px-4 py-3 rounded-xl bg-transparent placeholder-zinc-700"
          type="file"
          accept="image/*"
          name="coverImage"
          required
          onChange={(e) => setBookCover(e.target.files[0])}
        />

        {/* Upload Button */}
        <button
          onClick={() => {
            if (title === "" || author === "" || description === "" || bookLink === "" || bookCover === null) {
              toast.error("All fields are required!", { position: "top-center" });
              return;
            }
            setIsUploading(true);
          }}
          type="submit"
          className="w-full flex items-center justify-center text-white font-bold hover:border-black focus:outline-none py-3 rounded-xl bg-[#112332] hover:bg-white hover:text-[#112332] transition-all duration-300 hover:border-2"
        >
          {isUploading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Upload"
          )}
        </button>

        {/* Test Fields Button */}
        <p
          onClick={() => setTestField(true)}
          className="w-full text-center bg-white border-2 border-black text-sm text-black py-3 rounded-xl mt-3 font-semibold cursor-pointer hover:bg-[#112332] hover:text-white transition-all duration-300"
        >
          Upload a book with test fields
        </p>
      </form>
    </div>
  );
};

export default UploadBook;