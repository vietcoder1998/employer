import React from 'react'
import { Icon, Avatar, Row, Col, Progress, Tag, Rate } from 'antd';
import './CandidateProfile.scss';
import { IFindCandidateDetail } from '../../../../redux/models/find-candidates-detail';
// @ts-ignore
import backGround from '../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { TYPE } from '../../../../common/const/type';
import { TimeLineConfig, TimeLineConfigItem } from '../config/TimeLineConfig';
import { timeConverter } from '../../../../common/utils/convertTime';
import { NotUpdate } from '../common/Common';


interface ICandidateProfileState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>
};

interface ICandidateProfileProps {
    data?: IFindCandidateDetail
};

function CandidateProfile(props: ICandidateProfileProps) {
    let { data } = props;

    return (
        <div className="candidate-profile test">
            <div className="candidate-profile-header">
                <img
                    className="cover-image-profile"
                    src={data ? data.coverUrl : backGround}
                    alt={"rodan"}
                />
                <div className="header-content">
                    <div className="hr-center" />
                    <div className="block-image">
                        <Avatar
                            // @ts-ignore
                            src={data ? data.avatarUrl : avatar}
                            style={{
                                height: 140,
                                width: 140,
                                border: "solid white 2px",
                                fontSize: 60
                            }}
                        />
                        <h4>
                            {data ? data.lastName + " " + data.firstName : ""}
                        </h4>
                        <p>

                        </p>
                    </div>
                    <div className="description">
                        <div className="profile-description">
                            <h6>
                                Mô tả bản thân
                            </h6>
                            <p>
                                {data ? data.description : <NotUpdate />}
                            </p>
                        </div>
                        <div className="info">
                            <ul>
                                <li>
                                    <label className="block-span">Ngày sinh</label>
                                    <label>{data && data.birthday !== -1 ? timeConverter(data.birthday, 1000, "DD-MM-YYYY") : <NotUpdate />}</label>
                                </li>
                                <li>
                                    <label className="block-span">Số điện thoại</label>
                                    <label>
                                        <strong>
                                            {data && data.phone ? data.phone :
                                                (data && data.unlocked ? <NotUpdate /> : <span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span>)
                                            }
                                        </strong>
                                    </label>
                                </li>
                                <li>
                                    <label className="block-span">Thư điện tử</label>
                                    <label>
                                        <strong>
                                            {data && data.email ?
                                                data.email : <span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span>}
                                        </strong>
                                    </label>
                                </li>
                                <li>
                                    <label className="block-span">Địa chỉ</label>
                                    <label>{data && (data.address || data.address !== "") ? data.address : <NotUpdate />}</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="candidate-profile-body">
                <Row >
                    <Col md={12} >
                        <div className="wrapper">
                            <h6> <Icon type="project" /> Kinh nghiệm</h6>
                            <div style={{ paddingLeft: "25px" }}>
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
                                                    <li><strong>Từ : {timeConverter(item.startedDate, 1000)}</strong></li>
                                                    <li><strong>đến :  {item.finishedDate !== -1 ? timeConverter(item.finishedDate, 1000) : "Hiện tại"}</strong></li>
                                                    <li style={{ marginTop: "20px", textTransform: "capitalize" }}>tại :{item.companyName}</li>
                                                    <li style={{ marginTop: "20px" }}>{item.description}</li>
                                                </ul>
                                            </TimeLineConfigItem>
                                        )
                                        : <NotUpdate />
                                    }
                                </TimeLineConfig>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6> <Icon type="read" />Học vấn</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div>
                                <TimeLineConfig
                                    reserve={true}
                                >
                                    {data && data.educations && data.educations.length > 0 ?
                                        data.educations.map((item: any, index: number) =>
                                            <TimeLineConfigItem
                                                color="#1890ff"
                                                key={index}
                                            >
                                                <ul>
                                                    <li><strong>Từ : {timeConverter(item.startedDate, 1000)}</strong></li>
                                                    <li><strong>đến :  {item.finishedDate === -1 ? timeConverter(item.finishedDate, 1000) : "Hiện tại"}</strong></li>
                                                    <li style={{ marginTop: "10px", textTransform: "capitalize" }}>tại :{item.school}</li>
                                                    <li style={{ marginTop: "10px" }}>{item.description}</li>
                                                </ul>
                                            </TimeLineConfigItem>
                                        )
                                        : <NotUpdate />
                                    }
                                </TimeLineConfig>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
                        <div className="wrapper">
                            <h6> <Icon type="message" /> Trình độ ngoại ngữ</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div className="language-skills" >
                                <div className="content-l-q">
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
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6><Icon type="heart" />Tình trạng quan hệ</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div style={{ padding: "10px" }}>
                                <div>
                                    {data && data.gender === TYPE.MALE ? <><Icon type="man" /> Nam giới</> : <><Icon type="woman" /> Nũ giới</>}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
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
                                        (item: any, index: number) => (<Tag key={index} color="geekblue" style={{ padding: "5px 10px", margin: 5 }}>{item.name}</Tag>)
                                    ) : <NotUpdate />}
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6><Icon type="like" />Đánh giá của nhà tuyển dụng</h6>
                            <div style={{ paddingLeft: "25px" }}>
                                <hr />
                            </div>
                            <div >
                                <label className="block-span">Số lượt đánh giá</label>{data ? data.rating.ratingCount : "Chưa có đánh giá cụ thể"}<label></label>
                                <div>
                                    <label className="block-span">Thái độ </label>
                                    <Rate disabled value={data ? data.rating.jobAccomplishmentRating : 1} />
                                </div>
                                <div>
                                    <label className="block-span">Trách nghiệm</label>
                                    <Rate disabled value={data ? data.rating.attitudeRating : 1} />
                                </div>
                                <div>
                                    <label className="block-span">Kĩ năng</label>
                                    <Rate disabled value={data ? data.rating.skillRating : 1} />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default CandidateProfile