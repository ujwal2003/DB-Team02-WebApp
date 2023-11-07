import HeroImage from "../assets/HeroImage.png"
import { Link } from "react-router-dom"

function Home() {
  return (
    <main className="relative h-screen bg-cover" style={{backgroundImage: `url(${HeroImage})`}}>

      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="container mx-auto text-center relative flex items-center justify-center h-full">
        <div className="bg-white py-14 px-40 bg-opacity-70">
        <h1 className="text-7xl font-bold text-[#05204A] mb-4">Title</h1>
        <p className="text-xl text-[#05204A] mb-8">Description</p>
        
        <Link to='/Locations' className="bg-[#537D8D] px-4 py-2 text-white">Order Now</Link>
        
        <p className="text-gray-400 mt-4">Free Delivery for Members!</p>
        </div>
      </div>

    </main>
  )
}

export default Home