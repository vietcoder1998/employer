import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import logo from '../../../../../src/logo-01.png';
import './Header.scss';
import { Icon } from 'antd';

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
            <div>
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
                  Đăng ký
              </Link>
              </div>
              <div style={{ float: "right" }} >
                <a
                  href='https://play.google.com/store/apps/details?id=com.worksvn.employer&hl=vi'
                  className='underline'
                  target='_blank'
                  rel="noopener noreferrer"
                >
                  <Icon type="android" style={{ fontSize: 20, marginRight: 10, marginTop: -5 }} />
                </a>
                <a
                  href='https://apps.apple.com/vn/app/works-vn-tuy%E1%BB%83n-d%E1%BB%A5ng/id1486080602'
                  className='underline'
                  target='_blank'
                  rel="noopener noreferrer"
                >
                  <Icon type="apple" style={{ fontSize: 20, marginRight: 10, marginTop: -5 }} />
                </a>
              </div>
            </div>
        }
      </div>
    </>
  );
}