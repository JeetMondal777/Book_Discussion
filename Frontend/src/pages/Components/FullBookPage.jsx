import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const FullBookPage = () => {
  const location = useLocation();
  const data = location.state; // Retrieve the passed book data

  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate("/dashboard")
  }

  if (!data) return <h2 className="text-white bg-[#A9B8D9] text-center mt-10">Book not found!</h2>;

  return (
    <div className=" relative p-10 bg-[#A9B8D9] h-full w-full flex flex-col justify-center items-center">
      <Nav/>
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

      
      <h1 className="text-white text-4xl font-semibold mt-4">Description</h1>
      <p className="text-white text-lg mt-4">{data.description}</p>
      </div>
      <i
      onClick={()=>navigate("/dashboard")}
      className="ri-close-circle-fill absolute top-6 right-6 text-4xl transition-all duration-300 cursor-pointer hover:text-white text-[#112332]"></i>
    </div>
    
  );
};

export default FullBookPage;
