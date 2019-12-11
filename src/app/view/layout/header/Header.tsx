import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../../../../src/logo-01.png';
import './Header.scss';

export default function Header(props) {
  let token = localStorage.getItem("token");
  return (
    <>
      <div className="header">
        <div className="logo">
          <Link to="/"><img width={120} height={40} src={logo} alt="itea-scan" /> </Link>
        </div>
        {token ? '' : <div style={{float: 'right'}}><Link to='/login'>Đăng nhập</Link> / <Link to='/register'>Đăng kí</Link></div>}
      </div>
    </>
  );
}