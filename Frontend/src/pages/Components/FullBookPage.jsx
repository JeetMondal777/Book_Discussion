import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { 
  setIsDiscussionPanelOpenFalse, 
  setIsDiscussionPanelOpenTrue 
} from "../../redux/Slices/isDiscussionPanelOpenSlice";
import MsgPanel from "../panel/MsgPanel";

const FullBookPage = () => {
  const location = useLocation();
  const data = location.state; // Retrieve the passed book data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Correct Redux state access
  const isDiscussionPanelOpen = useSelector(
    (state) => state.isDiscussionPanelOpen.isDiscussionPanelOpen
  );

  const handleClick = () => {
    navigate("/dashboard");
  };

  if (!data)
    return (
      <h2 className="text-white bg-[#A9B8D9] text-center mt-10">
        Book not found!
      </h2>
    );

  return (
    <div className="relative p-10 bg-[#A9B8D9] h-full w-full flex flex-col justify-center items-start">
      <Nav />
      <div className="w-1/2 mt-15 h-full flex flex-col justify-between">
        <h1 className="text-6xl font-bold text-white">{data.title}</h1>
        <p className="text-white text-4xl mt-4">By {data.author}</p>

        <Link to={data.bookLink} className="relative w-2/3 h-3/4 mt-4 group">
          {/* Cover Image */}
          <img
            className="w-full h-full object-cover transition-all duration-300"
            src={data.coverImage}
            alt={data.title}
          />

          {/* Hover Overlay Effect */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
              Click to Read
            </p>
          </div>
        </Link>
      </div>

      <div>
        <div className="flex justify-between">
          <h1 className="text-white text-4xl font-semibold mt-4">Description</h1>
          <button
            onClick={() => dispatch(setIsDiscussionPanelOpenTrue())}
            className="mt-auto bg-white rounded-lg font-bold px-3 py-2"
            book={data}
          >
            Click For Discuss
          </button>
        </div>
        <p className="text-white text-lg mt-4">{data.description}</p>
      </div>

      {/* Close Button */}
      <i
        onClick={() => navigate("/dashboard")}
        className="ri-close-circle-fill absolute top-6 right-6 text-4xl transition-all duration-300 cursor-pointer hover:text-white text-[#112332]"
      ></i>

      {/* Animated Discussion Panel */}
      <div
        className={`fixed top-0 right-0 w-1/3 h-full shadow-lg transform ${
          isDiscussionPanelOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <MsgPanel />
        <button
          onClick={() => dispatch(setIsDiscussionPanelOpenFalse())}
          className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FullBookPage;
