import React from 'react';
import HeaderNavItem from './HeaderNavItem';

const DesktopNavigation = () => {
  return (
    <nav className="hidden md:flex">
      <ul className="flex space-x-8">
        <HeaderNavItem to="/" label="Home" />
        <HeaderNavItem to="/about" label="About" />
        <HeaderNavItem to="/courses" label="Courses" />
        <HeaderNavItem to="/tutors" label="Tutors" />
        <HeaderNavItem to="/career" label="Career" />
        <HeaderNavItem to="/social-responsibility" label="Social Responsibility" />
        <HeaderNavItem to="/contact" label="Contact" />
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
