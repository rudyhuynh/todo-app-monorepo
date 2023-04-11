import { MouseEventHandler } from "react";

type SideNavPropsType = {
  onClose: MouseEventHandler;
};

export const SideNav = ({ onClose }: SideNavPropsType) => {
  return (
    <div className="side-nav-backdrop" onClick={onClose}>
      <ul className="side-nav">
        <li>
          <div className="user-view">
            <div className="background"></div>

            <a href="#name">
              <span className="white-text name">John Doe</span>
            </a>
            <a href="#email">
              <span className="white-text email">jdandturk@gmail.com</span>
            </a>
          </div>
        </li>
        <li className="white">
          <a href="#" className="waves-effect waves-blue">
            <i className="material-icons">mail</i>Menu item
          </a>
        </li>
        <li className="white">
          <a href="#" className="waves-effect waves-blue">
            <i className="material-icons">call</i> Menu item
          </a>
        </li>
      </ul>
    </div>
  );
};
