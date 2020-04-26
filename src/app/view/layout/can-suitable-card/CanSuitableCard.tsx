import React from 'react';
import { Avatar, Icon, Button } from 'antd';
import './CanSuitableCard.scss';
import { IFindCandidate } from '../../../../models/find-candidates';
//@ts-ignore
import baseImage from '../../../../assets/image/base-image.jpg';
import { NotUpdate } from '../common/Common';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../const/break-cumb';

interface ICanProPop {
    children?: JSX.Element | any;
    data?: IFindCandidate;
    avatar?: string;
    id?: string;
    background?: string;
    handleUnlocked?: () => any;
};

export default function CanSuitableCard(props?: ICanProPop): JSX.Element {
    let { children, data, avatar, background, id } = props;
    // const [loading, setLoading] = React.useState(false);

    const content = (
        <div className='cpp-ct'>
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
                <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`} target='_blank'>
                    <div style={{ color: background ? 'white' : '#168ECD', marginLeft: 5, fontWeight: 600, fontSize: 18 }}>
                        {children}
                    </div>
                </Link>
            </div>
            <div className='cpp-if'>
                {data && data.gender === "MALE" ? <div><Icon type="man" style={{ marginRight: 5 }} />Nam</div> : <div><Icon type="woman" style={{ marginRight: 5 }} />Nữ</div>}
                {data && data.region && data.region.name ? <div><Icon type="environment" style={{ marginRight: 5 }} />Sống tại {data.region.name}</div> : ''}
                {data && data.phone ? <div><Icon type={'phone'} /> {data.phone}</div> :
                    (
                        data && data.unlocked ?
                            <div><Icon type={'phone'} style={{ marginRight: 5 }} /><NotUpdate /></div> :
                            <div><Icon type={'phone'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                {data && data.email ? <div><Icon type={'mail'} style={{ marginRight: 5 }} /> {data.email}</div> :
                    (
                        data && data.unlocked ?
                            <div><Icon type={'mail'} style={{ marginRight: 5 }} /><NotUpdate /></div> :
                            <div><Icon type={'mail'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                <div>
                    <Icon type={data && data.unlocked ? 'unlock' : 'lock'} theme={'filled'} style={{ color: data && data.unlocked ? 'green' : '', marginRight: 5 }} />
                    {data && data.unlocked ? 'Đã mở khóa' : 'Chưa mở khóa'}
                </div>
            </div>
            <div className='cpp-ct-ft'>
                <Link to={routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}`} target='_blank'>
                    <Button
                        size={'small'}
                        className='test'
                        style={{ float: 'right', marginRight: 5 }}
                    >
                        <Icon type={'search'} />
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
    )

    return (
        <div className='can-sui-card test'>
            {content}
        </div>
    )
}