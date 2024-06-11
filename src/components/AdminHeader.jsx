import { Link } from "react-router-dom"
import { logOut } from "../config/firebase";

const AdminHeader = () => {

    const handleLogOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <header className="flex justify-between px-10 items-center py-4 bg-[#f5f5f5] shadow-md">
            <div>
              <h1 className="font-serif tracking-wider text-2xl">
                Urban Burger
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                alt="logo-admin"
                className="size-10"
              />
              <Link to="/" onClick={handleLogOut}>
                <span className="material-symbols-outlined cursor-pointer">
                  logout
                </span>
              </Link>
            </div>
          </header>
  )
}

export default AdminHeader
