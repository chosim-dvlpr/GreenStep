import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>

          <li><Link to="/">홈</Link></li>
          <li><Link to="/downloadpage">다운로드</Link></li>
          <li><Link to="/mappage">지도</Link></li>

      </nav>
    </header>
  );
}

export default Header;