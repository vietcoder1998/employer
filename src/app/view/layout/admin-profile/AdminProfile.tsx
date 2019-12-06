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
import { REDUX, REDUX_SAGA } from '../../../../common/const/actions';
import { IAppState } from '../../../../redux/store/reducer';
import { _requestToServer } from '../../../../services/exec';
import { PUT } from '../../../../common/const/method';
import { ADMIN_ACCOUNT } from '../../../../services/api/private.api';
import { EMPLOYER_HOST } from '../../../../environment/dev';

interface IAdminProfileProps extends StateProps, DispatchProps {
    data?: IAdminAccount,
};

function AdminProfile(props: IAdminProfileProps) {
    let { data } = props;
    let [id, setId] = React.useState(null);
    let [loading, setLoading] = React.useState(false)
    // Error loading 
    let [onErrLogo, setErrLogo] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);
    let [hotUpdate, setHotUpdate] = React.useState(false);

    // Fix State
    let [fixDescription, setFixDescription] = React.useState(false);
    let [fixInfo, setFixInfo] = React.useState(false);
    let [fixMap, setFixMap] = React.useState(false);
    let [fixIFCard, setFixIFCard] = React.useState(false);
    let [fixIBCard, setFixIBCard] = React.useState(false);
    let [fixName, setFixName] = React.useState(false);

    // Change Image
    let [coverUrl, setCoverUrl] = React.useState(null);
    let [logoUrl, setLogoUrl] = React.useState(null);
    let [identityCardFrontImageUrl, setIdentityCardFrontImageUrl] = React.useState(null);
    let [identityCardBackImageUrl, setIdentityCardABackImageUrl] = React.useState(null);

    // Change Profile
    let [employerName, setEmployerName] = React.useState(null);
    let [email, setEmail] = React.useState(null);
    let [phone, setPhone] = React.useState(null);
    let [taxCode, setTaxCode] = React.useState(null);
    let [lat, setLat] = React.useState(null);
    let [lon, setLon] = React.useState(null);

    // Change Description
    let [description, setDescription] = React.useState(null);

    // Map and address and region;
    let [address, setAddress] = React.useState(null);

    // SetRegion
    let [region, setRegion] = React.useState(null);

    if (props.data && props.data.id !== id || hotUpdate) {
        // Set id
        setId(props.data.id);

        // Set Logo and CoverUrl, Indentity Card;
        setLogoUrl(props.data.logoUrl);
        setCoverUrl(props.data.coverUrl);
        setIdentityCardFrontImageUrl(props.data.identityCardFrontImageUrl);
        setIdentityCardABackImageUrl(props.data.identityCardBackImageUrl);

        // Set Region
        setRegion(props.data.region && props.data.region.name);

        // Set Data for url
        setEmployerName(props.data.employerName);
        setDescription(props.data.description);
        setEmail(props.data.email);
        setPhone(props.data.phone);
        setTaxCode(props.data.taxCode);

        // Map
        setAddress(props.data.address);
        setLat(props.data.lon);
        setLon(props.data.lon);

        if (hotUpdate) {
            setHotUpdate(false);
        }

        setLoading(false);
    }

    // Update description
    async function _onUpdateUpdateDescription() {
        await setLoading(true)
        await _requestToServer(
            PUT,
            ADMIN_ACCOUNT + '/description',
            {
                description
            },
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            true
        ).then(
            (res: any) => {
                if (res) {
                    recallApi();
                }
            }
        )
    }

    // Update Profile
    async function _onUpdateProfile() {
        await setLoading(true);
        await _requestToServer(
            PUT,
            ADMIN_ACCOUNT + '/profile',
            {
                employerName,
                phone,
                email,
                lat: props.mapState.marker.lat,
                lon: props.mapState.marker.lng,
                taxCode
            },
            undefined,
            undefined,
            EMPLOYER_HOST,
            false,
            true
        ).then(
            (res: any) => {
                if (res) {
                    recallApi();
                }
            }
        )
    }

    function _onUpdateCoverUrl() {

    }

    function _onUpdateLogoUrl() {

    }

    // Reback update
    async function recallApi() {
        await props.getAdminAccount();
        setTimeout(() => {
            setHotUpdate(true);
        }, 500);
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
                    {employerName ? employerName : <NotUpdate />}
                </div>
            </div>
            <div className="account-profile-body">
                <Row>
                    <Col md={24} lg={14} xl={14} xxl={16}>
                        <div className="description-info">
                            <IptLetterP value={"Mô tả"} />
                            <TextArea
                                placeholder="Sơ lược về nhà tuyển dụng"
                                value={description}
                                rows={7}
                                disabled={!fixDescription}
                                onChange={(event: any) => setDescription(event.target.value)}
                            />
                            {
                                fixDescription ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixDescription(!fixDescription);
                                            setHotUpdate(true);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixDescription(!fixDescription);
                                            _onUpdateUpdateDescription();
                                        }}>
                                            <Icon type={loading ? "loading" : "check"} />
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
                        <div id="abc" className="description-info">
                            <IptLetterP value={"Thông tin liên hệ"} />
                            <ul>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="user" />}
                                                value={employerName}
                                                onChange={(event: any) => setEmployerName(event.target.value)}
                                            />
                                            :
                                            <>
                                                <Icon type="user" />
                                                <div
                                                    className="info"
                                                >
                                                    {employerName ? employerName : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="mail" />}
                                                value={email}
                                                onChange={(event: any) => setEmail(event.target.value)}
                                            />
                                            :
                                            <>
                                                <Icon type="mail" />
                                                <div
                                                    className="info"
                                                >
                                                    {email ? email : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="phone" />}
                                                value={phone}
                                                onChange={(event: any) => setPhone(event.target.value)}
                                            />
                                            :
                                            <>
                                                <Icon type="phone" />
                                                <div
                                                    className="info"
                                                >
                                                    {phone ? phone : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    {
                                        fixInfo ?
                                            <Input
                                                prefix={<Icon type="file-search" />}
                                                value={taxCode}
                                                onChange={(event: any) => setTaxCode(event.target.value)}
                                            />
                                            :
                                            <>
                                                <Icon type="file-search" />
                                                <div
                                                    className="info"
                                                >
                                                    {taxCode ? taxCode : <NotUpdate />}
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
                                            setHotUpdate(true);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixInfo(!fixInfo);
                                            _onUpdateProfile();
                                        }}>
                                            <Icon type={loading ? "loading" : "check"} />
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
                                        fixMap ?
                                            <Input
                                                prefix={<Icon type="mail" />}
                                                value={address}
                                            />
                                            :
                                            <>
                                                <Icon type="mail" />
                                                <div
                                                    className="info"
                                                >
                                                    {region ? region : <NotUpdate />}
                                                </div>
                                            </>
                                    }
                                </li>
                                <li>
                                    <Icon type="environment" />
                                    <div
                                        className="info"
                                    >
                                        {address ? address : <NotUpdate />}
                                    </div>
                                </li>
                            </ul>

                            <MapContainter
                                style={{ width: "100%", height: "200px" }} disabled={!fixMap} />
                            {
                                fixMap ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixMap(!fixMap);
                                            setHotUpdate(true);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixMap(!fixMap);
                                            _onUpdateProfile();
                                        }}>
                                            <Icon type={loading ? "loading" : "check"} />
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
                                {identityCardFrontImageUrl ?
                                    <img className="ic" src={identityCardFrontImageUrl} alt="Ảnh trước" /> :
                                    <NotUpdate msg={"Chưa có ảnh mặt trước"} />
                                }
                            </div>
                            {
                                fixIFCard ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixIFCard(!fixIFCard);
                                            setHotUpdate(true);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixIFCard(!fixIFCard);
                                        }}>
                                            <Icon type={loading ? "loading" : "check"} />
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
                                {identityCardBackImageUrl ?
                                    <img className="ic" src={identityCardBackImageUrl} alt="Ảnh sau" /> :
                                    <NotUpdate msg={"Chưa có ảnh mặt sau"} />
                                }
                            </div>
                            {
                                fixIBCard ?
                                    <>
                                        <button className="exit" onClick={() => {
                                            setFixIBCard(!fixIBCard);
                                            setHotUpdate(true);
                                        }}>
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button className="accepted" onClick={() => {
                                            setFixIBCard(!fixIBCard);
                                        }}>
                                            <Icon type={loading ? "loading" : "check"} />
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
    handleMap: (mapState?: IMapState) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, mapState }),
    getAdminAccount: (id?: string) => dispatch({ type: REDUX_SAGA.ADMIN_ACCOUNT.GET_ADMIN_ACCOUNT, id })
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;


export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile)