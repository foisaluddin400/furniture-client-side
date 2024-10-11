import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../UseHook/UseAdmin";
import { RxDashboard } from "react-icons/rx";
const NavbarDashboard = () => {
  const [isAdmin] = UseAdmin();
  return (
    <div>
      <div className="shopBack">
        <div className="text-center text-4xl py-[110px]">Dashboard</div>
      </div>
      <div className="">
        <div className="">
          <div className="mt-2">
            <div className="hidden md:block">
              <div className="mt-2 md:text-start text-sm shadow-md md:flex text-center bg-[#FFF3E3]">
                {isAdmin ? (
                  <>
                    <NavLink
                      to="/adminuser"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-3"
                      }
                    >
                      Admin Home
                    </NavLink>
                    <NavLink
                      to="/adminaddproduct"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Add Items
                    </NavLink>
                    <NavLink
                      to="/admineditproduct"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Manage Item
                    </NavLink>
                    <NavLink
                      to="/adminroll"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      All User
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      My cart
                    </NavLink>
                    <NavLink
                      to="/adminorder"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Order List
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/userhome"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/payment"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      Payment
                    </NavLink>
                    <NavLink
                      to="/paymenthistory"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      Payment His
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Cart
                    </NavLink>

                    <NavLink
                      to="/myadress"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Address
                    </NavLink>
                  </>
                )}
              </div>
            </div>


            <div className="block md:hidden">
              <details className="dropdown">
                <summary className="btn bg-white border-none shadow-none text-3xl text-black m-1 "><RxDashboard /></summary>
                <ul className="menu dropdown-content rounded-box z-[1] w-52 ">
                 
                  <div className="mt-2 text-sm shadow-md  bg-[#FFF3E3] flex flex-col ">
                {isAdmin ? (
                  <>
                    <NavLink
                      to="/adminuser"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-3"
                      }
                    >
                      Admin Home
                    </NavLink>
                    <NavLink
                      to="/adminaddproduct"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Add Items
                    </NavLink>
                    <NavLink
                      to="/admineditproduct"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Manage Item
                    </NavLink>
                    <NavLink
                      to="/adminroll"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      All User
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      My cart
                    </NavLink>
                    <NavLink
                      to="/adminorder"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "md:p-3"
                      }
                    >
                      Order List
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/userhome"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/payment"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      Payment
                    </NavLink>
                    <NavLink
                      to="/paymenthistory"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      Payment His
                    </NavLink>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Cart
                    </NavLink>

                    <NavLink
                      to="/myadress"
                      className={({ isActive }) =>
                        isActive ? "p-3 border-b-2 border-red-600" : "p-2"
                      }
                    >
                      My Address
                    </NavLink>
                  </>
                )}
              </div>
                  
                  
                </ul>
              </details>


              
            </div>
          </div>
        </div>

        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
