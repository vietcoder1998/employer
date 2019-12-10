import React from 'react';
import './ReadCard.scss';
import { Avatar } from 'antd';
import { Timer } from '../../../../layout/common/Common';
//@ts-ignore
import testImg from '../../../../../../assets/image/rodan.png';

interface IReadCard {

}

export default function ReadCard(props: IReadCard) {

    return (
        <div className='read-card test'  >
            <div className='read-card-content ' >
                <div className='info-card'>
                    <div className="left-box">
                        <h6>
                            ent of a page when looking
                             at its layout. The point of using L
                        </h6>
                        y dummy text
                        of the printing and types been
                         the industry'sdummy
                    </div>
                    <div className='right-box' >
                        <Avatar src={testImg} shape={"square"} style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}