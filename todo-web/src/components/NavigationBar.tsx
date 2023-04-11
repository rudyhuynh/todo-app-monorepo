import "./NavigationBar.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "../typedefs";
import { SideNav } from "./SideNav";

type PropTypes = {
  routes: Routes;
  currentRoute: Route;
};

export const NavigationBar = ({ routes, currentRoute }: PropTypes) => {
  const pathname = window.location.pathname;

  // const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    // var elems = document.querySelectorAll(".sidenav");
    // var instances = M.Sidenav.init(elems);
    // console.log("instances", instances);
    // // window.$(".button-collapse").sideNav({
    // //   menuWidth: 500, // Default is 300
    // //   edge: "left", // Choose the horizontal origin
    // //   closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    // //   draggable: true, // Choose whether you can drag to open on touch screens
    // // });
  }, []);

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo left">
            {currentRoute.title}
          </a>
          <ul className="right ">
            {routes.map((route) => {
              return (
                <li
                  key={route.path}
                  className={pathname === route.path ? "active" : ""}
                >
                  <a href={route.path}>{route.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      {/* {showSideNav && <SideNav onClose={() => setShowSideNav(false)} />} */}
    </>
  );
};
