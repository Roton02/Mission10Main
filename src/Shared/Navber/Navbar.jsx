
import "./Navbar.css";
import 'animate.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContextProvider/ContextProvider";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

  const [theme , setTheme] = useState('light')
  useEffect(()=>{
      localStorage.setItem('theme', theme);
      const localTheme = localStorage.getItem('theme')
      document.querySelector('html').setAttribute('data-theme',localTheme)
  }, [theme])
  const handleChange=(e)=>{
      if (e.target.checked) {
          setTheme('synthwave')
      }else{
          setTheme('light')
      }
      // console.log(theme);
  }    

  const { Logout, user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="navbar my-3 z-[100]  w-full  ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <div
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2  shadow bg-base-100 rounded-box w-52"
          >
            <NavLink
              to="/"
              className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
            >
              Home
            </NavLink>
            <NavLink
              to="/allTourist"
              className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
            >
              All Tourists Spot
            </NavLink>
           
            <NavLink
          to="/addTourist"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
          Add Tourists Spot
        </NavLink>
        <NavLink
          to="/myList"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
         My List
        </NavLink>
       
            
          </div>
        </div>
        <Link
          to="/"
          className="btn  btn-ghost text-base md:text-xl lg:text-3xl mr-0 font-bold animate__animated animate__swing animate__delay-0.5s"
        >
          <span className="text-pink-700">Globe</span> Glimpse
        </Link>
      </div>
      <div className="navbar-center hidden space-x-2  lg:flex">
        <NavLink
          to="/"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
          Home
        </NavLink>
        <NavLink
          to="/allTourist"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
          All Tourists Spot
        </NavLink>
        <NavLink
          to="/addTourist"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
          Add Tourists Spot
        </NavLink>
        <NavLink
          to="/myList"
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
         My List
        </NavLink>
       
        
      </div>
      <div className="navbar-end ">
      <label className="cursor-pointer grid place-items-center">
  <input onChange={handleChange} type="checkbox"
  
   className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
  <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
  <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
</label>
     
        {user ? (
          <div  className="flex items-center ">
            <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
          <div
              tabIndex={0}
              role="button"
              className=" border rounded-full border-gray-300  avatar hover:tooltip tooltip-open"
              data-tip={user ? user.displayName : "Invalid Name"}
            >
              <div className=" rounded-full w-9 md:w-12  ">
                <img  alt="" src={user.photoURL} />
              </div>
            </div>
          </div>
         
        </div>
            <button
              onClick={Logout}
              className="rounded-md btn-sm md:btn-md lg:px-3.5 lg:py-2 m-1 overflow-hidden relative group cursor-pointer border-2 p-1 font-medium border-pink-700 text-pink-700 hover:text-white"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-pink-700 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative  text-pink-700 transition duration-300 group-hover:text-white ease">
                Logout
              </span>
            </button>
          </div>
        ) : (
          <div>
            <NavLink
          to='/login'
          className="btn btn-ghost mr-2 border-2 border-gray-300 hover:bg-black hover:text-white "
        >
         Login
        </NavLink>
            <NavLink
          to='/register'
          className="btn btn-ghost border-2 border-gray-300 hover:bg-black hover:text-white "
        >
         Register
        </NavLink>
        
          </div>
        )}
        
      </div>
    </nav>
  );
};

export default Navbar;