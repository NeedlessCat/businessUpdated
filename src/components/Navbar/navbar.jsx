import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // navigate
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };
  // navList Data
  const navList = (
    <ul className="flex space-x-7 text-white font-medium text-md px-5 ">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      {/* All Product */}
      <li>
        <Link to={"/catalog"}>Catalog</Link>
      </li>

      {/* Signup */}
      <li>
        <Link to={"/about"}>About Us</Link>
      </li>

      {/* Admin */}
      {!user ? (
        <li>
          <Link to={"/login"}>Admin Login</Link>
        </li>
      ) : (
        <li className=" cursor-pointer" onClick={logout}>
          Logout
        </li>
      )}

      {/* Cart */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/admin-dashboard"}>Dashboard</Link>
        </li>
      )}
    </ul>
  );
  return (
    <nav className="bg-pink-600 sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className=" font-bold text-white text-2xl text-center">
              PrasahHUB
            </h2>
          </Link>
        </div>

        {/* right  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
      </div>
    </nav>
  );
};

export default Navbar;
