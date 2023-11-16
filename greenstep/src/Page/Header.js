import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
          <div id='logo'>
            <Link to="/">
                <img src="/icon/greenstep.png" alt="home"/>
              </Link>
          </div>
          <div className='headerIcon' id='download'>
            <Link to="/downloadpage">
              <img src="/icon/download.gif" alt="download"/>
              <div className='iconName'>Download</div>
            </Link>
          </div>
          <div className='headerIcon' id='map'>
            <Link to="/mappage">
              <img src="/icon/map.gif" alt="map"/>
              <div className='iconName'>Map</div>
            </Link>
          </div>
      </nav>
    </header>
  );
}

export default Header;