import React from 'react';
import { Avatar, Icon} from 'antd';
import './CanSuitableCard.scss';
import { IFindCandidate } from '../../../../models/find-candidates';
//@ts-ignore
import baseImage from '../../../../assets/image/base-image.jpg';
import { NotUpdate } from '../common/Common';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../const/break-cumb';
import { TYPE } from '../../../../const/type';

interface ICanProPop {
    children?: JSX.Element | any;
    data?: IFindCandidate;
    avatar?: string;
    id?: string;
    background?: string;
    handleUnlocked?: () => any;
    profileType?: string;
};

export default function CanSuitableCard(props?: ICanProPop): JSX.Element {
    let { children, data, avatar, background, id, profileType } = props;
    const linkTo = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}?type=${profileType === TYPE.CANDIDATE ? TYPE.CANDIDATE : TYPE.STUDENT }`;

    const content = (
        <div className='cpp-ct-card'>
            {background ? <div className='cpp-bg'>
                <img src={background ? background : baseImage} alt='background' />
            </div> : <div style={{ height: 40 }}></div>
            }

            <div
                className='cpp-av'
                style={{ top: background ? 90 : 10 }}
            >
                <Avatar
                    className='test'
                    shape='square'
                    src={avatar}
                    style={{
                        width: 80,
                        height: 80
                    }}
                />
                <Link to={linkTo} target='_blank'>
                    <div style={{ color: background ? 'white' : '#168ECD', marginLeft: 5, fontWeight: 600, fontSize: 18 }}>
                        {children}
                    </div>
                </Link>
            </div>
            <div className='cpp-if'>
                {data && data.gender === "MALE" ? 
                <div className="icon-suitable"><Icon type="man" style={{ marginRight: 5, color: 'rgb(21, 148, 255)' }} />Nam</div> : <div className="icon-suitable"><Icon type="woman" style={{ marginRight: 5, color: 'rgb(255, 57, 92)' }} />Nữ</div>}
                {data && data.region && data.region.name ? <div className="icon-suitable"><Icon type="environment" style={{ marginRight: 5 }} />Sống tại {data.region.name}</div> : ''}
                {data && data.phone ? <div className="icon-suitable"><Icon type={'phone'} /> {data.phone}</div> :
                    (
                        data && data.unlocked ?
                            <div className="icon-suitable"><Icon type={'phone'} style={{ marginRight: 5 }} /><NotUpdate /></div> :
                            <div className="icon-suitable"><Icon type={'phone'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                {data && data.email ? <div><Icon type={'mail'} style={{ marginRight: 5 }} /> {data.email}</div> :
                    (
                        data && data.unlocked ?
                            <div className="icon-suitable"><Icon type={'mail'} style={{ marginRight: 5 }} /><NotUpdate /></div> :
                            <div className="icon-suitable"><Icon type={'mail'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                <div className="icon-suitable">
                    <Icon type={data && data.unlocked ? 'unlock' : 'lock'} theme={'filled'} style={{ color: data && data.unlocked ? 'green' : '', marginRight: 5 }} />
                    {data && data.unlocked ? 'Đã mở khóa' : 'Chưa mở khóa'}
                </div>
            </div>
            {/* <div className='cpp-ct-ft'>
                <Link to={linkTo} target='_blank'>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            icon="search"
                            shape="circle"
                            type="primary"
                            className='test'
                            style={{ float: 'right', marginRight: 5 }}
                        >
                        </Button>
                    </Tooltip>

                </Link>
            </div> */}
        </div>
    )

    return (
        <div className='can-sui-card test'>
            {content}
        </div>
    )
}