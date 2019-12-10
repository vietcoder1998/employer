import React from 'react';
import './AffixAnnou.scss';
import { Icon } from 'antd';

interface IAffixAnnou {

}

export default function AffixAnnou(props: IAffixAnnou) {

    return (
        <div className='affix-annou-card hidden-only-phone' >
            <div className='affix-annou-card-content'>
                <div>
                    <Icon type={"message"} style={{ fontSize: 22, marginTop: 15 }} />
                </div>
                <div>
                    <Icon type={"facebook"} style={{ fontSize: 22, marginTop: 15  }} />
                </div>
                <div>
                    <Icon type={"star"} style={{ fontSize: 22, marginTop: 15  }} />
                </div>
            </div>
        </div>
    )
}