import React from 'react';
import { Icon, Avatar, Row, Col } from 'antd';
import './JobDetail.scss'
import { convertStringToArray } from '../../../../utils/convertStringToArray';
import { IptLetter, NotUpdate, JobType } from '../common/Common';
import { weekDays } from '../../../../utils/day';
import { timeConverter } from '../../../../utils/convertTime';
import { ISkill } from '../../../../models/skills';
import { IJobName } from '../../../../models/job-type';
import IJobDetail from '../../../../models/job-detail';
import { IShift } from '../../../../models/announcements';
import findIdWithValue from '../../../../utils/findIdWithValue';
import { convertSalary } from '../../../../utils/convertNumber'
interface IJobDetailProps {
    listSkills?: Array<ISkill>,
    jid?: string,
    listJobNames?: Array<IJobName>
    jobDetail?: IJobDetail;
    ns?: boolean;

}

export const _checkGender = (data) => {
    if (data.gender) {
        switch (data.gender) {
            case "BOTH":
                return (
                    <div>
                        <p>
                            <label style={{ marginBottom: 0, marginRight: 3 }}>
                                <Icon type="man" style={{ color: "rgb(21, 148, 255)" }} />
                                Nam &{" "}
                            </label>
                            <label style={{ marginBottom: 0, marginRight: 5 }}>
                                <Icon type="woman" style={{ color: "#ff395c" }} />
                                Nữ{" "}
                            </label>
                        </p>
                        <p>
                            Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
                        </p>
                        {/* <p>Số lượng nhận: {data.quantity}</p> */}
                    </div>
                );
            case "MALE":
                return (
                    <div>
                        <p>
                            <label style={{ marginBottom: 0 }}>
                                <Icon type="man" style={{ color: "#168ECD" }} />
                            </label>{" "}
                            Nam -
                <label style={{ marginLeft: 5, marginBottom: 0 }}>
                                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
                            </label>
                        </p>

                        {/* <p>Số lượng nhận: {data.quantity}</p> */}
                    </div>
                );
            case "FEMALE":
                return (
                    <div>
                        <p>
                            <label style={{ marginBottom: 0 }}>
                                <Icon type="woman" style={{ color: "#ff395c" }} />
                            </label>{" "}
                            Nữ -
                <label style={{ marginLeft: 5, marginBottom: 0 }}>
                                Số lượt đã ứng tuyển: {data.applied}/{data.quantity}
                            </label>
                        </p>
                    </div>
                );
            default:
                return <NotUpdate />;
        }
    }
};
export default function JobDetail(props: IJobDetailProps) {
    let { jobDetail } = props;
    let list_des = jobDetail && convertStringToArray(jobDetail.description);
    let allSkills = [];
    
    if (jobDetail.type !== 'pendingJob') {
        allSkills = props.jobDetail.requiredSkills.map((item) => item.name);
    } else {
        if (props.jobDetail && props.jobDetail.requiredSkills && props.listSkills) {
            allSkills = props.jobDetail.requiredSkills.map(item => (findIdWithValue(props.listSkills, item, "id", "name")));
        }
    }
    console.log(allSkills)

    return (
        <>
            <div className='job-detail test'>
                <div className='detail-job-general b_b'>
                    <div className="jobTitle">{jobDetail && jobDetail.jobTitle}</div>
                    <Row>
                        <Col xs={4} sm={8} md={4} lg={3} xl={4} className="a_c">
                            <Avatar src={jobDetail && jobDetail.employerUrl} icon="user" shape={'square'} size={70} />
                            <JobType>{jobDetail && jobDetail.jobType}</JobType>
                        </Col>
                        <Col xs={20} sm={12} md={16} lg={17} xl={20}>
                            <div className="d_j_t">
                                <Icon type="home" style={{ color: "#168ECD" }} />
                                <label>
                                    <div
                                        style={{ fontSize: "1.05em", fontWeight: 450 }}
                                    >
                                        {jobDetail && jobDetail.employerName}
                                    </div>
                                </label>
                            </div>
                            <div className="d_j_t">
                                <Icon
                                    type="environment-o"
                                    style={{ color: "#168ECD" }}
                                />
                                <label>
                                    {/* <IptLetter value={"Nơi đăng: "} /> */}
                                    <span>{jobDetail && jobDetail.employerBranch}</span>
                                </label>
                            </div>
                            <div className="d_j_t">
                                {/* <i class="fa fa-newspaper-o" aria-hidden="true" style={{color: '#168ECD', marginRight: 11, fontSize: '0.9em'}}></i> */}
                                {/* <i class="fa fa-briefcase" aria-hidden="true" style={{color: '#168ECD', marginRight: 11, fontSize: '0.9em'}}></i> */}
                                <Icon type="form" style={{ color: "#168ECD" }} />
                                <label>
                                    {/* <IptLetter value={"Nơi đăng: "} /> */}
                                    <span>{jobDetail && jobDetail.jobName}</span>
                                </label>
                            </div>
                        </Col>
                    </Row>

                    {/* <ul>
                        <li className='d_j_t'>
                            <IptLetter value={"Tên công việc: "} />
                            <label>
                                {jobDetail && jobDetail.jobName ? jobDetail.jobName : "Không có"}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <IptLetter value={"Tên nhà tuyển dụng: "} />
                            <label>
                                {jobDetail && jobDetail.employerName ? jobDetail.employerName : "Không có"}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <IptLetter value={"Tên chi nhánh: "} />
                            <label>
                                {jobDetail && jobDetail.employerBranch ? jobDetail.employerBranch : "Không có"}
                            </label>
                        </li>
                    </ul> */}
                </div>
                <div className='detail-job-general b_b'>
                    <h6>Mô tả chung</h6>
                    <ul>
                        {/* <li className='d_j_t'>
                            <IptLetter value={"Loại công việc:"} />
                            <label>
                                {
                                    jobDetail &&
                                        jobDetail.jobType ?
                                        jobDetail.jobType
                                        : <NotUpdate />
                                }
                            </label>
                        </li> */}
                        <li className='d_j_t'>
                            <IptLetter value={"Ngày đăng: "} />
                            <label> {jobDetail && timeConverter(jobDetail.createdDate, 1000)}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <IptLetter value={"Ngày hết hạn: "} />
                            <label> {jobDetail && timeConverter(jobDetail.expriratedDate, 1000)}
                            </label>
                        </li>
                        {jobDetail && jobDetail.repliedDate ?
                            <li className='d_j_t'>
                                <IptLetter value={"Phản hồi cuối: "} />
                                <label> {jobDetail && jobDetail.repliedDate !== -1 ? timeConverter(jobDetail.repliedDate, 1000) : "Chưa có phản hồi"}
                                </label>
                            </li> : null}
                    </ul>
                </div>
                {/* Description job */}
                <div className='description-job'>
                    <h6>Mô tả công việc</h6>
                    {list_des &&
                        list_des !== [] ?
                        list_des.map(
                            (item: any) => (<p key={item.index}>
                                {item.value[0] === '+' || item.value[0] === '\n' ||
                                    item.value[0] === '-' || item.value[0] === '=' ? "" : '-'}
                                {item.value}</p>)) :
                        <p>Vui lòng liên hệ chi tiết với nhà tuyển dụng</p>
                    }
                </div>
                {/* Time */}
                <div className='time-job b_t'>
                    <h6>Ca làm việc</h6>
                    <div className='job-view-detail'>
                        {/* {
                            jobDetail &&
                            jobDetail.shifts &&
                            jobDetail.shifts.map((item: IShift, index: number) => {
                                let maxSalary = '' + item.maxSalary && item.maxSalary === 0 ? '' : ('-' + item.maxSalary);
                                return (<div key={index} className='time-content b_b'>
                                    <p>
                                        <label> Ca số {index + 1} </label>
                                    </p>
                                    <p>
                                        <Icon type="clock-circle"
                                            style={{ color: 'blue', marginTop: -5 }} />
                                        {item.startTime && item.endTime ? ' ' + item.startTime + '-' + item.endTime : "Không có"}
                                    </p>
                                    <p>
                                        <Icon type="dollar" style={{ color: 'rgb(224, 224, 34)' }} />
                                        {item.minSalary && item.maxSalary ? (<span>{' ' + item.minSalary ? item.minSalary : maxSalary + '/' + item.unit}  </span>) : "Thỏa thuận"}
                                    </p>
                                    <div className='week-day'>
                                        {weekDays.map((itemWeek, index) => {
                                            if (item[itemWeek] === true) {
                                                let day = 'T' + (index + 2);
                                                if (index === 6) {
                                                    day = 'CN'
                                                }

                                                return (<label key={index} className='time-span'>
                                                    {day}
                                                </label>)
                                            }
                                            return ''
                                        })}
                                    </div>
                                </div>)
                            })
                        } */}
                        {jobDetail.shifts && jobDetail.shifts ? jobDetail.shifts.map((item?: IShift, index?: any) => {
                            return (
                                <Row>
                                    <Col key={index} xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                                        <div className='time-content' style={{ border: '1px solid rgb(119, 197, 255)', borderRadius: '3px' }}>
                                            <p style={{ color: 'black', fontSize: '1.1em', borderBottom: '1px solid rgb(119, 197, 255)', paddingBottom: 5, paddingLeft: '15px', backgroundColor: 'rgb(226, 242, 254)', margin: '0', paddingTop: 5 }}>
                                                Ca số {index + 1}
                                            </p>
                                            {jobDetail.jobType !== 'INTERNSHIP' ? 
                                            <p><Icon type="clock-circle" style={{ color: '#168ECD' }} />{' ' + item.startTime + '-' + item.endTime}</p> : null }
                                            <p><Icon type="dollar" style={{ color: '#168ECD' }} />
                                                {convertSalary(item.minSalary, item.maxSalary, item.unit)}
                                            </p>

                                            <div className='week-day'>
                                                {weekDays.map((itemWeek, index) => {
                                                    if (item[itemWeek] === true) {
                                                        let day = 'T' + (index + 2);
                                                        if (index === 6) {
                                                            day = 'CN'
                                                        }
                                                        return (<label key={index} className='time-span'>
                                                            {day}
                                                        </label>)
                                                    }
                                                    else {
                                                        let day = 'T' + (index + 2);
                                                        if (index === 6) {
                                                            day = 'CN'
                                                        }
                                                        return (<label key={index} className='time-span-unselected'>
                                                            {day}
                                                        </label>)
                                                    }
                                                })}
                                            </div>
                                            {item.genderRequireds[0] ? _checkGender(item.genderRequireds[0]) : null}
                                            {item.genderRequireds[1] && !item.genderRequireds[0] ? _checkGender(item.genderRequireds[1]) : null}
                                        </div>
                                    </Col>
                                    <Col key={index} xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                                </Row>)
                        }) : null}
                    </div>
                </div>
                {/* Skills job */}
                <div className='skills-job-detail '>
                    <h6>Kỹ năng công việc</h6>
                    <div>
                        {allSkills.length > 0 ? allSkills.map(
                                (item, index) => { return <label key={index} className='skills-detail'>{item}</label> })
                            : <p>Ứng viên không đòi hỏi kỹ năng khác</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}