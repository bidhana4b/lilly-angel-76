
import React, { useState } from 'react';
import HeaderLogo from './header/HeaderLogo';
import DesktopNavigation from './header/DesktopNavigation';
import AuthButtons from './header/AuthButtons';
import MobileNavigation from './header/MobileNavigation';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between py-3">
        <HeaderLogo />
        <DesktopNavigation />
        <AuthButtons />
        <MobileNavigation 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
      </div>
    </header>
  );
};

export default Header;
