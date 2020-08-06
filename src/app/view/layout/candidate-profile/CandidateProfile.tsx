import React from 'react'
import { Icon, Avatar, Row, Col, Progress, Skeleton, Rate } from 'antd';
import './CandidateProfile.scss';
import { IFindCandidateDetail } from '../../../../models/find-candidates-detail';
// @ts-ignore
import backGround from '../../../../assets/image/base-image.jpg';
// @ts-ignore
import avatar_men from '../../../../assets/image/no-avatar.png';
// @ts-ignore
import avatar_women from '../../../../assets/image/women-no-avatar.jpg';
import { TYPE } from '../../../../const/type';
import { TimeLineConfig, TimeLineConfigItem } from '../config/TimeLineConfig';
import { timeConverter } from '../../../../utils/convertTime';
import { NotUpdate } from '../common/Common';

interface ICandidateProfileState {
    location?: string;
    dataBreakcumb?: Array<string>
};

interface ICandidateProfileProps {
    data?: IFindCandidateDetail
};

function CandidateProfile(props: ICandidateProfileProps) {
    let { data } = props;
    let [avatarUrl, setAvatarUrl] = React.useState(avatar_men);
    let [coverUrl, setcoverUrl] = React.useState(backGround);

    let [onErrAvatar, setErrAvatar] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    if (data && data.avatarUrl !== avatarUrl) {
        setAvatarUrl(data.avatarUrl);
    }

    if (data && data.coverUrl !== coverUrl) {
        setcoverUrl(data.coverUrl); 
    }
    // console.log(data)
    return (
        <div className="candidate-profile test">
            <div className="candidate-profile-header">
                <img
                    className="cover-image-profile"
                    src={!onErrCover && coverUrl ? coverUrl : backGround}
                    alt={"base"}
                    onError={() => setErrCover(true)}
                />
                <Row>
                    <Col sm={1} md={1} lg={2}></Col>
                    <Col sm={22} md={22} lg={20}>
                        <div
                            className="header-content"
                        >
                            <div className="block-image">
                                <Avatar
                                    // @ts-ignore
                                    src={!onErrAvatar && avatarUrl ? avatarUrl : (data.gender === "MALE" ? avatar_men : avatar_women)}
                                    style={{
                                        height: 140,
                                        width: 140,
                                        border: "solid white 2px",
                                        fontSize: 60
                                    }}
                                    // @ts-ignore
                                    onError={() => setErrAvatar(true)}
                                />
                                <h4 className="text-white">
                                    {data ? data.lastName + " " + data.firstName : ""}
                                </h4>
                                <div>
                                    <span className="unlock-state" style={{ backgroundColor: data && data.unlocked ? 'rgb(22, 141, 205)' : '#ff5252' }}>{data && data.unlocked ? 'Đã mở khoá' : 'Chưa mở khoá'}</span>
                                </div>
                            </div>
                            <div className="description">
                                <div className="profile-description">
                                    <h6 className="text-white">
                                        Thông tin liên hệ
                                     </h6>
                                    <div>
                                        <label className="block-span text-white">Số điện thoại</label>
                                        <label className="text-white">
                                            <strong>
                                                {data && data.phone ? data.phone :
                                                    (data && data.unlocked ? <NotUpdate /> : <span style={{ fontStyle: "italic" }}>Cần mở khóa để xem</span>)
                                                }
                                            </strong>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block-span text-white">Thư điện tử</label>
                                        <label className="text-white">
                                            <strong>
                                                {data && data.email ?
                                                    data.email : <span style={{ fontStyle: "italic" }}>Cần mở khóa để xem</span>}
                                            </strong>
                                        </label>
                                    </div>

                                </div>
                                <div className="info">
                                    <ul>
                                        <li className="text-white">
                                            <label className="block-span text-white">Giới tính</label>
                                            {data && data.gender === TYPE.MALE ? <>Nam</> : <>Nữ</>}
                                        </li>
                                        <li className="text-white">
                                            <label className="block-span text-white">Ngày sinh</label>
                                            <label>{data && data.birthday !== -1 ? timeConverter(data.birthday, 1000, "DD-MM-YYYY") : <NotUpdate />}</label>
                                        </li>

                                        <li className="text-white">
                                            <label className="block-span text-white">Địa chỉ</label>
                                            <label>{data && data.address && data.address !== "" ? data.address : <NotUpdate />}</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col sm={1} md={1} lg={2}></Col>
                </Row>
            </div>
            <div className="candidate-profile-body">
                <Row >
                    <Col md={24}>
                        <div className="wrapper">
                            <div style={{ display: 'flex' }}>
                                <h6><Icon type="like" />Đánh giá của nhà tuyển dụng</h6>
                                <label style={{ marginLeft: 10 }}>(Số lượt đánh giá {data && data.rating ? data.rating.ratingCount : null})</label>
                            </div>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div >
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                                        <label className="block-span">Thái độ </label>
                                        <Rate disabled value={data && data.rating ? data.rating.jobAccomplishmentRating : 1} />
                                    </div>
                                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                                        <label className="block-span">Trách nghiệm</label>
                                        <Rate disabled value={data && data.rating ? data.rating.attitudeRating : 1} />
                                    </div>
                                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                                        <label className="block-span">Kĩ năng</label>
                                        <Rate disabled value={data && data.rating ? data.rating.skillRating : 1} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={24}>
                        <div className="wrapper">
                            <h6> <Icon type="read" />Học vấn</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>


                                <div style={{ flex: 1 }}>
                                    {data && data.school ?
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <img src={data.school.logoUrl} style={{ height: '20%', width: '20%    ', borderRadius: '50%' }}>

                                            </img>
                                            <ul style={{ marginLeft: 20 , marginTop: 10}}>

                                                <li><strong>Từ : {data.schoolYearStart && data.schoolYearStart !== -1 ? data.schoolYearStart : "Chưa có"}</strong></li>
                                                <li><strong>đến :  {data.schoolYearEnd && data.schoolYearEnd !== -1 ? data.schoolYearEnd : "Chưa có"}</strong></li>
                                                {/* <li style={{ marginTop: "20px", textTransform: "capitalize" }}>{item.branchOfLearning ? item.branchOfLearning : "Chưa có"}</li> */}
                                                <li style={{ marginTop: "10px", textTransform: "capitalize" }}>tại :{data.school.name}</li>

                                            </ul>
                                        </div>
                                        : <NotUpdate margin={true} />
                                    }
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <img src={data.major.branch.imageUrl} style={{ height: '20%', width: '20%    ', borderRadius: '50%' }}>
                                        </img>
                                        <ul style={{ marginLeft: 20 }}>
                                            <li style={{ marginTop: "10px" }}><strong>Nghành nghề đào tạo</strong></li>
                                            <li style={{ marginTop: "10px", textTransform: "capitalize" }}>{data.major.name}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={24}>
                        <div className="wrapper">
                            <h6> <Icon type="read" />Ảnh xác thực</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div style={{ marginLeft: 20 }}>
                                <div>Số chứng minh thư nhân dân:</div>
                                <p style={{ color: "#1890ff" }}>
                                    {data && data.identityCard ? data.identityCard : <NotUpdate />}
                                </p>

                            </div>
                            <Row>
                                <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                                    <div className="ic-ct-img test">
                                        <Skeleton avatar loading={data && data.identityCardBackImageUrl ? false : true} >
                                            <img className='ic' src={data && data.identityCardFrontImageUrl ? data.identityCardFrontImageUrl : null} alt='front description' />
                                        </Skeleton>
                                    </div>

                                </Col>
                                <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                                    <div className="ic-ct-img test">
                                        <Skeleton avatar loading={data && data.identityCardBackImageUrl ? false : true} >
                                            <img className='ic' src={data && data.identityCardBackImageUrl ? data.identityCardBackImageUrl : null} alt='front description' />
                                        </Skeleton>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={24} >
                        <div className="wrapper">
                            <h6> <Icon type="project" /> Kinh nghiệm</h6>
                            <div style={{ paddingLeft: "30px" }}>
                                <hr />
                            </div>
                            <div>
                                <TimeLineConfig
                                    reserve={true}
                                >
                                    {data && data.experiences && data.experiences.length > 0 ?
                                        data.experiences.map((item: any, index: number) =>
                                            <TimeLineConfigItem
                                                color="#1890ff"
                                                key={index}
                                            >
                                                <ul>
                                                    <li><strong>Từ : {item.startedDate && item.startedDate !== -1 ? timeConverter(item.startedDate, 1000) : "Chưa có"}</strong></li>
                                                    <li><strong>đến :  {item.finishedDate && item.finishedDate !== -1 ? timeConverter(item.finishedDate, 1000) : "Chưa có"}</strong></li>
                                                    <li style={{ marginTop: "20px", textTransform: "capitalize" }}>{item.jobName ? item.jobName : "Chưa có"}</li>
                                                    <li style={{ marginTop: "20px", textTransform: "capitalize" }}>tại :{item.companyName}</li>
                                                    <li style={{ marginTop: "20px" }}>{item.description}</li>
                                                </ul>
                                            </TimeLineConfigItem>
                                        )
                                        : <NotUpdate margin={true} />
                                    }
                                </TimeLineConfig>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={24} >
                        <div className="wrapper">
                            <h6> <Icon type="message" /> Trình độ ngoại ngữ</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div className="language-skills" >
                                {/* <div className="content-l-q">
                                    {data &&
                                        data.languageSkills &&
                                        data.languageSkills.length > 0 ?
                                        data.languageSkills.map(
                                            (item: any, index: number) => (
                                                <div key={index} style={{ padding: "10px" }}>
                                                    <p>{item.language.level}</p>
                                                    <Progress type="circle"
                                                        width={80}
                                                        // @ts-ignore
                                                        percent={parseInt((item.score / 900) * 100)} format={percent => `${percent}%`} />
                                                    <h5>
                                                        {item.language.name + "(" + item.certificate + (item.score ? " - " + item.score : "") + ")"}
                                                    </h5>
                                                </div>
                                            )
                                        ) : <NotUpdate />}
                                </div> */}
                                {data &&
                                    data.languageSkills &&
                                    data.languageSkills.length > 0 ?
                                    <div className="content-l-q">
                                        {
                                            data.languageSkills.map(
                                                (item: any, index: number) => (
                                                    <div key={index} style={{ padding: "10px" }}>
                                                        <p>{item.language.level}</p>
                                                        <Progress type="circle"
                                                            width={80}
                                                            // @ts-ignore
                                                            percent={parseInt((item.score / 900) * 100)} format={percent => `${percent}%`} />
                                                        <h5>
                                                            {item.language.name + "(" + item.certificate + (item.score ? " - " + item.score : "") + ")"}
                                                        </h5>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div> : <NotUpdate />}
                            </div>
                        </div>
                    </Col>
                    <Col md={24}>
                        <div className="wrapper">
                            <h6><Icon type="heart" />Mô tả bản thân</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div style={{ padding: "10px" }}>
                                <div>

                                </div>
                                <p>
                                    {data && data.description ? data.description : <NotUpdate margin />}
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={24} >
                        <div className="wrapper">
                            <h6> <Icon type="solution" />Kĩ năng </h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div className="skills">
                                {data &&
                                    data.skills &&
                                    data.skills.length > 0 ?
                                    data.skills.map(
                                        (item: any, index: number) => (<label key={index} class="skills-detail" style={{ padding: "5px 10px", margin: 5 }}>{item.name}</label>)
                                    ) : <NotUpdate margin />}
                            </div>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    )
}

export default CandidateProfile