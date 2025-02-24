import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { setIsDiscussionPanelOpenFalse, setIsDiscussionPanelOpenTrue } from "../../redux/Slices/isDiscussionPanelOpenSlice";
import MsgPanel from "../panel/MsgPanel";
import { setIsReviewPanelOpenTrue } from "../../redux/Slices/isReviewPanelOpenSlice";
import ReviewPanel from "../panel/reviewPanel";

const FullBookPage = () => {
  const location = useLocation();
  const data = location.state; // Retrieve the passed book data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Correct Redux state access
  const isDiscussionPanelOpen = useSelector(
    (state) => state.isDiscussionPanelOpen.isDiscussionPanelOpen
  );
  const isReviewPanelOpen = useSelector((state) => state.isReviewPanelOpen.isReviewPanelOpen);


  if (!data)
    return (
      <h2 className="text-white bg-[#A9B8D9] text-center mt-10">
        Book not found!
      </h2>
    );

  return (
    <div className="relative min-h-screen bg-[#A9B8D9] flex flex-col items-center">
      
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#A9B8D9] shadow-md">
        <Nav />
      </div>

      {/* Main Content (with padding to avoid overlap) */}
      <div className="w-full p-6 sm:p-10 pt-20 sm:pt-15 flex flex-col items-center">
        
        {/* Book Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full lg:w-3/4 mt-10 gap-6">
          
          {/* Left Section - Book Details */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">{data.title}</h1>
            <p className="text-white text-xl sm:text-2xl mt-3">By {data.author}</p>

            {/* Book Image Link */}
            <Link to={data.bookLink} className="relative w-full max-w-xs h-auto mt-4 group">
              <img
                className="w-full h-full object-cover rounded-lg transition-all duration-300"
                src={data.coverImage}
                alt={data.title}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Click to Read
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section - Description */}

          <div className="w-full lg:w-1/2 lg:max-h-[80vh] lg:overflow-y-auto scrollbar-hide justify-center flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-3xl sm:text-4xl font-bold">Detailed Overview</h1>
              <button
                onClick={() => dispatch(setIsDiscussionPanelOpenTrue())}
                className="bg-white rounded-lg font-bold px-4 py-2 text-[#A9B8D9] hover:bg-gray-200 duration-300 transition-all"
              >
                Click For Discuss
              </button>
            </div>
            <p className="text-white text-lg mt-4 leading-relaxed">{data.description}</p>
            <button
              className="py-4 bg-white text-[#A9B8D9] mt-5 rounded-xl font-bold hover:bg-gray-200 hover:border-white transition-all duration-300 "
              onClick={() => dispatch(setIsReviewPanelOpenTrue())}
            >
              Share your valuable feedback!
            </button>
            <button
            onClick={() => navigate("/review")} 
          className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r bg-blue-500 to-blue-600 hover:bg-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl duration-300 transition-all"
            
        >
          See All Reviews
        </button>
          </div>

        </div>

        {/* Close Button */}
        <i
          onClick={() => navigate("/dashboard")}
          className="ri-close-circle-fill absolute top-25 sm:top-8 right-4 text-3xl sm:text-4xl transition-all duration-300 cursor-pointer hover:text-white text-[#112332]"
        ></i>

        {/* Animated Discussion Panel */}
        <div
          className={`fixed absolute z-9999 top-0 right-0 w-full sm:w-2/3 lg:w-1/3 min-h-screen shadow-lg transform ${
            isDiscussionPanelOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <MsgPanel />
          
          
        </div>
        <div
          className={`fixed absolute z-9999 bottom-0  w-full  min-h-screen shadow-lg transform ${
            isReviewPanelOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform transition-all duration-300 ease-in-out`}
        >
         <ReviewPanel />
          
          
        </div>
      </div>
    </div>
  );
};

export default FullBookPage;

