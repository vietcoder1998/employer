import React from 'react';
import { Empty, Pagination, Spin } from "antd";
import { IJobSuitableCandidate } from "../../../../models/job-suitable-candidate";
import CanSuitableCard from '../can-suitable-card/CanSuitableCard';
import Loading from '../loading/Loading';

interface IProps {
    jobSuitableCandidates?: Array<IJobSuitableCandidate>,
    loading?: boolean;
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    onGetCanDetail?: (id?: string) => any;
    onGetListJobSuitableCandidate?: (pagIndex?: number, pageSize?: number) => any;
    profileType?: string;
}

export default function JobSuitableCandidate(props?: IProps) {
    let { jobSuitableCandidates, loading , profileType} = props;

    return (
        <div>
            {
                !loading ?
                (jobSuitableCandidates &&
                    jobSuitableCandidates.length > 0 ?
                    jobSuitableCandidates.map((item?: IJobSuitableCandidate) => (
                        <CanSuitableCard profileType={profileType} data={item} avatar={item.avatarUrl} id={item.id} key={item.id}>
                            {item.lastName + " " + item.firstName}
                        </CanSuitableCard>

                    )) : <Empty style={{padding: 30}} description={"Không tìm thấy ứng viên nào phù hợp"} />): 
                    <div style={{display: 'flex', justifyContent: 'center', minHeight: 80, alignItems: 'center'}}><Spin /></div>
            }
            <Pagination
                pageSize={props.pageSize}
                total={props.totalItems}
                style={{ textAlign: "center" }}
                onChange={(page, pageSize) => {
                    props.onGetListJobSuitableCandidate(page - 1, pageSize);
                    // window.scroll(0, 0);
                    window.location.assign('#scroll')
                }}
            />
        </div>
    )
}