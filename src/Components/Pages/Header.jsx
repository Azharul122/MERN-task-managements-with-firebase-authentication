import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((error) => {
        console.log(error);
      });
  };
  return (
    <div className="overflow-hidden">
      <div className="flex items-center justify-between py-7 w-[96%] md:w-[90%] mx-auto overflow-hidden">
        <Link to={"/"}>
          <p>Task Management</p>
        </Link>
        {user ? (
          <div className="flex items-center gap-1 md:gap-2">
            <p className="text-xs md:text-lg">{user?.email}</p>
            <button
              onClick={handleLogOut}
              className="px-2 md:px-5 py-1 md:py-2 bg-[#6b26b7] text-white rounded"
            >
              Log Out
            </button>
          </div>
        ) : (
          <img
            className="w-12 h-12 rounded-full"
            src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Header;
