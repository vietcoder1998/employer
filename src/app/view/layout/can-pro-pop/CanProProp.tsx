import React from 'react';
import { Popover, Avatar, Icon, Button } from 'antd';
import './CanProProp.scss';
//@ts-ignore
import baseImage from '../../../../assets/image/base-image.jpg';
import { NotUpdate } from '../common/Common';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../const/break-cumb';
import { IRegion } from '../../../../models/regions';
import { TYPE } from '../../../../const/type';

interface ICanProPop {
    children?: JSX.Element | any;
    avatar?: string;
    id?: string;
    unlocked?: boolean;
    email?: string;
    background?: string;
    region?: IRegion;
    saveProfile?: boolean;
    gender?: "MALE" | "FEMALE"
    phone?: string;
    profileType?: string;
    handleUnlocked?: () => any;
};

export default function CanProPop(props?: ICanProPop): JSX.Element {
    let { children, avatar, background, id, unlocked, phone, email, region, gender , profileType } = props;

    const linkTo = routeLink.FIND_CANDIDATES + routePath.DETAIL + `/${id}?type=${profileType === TYPE.STUDENT ? TYPE.STUDENT : TYPE.CANDIDATE}`;
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
                <div style={{ color: background ? 'white' : '#168ECD', marginLeft: 5, fontWeight: 600, fontSize: 18 }}>
                    {children}
                </div>
            </div>
            <div className='cpp-if'>
                {gender === "MALE" ? <div><Icon type="man" style={{ marginRight: 5 }} />Nam</div> : <div><Icon type="woman" style={{ marginRight: 5 }} />Nữ</div>}
                {region && region.name ? <div><Icon type="environment" style={{ marginRight: 5 }} />Sống tại {region.name}</div> : ''}
                {phone ? <div><Icon type={'phone'} /> {phone}</div> :
                    (
                        unlocked ?
                            <div><Icon type={'phone'} style={{ marginRight: 5 }} /><NotUpdate msg="Chưa cập nhật thông tin" /></div> :
                            <div><Icon type={'phone'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                {email ? <div><Icon type={'mail'} style={{ marginRight: 5 }} /> {email}</div> :
                    (
                        unlocked ?
                            <div><Icon type={'mail'} style={{ marginRight: 5 }} /><NotUpdate /></div> :
                            <div><Icon type={'mail'} style={{ marginRight: 5 }} /><span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span></div>
                    )
                }
                <Icon type={unlocked ? 'unlock' : 'lock'} theme={'filled'} style={{ color: unlocked ? 'green' : 'red', marginRight: 5 }} />
                {
                    unlocked ? 'Đã mở khóa' : 'Chưa mở khóa'
                }
            </div>
            <div className='cpp-ct-ft'>
                <Link to={linkTo} target='_blank'>
                    <Button
                        className='test'
                        type={'primary'}
                        style={{ float: 'right', marginRight: 5 }}
                        icon={'search'}
                    >
                        Xem chi tiết
                    </Button>
                </Link>
            </div>
        </div>
    )

    return (
        <Popover
            className='can-pro-prop'
            content={content}
            trigger="hover"
            placement={'topLeft'}
        >
            <div className='link-to' style={{ color: "#168ecd" }}>
                <Link to={linkTo} target='_blank'>
                    {children}
                </Link>
            </div>
        </Popover>
    )
}