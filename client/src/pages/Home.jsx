import HeroImage from "../assets/HeroImage.png";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  async function initializeDB(e) {
    try {
      const res = await axios.get('/init');
      const data = await res.data;
      console.log(data);
      window.location.href = '/InterestingReports'
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <main className="relative h-screen bg-cover" style={{ backgroundImage: `url(${HeroImage})` }}>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
      <div className="container mx-auto text-center relative flex items-center justify-center h-full">
        <div className="bg-white py-14 px-40 bg-opacity-70">
          <h1 className="text-7xl font-bold text-[#05204A] mb-4">2 Guys</h1>
          <p className="text-xl text-[#05204A] mb-8">Our restaurant chain is dedicated to a diverse type of food groups!</p>
          <p>(see demo video in our Report!)</p>
          {/* <button onClick={() => window.location.href = '/Locations'} className="bg-[#537D8D] px-4 py-2 text-white rounded">Order Now</button> */}
          <button onClick={initializeDB} className="bg-[#05204A] px-4 py-2 text-white mt-4 rounded">Start DB</button>
          <p className="text-gray-400 mt-4">Free Delivery for Members!</p>
        </div>
      </div>
    </main>
  );
}

export default Home;
