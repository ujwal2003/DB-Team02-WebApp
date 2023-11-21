import { Link } from "react-router-dom";

function Membership(){
    return(
    <main className="relative h-screen bg-[#644536]">
  
        <div className="container mx-auto text-center relative flex items-center justify-center h-full">
          <div className="bg-[#9DC087] py-24 px-72">
          <h1 className="text-5xl font-bold text-[#05204A] mb-4">Interested in Membership?</h1>
          <div className="underline text-xl text-[#05204A] mb-0">Membership Benefits:</div>
          <div className=" text-xl text-[#05204A] mb-8">Free Delivery on Orders</div>
          
          <Link to="/ManageAccount" className="bg-[#644536] px-4 py-2 font-bold text-[#E7E6DA]">Become a Member</Link>
          </div>
        </div>
  
    </main>
    );
}
export default Membership;