import React from 'react'
import { Icon, Avatar, Row, Col, Tabs, Card, Divider, List } from 'antd';
import './SchoolInfo.scss';
// @ts-ignore
import backGround from '../../../../assets/image/base-image.jpg';
// @ts-ignore
import avatar from '../../../../assets/image/test_avatar.jpg';
import { NotUpdate } from '../common/Common';
import { ISchoolDetail } from '../../../../models/school-detail';
import { ISchoolBranch } from '../../../../models/school-branches';
import MapContainer from '../map/Map';

const { TabPane } = Tabs;
const { Meta } = Card;

interface ISchoolInfoProps {
    data?: ISchoolDetail,
    schoolBranches?: Array<ISchoolBranch>
};

function SchoolInfo(props: ISchoolInfoProps) {
    let { data, schoolBranches } = props;

    // Error loading 
    let [onErrLogo, setErrLogo] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    return (
        <div className="school-info">
            <div className="school-info-header ">
                {/* LogoUrl */}
                <img
                    className="cover-image-profile"
                    src={!onErrCover && data && data.coverUrl ? data.coverUrl : backGround}
                    alt={"base"}
                    onError={() => setErrCover(true)}
                />
                <div className="block-image">
                    <div
                        className="content-avatar"
                    >
                        <Avatar
                            // @ts-ignore
                            src={!onErrLogo && data && data.logoUrl ? data.logoUrl : avatar}
                            style={{
                                height: "8vw",
                                width: "8vw",
                                fontSize: 60,
                                border: 'solid white 4px',
                                zIndex: 1
                            }}
                            // @ts-ignore
                            onError={() => setErrLogo(true)}
                        />
                        <div
                            style={{
                                width: '100%',
                                height: '50%',
                                position: 'absolute',
                                bottom: -1,
                                zIndex: 0,
                                backgroundColor: '#ffffff'
                            }}
                        />
                    </div>
                    <div className={'name-school'}>
                        <div>
                            {data && data.name ? data.name : <NotUpdate />}
                        </div>
                        <div>
                            {data && data.shortName ? `(${data.shortName})` : <NotUpdate />}
                        </div>
                    </div>
                </div>
            </div>
            <Divider />
            <div className="school-info-body">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Giới thiệu" key="1">
                        <Row>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='home' />
                                        }
                                        title="Tên trường"
                                        description={data && data.name ? data.name : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type="schedule" />
                                        }
                                        title="Loại hình đào tạo"
                                        description={data && data.schoolType && data.schoolType.name ? data.schoolType.name : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='mail' />
                                        }
                                        title="Thư điện tử"
                                        description={data && data.email ? data.email : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='global' />
                                        }
                                        title="Trang web "
                                        description={data && data.website ? data.website : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='phone' />
                                        }
                                        title="Số điện thoại"
                                        description={data && data.phone ? data.phone : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={12} lg={12} xl={12} xxl={8}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='team' />
                                        }
                                        title="Quy mô đào tạo"
                                        description={data && data.educatedScale ? data.educatedScale : <NotUpdate />}
                                    />
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type='environment' />
                                        }
                                        title="Định vị"
                                        description={
                                            <>
                                                {"Địa chỉ: " + data.address}
                                                <MapContainer />
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Thông tin chung" key="2">
                        <Row>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card title="Lịch sử phát triển" bordered={false}>
                                    {data && data.historyDesc ? data.historyDesc : <NotUpdate />}
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card title="Chiến lược phát triển" bordered={false}>
                                    {data && data.devStrategyDesc ? data.devStrategyDesc : <NotUpdate />}
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card title="Thành tích" bordered={false}>
                                    {data && data.studyEnvDesc ? data.studyEnvDesc : <NotUpdate />}
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card title="Đội ngũ giảng viên" bordered={false}>
                                    {data && data.lecturersDesc ? data.lecturersDesc : <NotUpdate />}
                                </Card>
                            </Col>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card title="Môi trường đào tạo" bordered={false}>
                                    {data && data.achievementDesc ? data.achievementDesc : <NotUpdate />}
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="Đào tạo" key="3">
                        {/* Back Image */}
                        <Row>
                            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Card bordered={false}>
                                    <Meta
                                        avatar={
                                            <Icon type="experiment" />
                                        }
                                        title="Nhóm ngành đào tạo"
                                        description={
                                            <List
                                                grid={{ gutter: 16, column: 8 }}
                                                dataSource={schoolBranches}
                                                renderItem={item => (
                                                    <List.Item>
                                                        <Card title={item.name} className="a_c">
                                                            <Avatar src={item.imageUrl} icon="experiment" />
                                                        </Card>
                                                    </List.Item>
                                                )}
                                            />
                                        }
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Sự kiện gần đây(Sẽ sớm cập nhật)" key="4" disabled={true}></TabPane>
                </Tabs>
            </div>
        </div >
    )
}


export default (SchoolInfo)
