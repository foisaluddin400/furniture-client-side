import { Link, NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
const Navbar = () => {

    const menu = <>
    
    <NavLink className='px-4 py-2' to='/'><li>Home</li></NavLink>
    <NavLink className='px-4 py-2' to='/shop'><li>Shop</li></NavLink>
    <NavLink className='px-4 py-2' to='/about'><li>About</li></NavLink>
    <NavLink className='px-4 py-2' to='/contact'><li>Contact</li></NavLink>
    
    
    
    </>
    return (
        <div>
            <div className="navbar bg-white text-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {menu}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Furniro</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {menu}
    </ul>
  </div>
  <div className="navbar-end text-2xl flex gap-4">
  <CiUser />
  <FaRegHeart />
  <AiOutlineShoppingCart />
  <Link to='/login'><RiLoginBoxLine /></Link>
  <BiLogOut />
  </div>
</div>
        </div>
    );
};

export default Navbar;