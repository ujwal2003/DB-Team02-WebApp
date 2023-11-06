import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#05204A] text-white font-semibold p-4 py-10">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <p>@Fall 2023, Group 2</p>
          <Link to="/reports" className="text-white">Reports</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
