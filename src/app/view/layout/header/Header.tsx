import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../../../../src/logo-01.png';
import './Header.scss';

export default function Header(props) {
  let token = localStorage.getItem("ecr");
  return (
    <>
      <div className="header">
        <div className="logo">
          <a href="https://works.vn" target='_blank' rel="noopener noreferrer"><img width={120} height={40} src={logo} alt="itea-scan" /> </a>
        </div>
        {
          token ?
            '' :
            <div style={{ float: 'right' }}>
              <Link
                to='/login'
                className='underline'
              >
                Đăng nhập
              </Link>
              /
              <Link
                to='/register'
                className='underline'
              >
                Đăng kí
              </Link>
            </div>
        }
      </div>
    </>
  );
}