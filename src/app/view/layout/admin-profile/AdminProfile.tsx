import React from 'react'
import { Icon, Avatar, Row, Col, Progress, Tag, Rate, Button, Tooltip, Input } from 'antd';
import './AdminProfile.scss';
// @ts-ignore
import backGround from '../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { TYPE } from '../../../../common/const/type';
import { TimeLineConfig, TimeLineConfigItem } from '../config/TimeLineConfig';
import { timeConverter } from '../../../../common/utils/convertTime';
import { NotUpdate, IptLetter, IptLetterP } from '../common/Common';
import { IAdminAccount } from '../../../../redux/models/admin-account';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import MapContainter from './../map/Map';
import { IMapState } from '../../../../redux/models/mutil-box';
import { REDUX } from '../../../../common/const/actions';
import { IAppState } from '../../../../redux/store/reducer';

interface IAdminProfileProps extends StateProps, DispatchProps {
    data?: IAdminAccount,
    handleMap?: (mapState: IMapState) => any;
};

function AdminProfile(props: IAdminProfileProps) {
    let { data } = props;
    let [id, setId] = React.useState(null);
    // Error loading 
    let [onErrLogo, setErrLogo] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    // Fix State
    let [fixDescription, setFixDescription] = React.useState(false);
    let [fixInfo, setFixInfo] = React.useState(false);
    let [fixMap, setFixMap] = React.useState(false);
    let [fixIFCard, setFixIFCard] = React.useState(false);
    let [fixIBCard, setFixIBCard] = React.useState(false);
    let [fixName, setFixName] = React.useState(false);

    // Change data
    let [coverUrl, setCoverUrl] = React.useState(null);
    let [logoUrl, setLogoUrl] = React.useState(null);
    let [name, setName] = React.useState(null);
    let [description, setDescription] = React.useState(null);
    let [employerName, setEmployerName] = React.useState(null);
    let [email, setEmail] = React.useState(null);
    let [phone, setPhone] = React.useState(null);
    let [taxCode, setTaxCode] = React.useState(null);
    let [lat, setLat] = React.useState(null);
    let [lon, setLon] = React.useState(null);

    if (props.data && props.data.id !== id) {
        setId(props.data.id);
        setLogoUrl(props.data.logoUrl);
        setCoverUrl(props.data.coverUrl);
        setDescription(props.data.description);
        setEmail(props.data.email);
        setLogoUrl(props.data.logoUrl);
    }

    return (
        <div className="account-profile">
            <div className="account-profile-header">
                <Button
                    icon={"camera"}
                    type={"dashed"}
                    style={{
                        right: "5%",
                        top: "5%",
                        position: "absolute",
                        zIndex: 1,
                    }}
                    children={
                        "Cập nhập ảnh bìa"
                    }
                />
                <img
                    className="cover-image-profile"
                    src={!onErrCover && coverUrl ? coverUrl : backGround}
                    alt={"rodan"}
                    onError={() => setErrCover(true)}
                />

            </div>
            <div className="block-image">
                <div
                    className="content-avatar"
                >
                    <div
                        className="upload-image"
                        children={
                            <>
                                <Icon type="camera" theme={"filled"} />
                            </>
                        }
                    />
                    <Avatar
                        // @ts-ignore
                        src={!onErrLogo && data && data.logoUrl ? logoUrl : avatar}
                        style={{
                            height: "8vw",
                            width: "8vw",
                            border: "solid white 2px",
                            fontSize: 60,

                        }}
                        // @ts-ignore
                        onError={() => setErrLogo(true)}
                    />
                </div>
                <div className="name-employer">
                    {data && data.employerName ? data.employerName : <NotUpdate />}
                    <Icon type={"edit"} style={{ marginLeft: "10px" }} />
                </div>
            </div>
            <div className="account-profile-body">
                <Row>
                    <Col md={24} lg={14} xl={14} xxl={16}>
                        <div className="description-info">
                            <IptLetterP value={"Mô tả"} />
                            <TextArea
                                placeholder="Sơ lược về nhà tuyển dụng"
                                value={data && data.description}
                                rows={7}
                                disabled={!fixDescription}
                            />
                            {
                                fixDescription ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixDescription(!fixDescription);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixDescription(!fixDescription);
                                        }}>
                                            <Icon type="check" />
                                            Chấp nhận
                                        </button>
                                    </> :
                                    <button
                                        className="fix"
                                        onClick={() => {
                                            setFixDescription(!fixDescription);
                                        }}>
                                        <Icon type="edit" />
                                        Chỉnh sửa
                                    </button>
                            }
                        </div>
                        <div className="description-info">
                            <IptLetterP value={"Thông tin liên hệ"} />
                            <ul>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="mail" />}
                                                value={data && data.email}
                                            />
                                            :
                                            <>
                                                <Icon type="mail" />
                                                <div
                                                    className="info"
                                                >
                                                    {data && data.email ? data.email : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="phone" />}
                                                value={data && data.phone}
                                            />
                                            :
                                            <>
                                                <Icon type="phone" />
                                                <div
                                                    className="info"
                                                >
                                                    {data && data.phone ? data.phone : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="file-search" />}
                                                value={data && data.taxCode}
                                            />
                                            :
                                            <>
                                                <Icon type="file-search" />
                                                <div
                                                    className="info"
                                                >
                                                    {data && data.taxCode ? data.taxCode : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                            </ul>
                            {
                                fixInfo ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixInfo(!fixInfo);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixInfo(!fixInfo);
                                        }}>
                                            <Icon type="check" />
                                            Chấp nhận
                                        </button>
                                    </> :
                                    <button
                                        className="fix"
                                        onClick={() => {
                                            setFixInfo(!fixInfo);
                                        }}>
                                        <Icon type="edit" />
                                        Chỉnh sửa
                                    </button>
                            }
                        </div>
                        <div className="description-info">
                            <IptLetterP value={"Vị trí trên bản đồ"} />
                            <ul>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="mail" />}
                                                value={data && data.email}
                                            />
                                            :
                                            <>
                                                <Icon type="mail" />
                                                <div
                                                    className="info"
                                                >
                                                    {data &&
                                                        data.region &&
                                                        data.region.name ? data.region.name : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    <Icon type="environment" />
                                    <div
                                        className="info"
                                    >
                                        {data && data.address ? data.address : <NotUpdate />}
                                    </div>
                                </li>
                            </ul>

                            <MapContainter
                                style={{ width: "100%", height: "200px" }} disabled={true} />
                            {
                                fixMap ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixMap(!fixMap);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixMap(!fixMap);
                                        }}>
                                            <Icon type="check" />
                                            Chấp nhận
                                        </button>
                                    </> :
                                    <button
                                        className="fix"
                                        onClick={() => {
                                            setFixMap(!fixMap);
                                        }}>
                                        <Icon type="edit" />
                                        Chỉnh sửa
                                    </button>
                            }
                        </div>
                    </Col>
                    <Col md={24} lg={10} xl={10} xxl={8}>
                        <div className="description-info">
                            <IptLetterP value={"Mặt trước giấy phép kinh doanh"} />
                            <div className="image-f-d">
                                <div
                                    className="upload-image"
                                    children={
                                        <Icon type="camera" theme={"filled"} />
                                    }
                                />
                                {data && data.identityCardFrontImageUrl ?
                                    <img className="ic" src={data && data.identityCardFrontImageUrl} alt="Ảnh trước" /> :
                                    <NotUpdate msg={"Chưa có ảnh mặt trước"} />
                                }
                            </div>
                            {
                                fixIFCard ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixIFCard(!fixIFCard);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixIFCard(!fixIFCard);
                                        }}>
                                            <Icon type="check" />
                                            Chấp nhận
                                        </button>
                                    </> :
                                    <button
                                        className="fix"
                                        onClick={() => {
                                            setFixIFCard(!fixIFCard);
                                        }}>
                                        <Icon type="edit" />
                                        Chỉnh sửa
                                    </button>
                            }
                        </div>
                        <div className="description-info">
                            <IptLetterP value={"Mặt sau giấy phép kinh doanh"} />
                            <div className="image-f-d" >
                                <div
                                    className="upload-image"
                                    children={
                                        <>
                                            <Icon type="camera" theme={"filled"} />
                                        </>
                                    }
                                />
                                {data && data.identityCardBackImageUrl ?
                                    <img className="ic" src={data && data.identityCardBackImageUrl} alt="Ảnh sau" /> :
                                    <NotUpdate msg={"Chưa có ảnh mặt sau"} />
                                }
                            </div>
                            {
                                fixIBCard ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixIBCard(!fixIBCard);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixIBCard(!fixIBCard);
                                        }}>
                                            <Icon type="check" />
                                            Chấp nhận
                                        </button>
                                    </> :
                                    <button
                                        className="fix"
                                        onClick={() => {
                                            setFixIBCard(!fixIBCard);
                                        }}>
                                        <Icon type="edit" />
                                        Chỉnh sửa
                                    </button>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    hanleMap: (mapState: IMapState) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, mapState })
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;


export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile)