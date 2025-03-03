import { Link } from "react-router-dom";
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { UserContext } from "../context/UserContext";

function Header() {
    const { cart } = useContext(OrderContext);
    const { custInfo } = useContext(UserContext);
    
    return (
    <header className="flex items-center justify-between p-4 border-b-2 border-[#644536] md:px-6">
      <div className="flex items-center md:space-x-10">
        <Link to="/home">
          <svg width="35" height="35" viewBox="0 0 43 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M1.60364 15.9566C0.791687 17.722 0.791687 19.7303 0.791687 23.747V36.2915C0.791687 41.8698 0.791687 44.6589 2.52464 46.3919C4.25759 48.1248 7.04673 48.1248 12.625 48.1248H13.1042V33.3333C13.1042 31.1472 14.8764 29.375 17.0625 29.375H25.9375C28.1236 29.375 29.8959 31.1472 29.8959 33.3333V48.1248H30.375C35.9533 48.1248 38.7425 48.1248 40.4754 46.3919C42.2084 44.6589 42.2084 41.8698 42.2084 36.2915V23.747C42.2084 19.7303 42.2084 17.722 41.3964 15.9566C40.5845 14.1912 39.0596 12.8842 36.0099 10.2702L33.0516 7.73448C27.5393 3.00964 24.7831 0.647217 21.5 0.647217C18.2169 0.647217 15.4608 3.00964 9.94847 7.73448L6.99014 10.2702C3.94044 12.8842 2.41558 14.1912 1.60364 15.9566ZM27.8959 48.1248V33.3333C27.8959 32.2518 27.0191 31.375 25.9375 31.375H17.0625C15.981 31.375 15.1042 32.2518 15.1042 33.3333V48.1248H27.8959Z" fill="#644536"/>
          </svg>
        </Link>
        <Link to="/Locations" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          <div className="flex items-center">
            Menu
          </div>
        </Link>
        <Link to="/InterestingReports" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          <div className="flex items-center">
            Reports
          </div>
        </Link>
      </div>

      <div className="flex items-center md:space-x-10">
        <Link to="/ManageAccount" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          <div className="flex items-center">
            ManageAccount
          </div>
        </Link>

        <Link to="/register" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          <div className="flex items-center">
            Register
          </div>
        </Link>

        <Link to="/signin" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          {
            Object.keys(custInfo).length === 0 ? (
              <div className="flex items-center">
                Sign In
              </div>
            ) : (
              <div className="flex items-center">
                <>{custInfo.firstName + ' ' + custInfo.lastName}</> (Sign Out)
              </div>
            )
          }
        </Link>

        <Link to="/order" className="text-[#644536] px-4 py-2 ml-4 font-bold">
          <div className="flex items-center">
            <div className="relative">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6667 11.6667L11.6667 10.2083C11.6667 6.98666 14.2784 4.37499 17.5 4.37499V4.37499C20.7217 4.37499 23.3334 6.98666 23.3334 10.2083L23.3334 11.6667" stroke="#644536" strokeWidth="2" strokeLinecap="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.96079 10.7941C4.375 11.3799 4.375 12.3227 4.375 14.2083V24.0833C4.375 27.8546 4.375 29.7402 5.54657 30.9118C6.71815 32.0833 8.60376 32.0833 12.375 32.0833H22.625C26.3962 32.0833 28.2819 32.0833 29.4534 30.9118C30.625 29.7402 30.625 27.8546 30.625 24.0833V14.2083C30.625 12.3227 30.625 11.3799 30.0392 10.7941C29.4534 10.2083 28.5106 10.2083 26.625 10.2083H8.375C6.48938 10.2083 5.54657 10.2083 4.96079 10.7941ZM14.125 17.5C14.125 16.9477 13.6773 16.5 13.125 16.5C12.5727 16.5 12.125 16.9477 12.125 17.5V20.4167C12.125 20.969 12.5727 21.4167 13.125 21.4167C13.6773 21.4167 14.125 20.969 14.125 20.4167V17.5ZM22.875 17.5C22.875 16.9477 22.4273 16.5 21.875 16.5C21.3227 16.5 20.875 16.9477 20.875 17.5V20.4167C20.875 20.969 21.3227 21.4167 21.875 21.4167C22.4273 21.4167 22.875 20.969 22.875 20.4167V17.5Z" fill="#644536"/>
            </svg>
            {
                cart.length > 0 && <span className=" bg-[#537D8D] px-1 outline outline-white text-white text-xs rounded-full absolute right-0 top-0">{cart.length}</span>
            }
            </div>
            Cart
          </div>

        </Link>
      </div>
    </header>
  );
}

export default Header;
