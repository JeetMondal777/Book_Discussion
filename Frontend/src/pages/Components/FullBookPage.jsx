import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import {
  setIsDiscussionPanelOpenFalse,
  setIsDiscussionPanelOpenTrue,
} from "../../redux/Slices/isDiscussionPanelOpenSlice";
import MsgPanel from "../panel/MsgPanel";
import { setIsReviewPanelOpenTrue } from "../../redux/Slices/isReviewPanelOpenSlice";
import ReviewPanel from "../panel/ReviewPanel";

const FullBookPage = () => {
  const location = useLocation();
  const data = location.state; // Retrieve the passed book data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const isDiscussionPanelOpen = useSelector(
    (state) => state.isDiscussionPanelOpen.isDiscussionPanelOpen
  );
  const isReviewPanelOpen = useSelector(
    (state) => state.isReviewPanelOpen.isReviewPanelOpen
  );

  if (!data)
    return (
      <h2 className="text-amber-200 text-center mt-10 p-4 rounded-lg shadow-md">
        Book not found!
      </h2>
    );

  return (
    <div className="relative min-h-screen  flex flex-col items-center p-4">
      
      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 w-full z-50 bg-[#5A3E2B]/90 backdrop-blur-md shadow-md">
        <Nav />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl bg-[#FFF5E1]/90 shadow-xl rounded-xl p-6 sm:p-10 pt-20 sm:pt-16 mt-10 flex flex-col items-center">
        
        {/* Book Content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full gap-8">
          
          {/* Left Section - Book Details */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#8B5E3C]">{data.title}</h1>
            <p className="text-[#8B5E3C] text-xl sm:text-2xl mt-2">By {data.author}</p>

            {/* Book Image Link */}
            <Link to={data.bookLink} className="relative w-full max-w-xs h-auto mt-4 group">
              <img
                className="w-full h-full object-cover rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
                src={data.coverImage}
                alt={data.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <p className="text-amber-50 text-lg font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
                  Click to Read
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section - Description */}
          <div className="w-full lg:w-1/2 lg:max-h-[80vh] lg:overflow-y-auto scrollbar-hide flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-[#7B4E3A] text-3xl sm:text-4xl font-bold">Detailed Overview</h1>
              <button
                onClick={() => dispatch(setIsDiscussionPanelOpenTrue())}
                className="bg-[#D1B892] text-[#2C1E1E] rounded-lg font-bold px-4 py-2 hover:bg-[#E0C7A3] transition-all duration-300"
              >
                Click For Discuss
              </button>
            </div>
            <p className="text-[#5A3E2B] text-lg mt-4 leading-relaxed">{data.description}</p>
            
            <button
              className="py-4 bg-[#D1B892] text-[#2C1E1E] mt-5 rounded-xl font-bold hover:bg-[#E0C7A3] transition-all duration-300"
              onClick={() => dispatch(setIsReviewPanelOpenTrue())}
            >
              Share your valuable feedback!
            </button>

            <button
              onClick={() => navigate("/review")}
              className="w-full mt-5 py-4 rounded-xl bg-gradient-to-r bg-[#D1B892] text-[#2C1E1E] hover:bg-[#E0C7A3] font-bold shadow-lg hover:shadow-xl duration-300 transition-all"
            >
              See all reviews
            </button>
          </div>
        </div>

        {/* Close Button */}
        <i
          onClick={() => navigate("/dashboard")}
          className="ri-close-circle-fill absolute top-5 sm:top-8 right-4 text-3xl sm:text-4xl cursor-pointer text-amber-50 hover:text-[#D1B892] transition-all duration-400"
        ></i>

        {/* Discussion Panel */}
        <div
          className={`fixed absolute z-50 top-0 right-0 w-full sm:w-2/3 lg:w-1/3 min-h-screen   transform ${
            isDiscussionPanelOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <MsgPanel />
        </div>

        {/* Review Panel */}
        <div
          className={`fixed absolute z-50 bottom-0 w-full min-h-screen bg-[#2C1E1E]/95 shadow-xl transform ${
            isReviewPanelOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <ReviewPanel />
        </div>
      </div>
    </div>
  );
};

export default FullBookPage;
