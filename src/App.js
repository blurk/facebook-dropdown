import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";

import { CSSTransition } from "react-transition-group";

export default function App() {
  return (
    <div>
      <NavBar>
        <NavItem icon={<PlusIcon />} />
        <NavItem icon={<BellIcon />} />
        <NavItem icon={<MessengerIcon />} />
        <NavItem icon={<CaretIcon />}>
          {/* DROP GOES HERE */}
          <DropdownMenu />
        </NavItem>
      </NavBar>
    </div>
  );
}

/* NAVBAR */

function NavBar({ children }) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{children}</ul>
    </nav>
  );
}

/* NAV-ITEM */
function NavItem({ icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a
        href="#"
        className="icon-button"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {icon}
      </a>
      {open && children}
    </li>
  );
}

function DropdownMenu() {
  const [activemenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild?.offsetHeight);
  }, []);

  function calcHeight(elem) {
    const height = elem.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem({ children, leftIcon, rightIcon, goToMenu }) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => goToMenu && setActiveMenu(goToMenu)}
      >
        <span className="icon-button">{leftIcon}</span>
        {children}
        <span className="icon-right">{rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activemenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activemenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h3>Back</h3>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>
            <span role="img" aria-label="emoji">
              😀
            </span>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>
            <span role="img" aria-label="emoji">
              😶
            </span>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>
            <span role="img" aria-label="emoji">
              😂
            </span>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>
            <span role="img" aria-label="emoji">
              😝
            </span>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
