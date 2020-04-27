import React, { PureComponent } from 'react';
import { Icon, Avatar } from 'antd';
import './JobProperties.scss'
import { convertStringToArray } from '../../../../utils/convertStringToArray';
import { IptLetter } from '../common/Common';
import { weekDays } from '../../../../utils/day';
import { timeConverter } from '../../../../utils/convertTime';

interface IJobPropertiesProps {
    jobDetail?: any;
}

interface IJobPropertiesState { }

export default class JobProperties extends PureComponent<IJobPropertiesProps,IJobPropertiesState> {
    render() {
        let { jobDetail } = this.props;
        let list_des = jobDetail && convertStringToArray(jobDetail.data.description);

        return (
            <div className='job-detail'>
                <div className='detail-job b_b'>
                    <h6>NHÀ TUYỂN DỤNG</h6>
                    <Avatar src={jobDetail && jobDetail.employer.logoUrl} icon="user" style={{ width: 50, height: 50, margin: "20px 0px" }} />
                    <ul>
                        <li className='d_j_t'>
                            <IptLetter value={"Tiêu đề:"} />

                            <label> {jobDetail && jobDetail.data.jobTitle}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <IptLetter value={"Tên công việc: "} />
                            <label> {jobDetail && jobDetail.data.jobName ? jobDetail.data.jobName : "Không có"}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <IptLetter value={"Tên nhà tuyển dụng: "} />
                            <label> {jobDetail && jobDetail.employer.employerName ? jobDetail.employer.employerName : "Không có"}
                            </label>
                        </li>
                    </ul>
                </div>
                <div className='detail-job b_b'>
                    <h6>MÔ TẢ CHUNG</h6>
                    <ul>
                        <li className='d_j_t'>
                            <Icon type="solution" style={{ color: 'blue' }} />
                            <IptLetter value={"Loại công việc:"} />

                            <label> {jobDetail && jobDetail.data.jobType}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <Icon type="calendar" style={{ color: 'green' }} />
                            <IptLetter value={"Ngày đăng: "} />
                            <label> {jobDetail && timeConverter(jobDetail.createdDate, 1000)}
                            </label>
                        </li>
                        <li className='d_j_t'>
                            <Icon type="calendar" style={{ color: 'red' }} />
                            <IptLetter value={"Ngày hết hạn: "} />
                            <label> {jobDetail && timeConverter(jobDetail.data.expirationDate, 1000)}
                            </label>
                        </li>
                    </ul>
                </div>
                {/* Description job */}
                <div className='description-job'>
                    <h6>MÔ TẢ CÔNG VIỆC</h6>
                    {list_des &&
                        list_des !== [] ?
                        list_des.map(
                            item => (<p key={item.index}>
                                {item.value[0] === '+' ||
                                    item.value[0] === '\n' ||
                                    item.value[0] === '-' ||
                                    item.value[0] === '=' ? "" : '-'}
                                {item.value}</p>)) :
                        <p>Vui lòng liên hệ chi tiết với nhà tuyển dụng</p>
                    }
                </div>
                {/* Time */}
                <div className='time-job b_t'>
                    <h6>CA LÀM VIỆC</h6>
                    <div>
                        {jobDetail && jobDetail.data && jobDetail.data.shifts.map((item, index) => {
                            let maxSalary = '' + item.maxSalary && item.maxSalary === 0 ? '' : ('-' + item.maxSalary);
                            return (<div key={index} className='time-content b_b'>
                                <p>
                                    <label> Ca số {index + 1} </label>
                                </p>
                                <p>
                                    <Icon type="clock-circle" style={{ color: 'blue' }} />{' ' + item.startTime + '-' + item.endTime}
                                </p>
                                <p>
                                    <Icon type="dollar" style={{ color: 'rgb(224, 224, 34)' }} />
                                    {item.minSalary ? (<span>{' ' + item.minSalary ? item.minSalary : maxSalary + '/' + item.unit}  </span>) : " Thỏa thuận"}
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
                                            return null
                                        }
                                    })}
                                </div>
                            </div>)
                        })}
                    </div>
                </div>
                {/* Skills job */}
                <div className='skills-job-detail '>
                    <h6>KỸ NĂNG CÔNG VIỆC</h6>
                    <div>
                        {jobDetail &&
                            jobDetail.requiredSkills &&
                            jobDetail.requiredSkills.length > 0 ?
                            jobDetail.requiredSkills.map(
                                (item, index) => (
                                    <label key={index} className='skills-detail'>{item.name}</label>
                                )) : <p>Ứng viên không cần đòi hỏi chuyên môn</p>
                        }
                    </div>
                </div>
            </div >
        )
    }
}
