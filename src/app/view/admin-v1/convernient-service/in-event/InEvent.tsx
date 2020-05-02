import React from 'react'
import './InEvent.scss';
import { Divider } from 'antd';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';

function InEvent() {
    return (
        < >
            <h5>Thông tin gói dịch vụ</h5>
            <div className='job-service'>
               <div>
               {}
               </div>
            </div>
        </>
    )
}



export default InEvent;


