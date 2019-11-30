import React from 'react'
import { Icon, Avatar, Row, Col, Timeline, Progress, Tag, Rate } from 'antd';
import './CandidateProfile.scss';
import { IFindCandidateDetail } from '../../../../redux/models/find-candidates-detail';
// @ts-ignore
import backGround from '../../../../assets/image/rodan.png';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { InputTitle } from '../input-tittle/InputTitle';
import { ISkill } from '../../../../redux/models/skills';
import { TYPE } from '../../../../common/const/type';


interface ICandidateProfileState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>
}

interface ICandidateProfileProps {
    data?: IFindCandidateDetail
}

function CandidateProfile(props: ICandidateProfileProps) {
    const { data } = props;

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
                            src={data ? data.avatarUrl : avatar}
                            style={{
                                height: 140,
                                width: 140,
                                border: "solid white 2px"
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
                                {data ? data.description : ""}
                            </p>
                        </div>
                        <div className="info">
                            <ul>
                                <li>
                                    <label className="block-span">Ngày sinh</label>
                                    <label>28-4-1998</label>
                                </li>
                                <li>
                                    <label className="block-span">Số điện thoại</label>
                                    <label>
                                        <strong>
                                            {data && data.phone ? data.phone :
                                                <span style={{ fontStyle: "italic", color: "red" }}>Cần mở khóa để xem</span>}
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
                                    <label>{data ? data.address : ""}</label>
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
                            <hr />
                            <div>
                                <Timeline pending="Recording..." reverse={false}>
                                </Timeline>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6> <Icon type="read" />Học vấn</h6>
                            <hr />
                            <div>
                                <Timeline pending="Recording..." reverse={false}>
                                    <Timeline.Item key={12}> basdf</Timeline.Item>
                                </Timeline>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
                        <div className="wrapper">
                            <h6> <Icon type="message" /> Trình độ ngoại ngữ</h6>
                            <hr />
                            <div className="language-skills">
                                <div className="content-l-q">
                                    {data &&
                                        data.languageSkills &&
                                        data.languageSkills.length > 0 ?
                                        data.languageSkills.map(
                                            (item: any, index: number) => (
                                                <>
                                                    <p>{item.language.level}</p>
                                                    <Progress type="circle"
                                                        // @ts-ignore
                                                        percent={parseInt((880 / 900) * 100)} format={percent => `${percent}%`} />
                                                    <h5>{item.language.name + "(" + `${item.certificate}` + ")"}</h5>
                                                </>
                                            )
                                        ) : "Chưa có kĩ năng"}

                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6><Icon type="heart" />Tình trạng quan hệ</h6>
                            <hr />
                            <div>
                                <div>
                                    {data && data.gender === TYPE.MALE ? <><Icon type="man" /> Nam giới</> : <><Icon type="woman" /> Nũ giới</>}
                                </div>
                                <div>
                                    <Icon type="idcard" /> Độc thân
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md={12} >
                        <div className="wrapper">
                            <h6> <Icon type="solution" />Kĩ năng </h6>
                            <hr />
                            <div className="skills">
                                {data &&
                                    data.skills &&
                                    data.skills.length > 0 ?
                                    data.skills.map(
                                        (item: ISkill, index: number) => (<Tag color="geekblue" style={{ padding: "5px 10px", margin: 5 }}>{item.name}</Tag>)
                                    ) : "Chưa có kĩ năng"}
                            </div>
                        </div>
                    </Col>
                    <Col md={12}>
                        <div className="wrapper">
                            <h6><Icon type="like" />Đánh giá của nhà tuyển dụng</h6>
                            <hr />
                            <div>
                                <label className="block-span">Thái độ </label><label></label>
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