import React from 'react'
import { Icon, Avatar, Row, Col, Input } from 'antd';
import './AdminProfile.scss';
// @ts-ignore
import backGround from '../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { NotUpdate, IptLetterP } from '../common/Common';
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
import { sendFileHeader } from '../../../../services/auth';
import randomID from '../../../../common/utils/randomID';

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

    // Change Image
    let [coverUrl, setCoverUrl] = React.useState(null);
    let [logoUrl, setLogoUrl] = React.useState(null);
    let [identityCardFrontImageUrl, setIdentityCardFrontImageUrl] = React.useState(null);
    let [identityCardBackImageUrl, setIdentityCardBackImageUrl] = React.useState(null);

    // Change Profile
    let [employerName, setEmployerName] = React.useState(null);
    let [email, setEmail] = React.useState(null);
    let [phone, setPhone] = React.useState(null);
    let [taxCode, setTaxCode] = React.useState(null);

    // Change Description
    let [description, setDescription] = React.useState(null);

    // Map and address and region;
    let [address, setAddress] = React.useState(null);

    // SetRegion
    let [region, setRegion] = React.useState(null);

    // File Blod
    let [front, setFront] = React.useState(null);
    let [back, setBack] = React.useState(null);
    let [cover, setCover] = React.useState(null);
    let [logo, setLogo] = React.useState(null);

    if ((props.data && props.data.id !== id) || hotUpdate) {
        // Set id
        setId(props.data.id);

        // Set Logo and CoverUrl, Indentity Card;
        setLogoUrl(props.data.logoUrl);
        setCoverUrl(props.data.coverUrl);

        //
        setIdentityCardFrontImageUrl(props.data.identityCardFrontImageUrl + `?rd=${randomID(16)}`);
        setIdentityCardBackImageUrl(props.data.identityCardBackImageUrl + `?rd=${randomID(16)}`);

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

        // Set Image Blob
        setFront(null);
        setBack(null);
        setCover(null);
        setLogo(null);

        if (hotUpdate) {
            setHotUpdate(false);
        }

        // Set loading
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

    // Upload image to see 
    function uploadImgToSee(file?: Blob, param?: string) {
        switch (param) {
            case "logoUrl":
                setLogo(file);
                break;
            case "coverUrl":
                setCover(file);
                break;
            case "identityCardFrontImageUrl":
                setFront(file);
                break;
            case "identityCardBackImageUrl":
                setBack(file);
                break;
            default:
                break;
        }

        readFileAsUrl(file, param);
    }

    // ReaderFile As url
    function readFileAsUrl(file?: Blob, param?: string) {
        let reader = new FileReader();
        reader.onload = function (e: any) {
            switch (param) {
                case "logoUrl":
                    setLogoUrl(e.target.result);
                    break;
                case "coverUrl":
                    setCoverUrl(e.target.result);
                    break;
                case "identityCardFrontImageUrl":
                    setIdentityCardFrontImageUrl(e.target.result);

                    break;
                case "identityCardBackImageUrl":
                    setIdentityCardBackImageUrl(e.target.result);
                    break;
                default:
                    break;
            }
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    // UploadData
    async function _onUpdateImgUrl(param?: string, type_path?: string, file?: Blob) {
        let formData = new FormData();
        await setLoading(true);

        if (file) {
            formData.append(param, file)
        }

        switch (param) {
            case "cover":
                formData.append("cover", cover)
                break;
            case "logo":
                formData.append("back", logo)
                break;
            case "front":
                formData.append("front", front)
                break;
            case "back":
                formData.append("back", back)
                break;

            default:
                break;
        };

        await _requestToServer(
            PUT,
            ADMIN_ACCOUNT + `/${type_path}`,
            formData,
            undefined,
            sendFileHeader,
            EMPLOYER_HOST,
            false,
            true
        ).then(
            (res: any) => {
                if (res) {
                    recallApi();
                }
            }
        );
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
                {/* LogoUrl */}
                <label
                    className="upload-cover"
                    htmlFor="coverUrl"
                    children={
                        <>
                            <Icon type="upload" />
                            Cập nhập ảnh bìa
                            <input
                                id="coverUrl"
                                type="file"
                                style={{ display: "none" }}
                                onChange={
                                    (event: any) =>
                                        _onUpdateImgUrl(
                                            "cover",
                                            "coverUrl",
                                            event.target.files[0]

                                        )
                                }
                            />
                        </>
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
                    <label
                        htmlFor="logoUrl"
                        className="upload-image"
                        children={
                            <>
                                <Icon type="camera" theme={"filled"} />
                                <input
                                    id="logoUrl"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={
                                        (event: any) =>
                                            _onUpdateImgUrl(
                                                "logo",
                                                "logoUrl",
                                                event.target.files[0]

                                            )
                                    }
                                />
                            </>
                        }
                    />

                    <Avatar
                        // @ts-ignore
                        src={!onErrLogo && data && data.logoUrl ? logoUrl : avatar}
                        style={{
                            height: "8vw",
                            width: "8vw",
                            position: "absolute",
                            left: "0px ",
                            top: "0px",
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
                                                prefix={<Icon type="bank" />}
                                                value={employerName}
                                                onChange={(event: any) => setEmployerName(event.target.value)}
                                            />
                                            :
                                            <>
                                                <Icon type="bank" />
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
                    {/* Front */}
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
                                {
                                    identityCardFrontImageUrl ?
                                        <img className="ic" src={identityCardFrontImageUrl} alt="Ảnh trước" /> :
                                        <NotUpdate msg={"Chưa có ảnh mặt trước"} />
                                }
                            </div>
                            {
                                front ?
                                    <>
                                        <button
                                            className="exit"
                                            onClick={() => {
                                                setFront(null);
                                                setHotUpdate(true);
                                            }}
                                        >
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button
                                            className="accepted"
                                            onClick={() => _onUpdateImgUrl("front", "cardImages")}
                                        >
                                            <Icon type={loading ? "loading" : "check"} />
                                            Chấp nhận
                                        </button>
                                    </>
                                    :
                                    <>
                                        <label
                                            className="fix"
                                            htmlFor="identityCardFrontImageUrl"
                                        >
                                            <Icon type="upload" />
                                            Upload
                                        </label>
                                        <input
                                            id="identityCardFrontImageUrl"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={
                                                (event: any) => uploadImgToSee(
                                                    event.target.files[0],
                                                    "identityCardFrontImageUrl"
                                                )
                                            }
                                        />
                                    </>
                            }
                        </div>
                        {/* Back Image */}
                        <div className="description-info">
                            <IptLetterP value={"Mặt sau giấy phép kinh doanh"} />
                            <div className="image-f-d" >
                                <div
                                    className="upload-image"
                                    children={
                                        <Icon type="eye" theme={"filled"} />
                                    }
                                />
                                {
                                    identityCardBackImageUrl ?
                                        <img className="ic" src={identityCardBackImageUrl} alt="Ảnh sau" /> :
                                        <NotUpdate msg={"Chưa có ảnh mặt sau"} />
                                }
                            </div>
                            {
                                back ?
                                    <>
                                        <button
                                            className="exit"
                                            onClick={() => {
                                                setBack(null);
                                                setHotUpdate(true);
                                            }}
                                        >
                                            <Icon type="close" />
                                            Hủy
                                        </button>
                                        <button
                                            className="accepted"
                                            onClick={() => _onUpdateImgUrl("back", "cardImages")}
                                        >
                                            <Icon type={loading ? "loading" : "check"} />
                                            Chấp nhận
                                        </button>
                                    </>
                                    :
                                    <>
                                        <label
                                            className="fix"
                                            htmlFor="identityCardBackImageUrl"
                                        >
                                            <Icon type="upload" />
                                            Upload
                                        </label>
                                        <input
                                            id="identityCardBackImageUrl"
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={
                                                (event: any) => uploadImgToSee(
                                                    event.target.files[0],
                                                    "identityCardBackImageUrl",
                                                )
                                            }
                                        />
                                    </>
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