import "./NavigationBar.css";
import { Route, Routes } from "../../typedefs";

type PropTypes = {
  routes: Routes;
  currentRoute: Route;
};

export const NavigationBar = ({ routes, currentRoute }: PropTypes) => {
  const pathname = window.location.pathname;

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
    </>
  );
};
