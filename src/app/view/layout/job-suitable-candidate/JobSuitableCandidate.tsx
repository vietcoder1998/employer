import React from 'react';
import { Empty, Pagination } from "antd";
import { IJobSuitableCandidate } from "../../../../models/job-suitable-candidate";
import CanSuitableCard from '../can-suitable-card/CanSuitableCard';

interface IProps {
    job_suitable_candidates?: Array<IJobSuitableCandidate>,
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    onGetCanDetail?: (id?: string) => any;
    onGetListJobSuitableCandidate?: (pagIndex?: number, pageSize?: number) => any;
}

export default function JobSuitableCandidate(props?: IProps) {
    let { job_suitable_candidates } = props;

    return (
        <div>
            {
                job_suitable_candidates &&
                    job_suitable_candidates.length > 0 ?
                    job_suitable_candidates.map((item?: IJobSuitableCandidate) => (
                        <CanSuitableCard data={item} avatar={item.avatarUrl} id={item.id} key={item.id}>
                            {item.lastName + " " + item.firstName}
                        </CanSuitableCard>

                    )) : <Empty description={"Không tìm thấy ứng viên nào phù hợp"} />
            }
            <Pagination pageSize={props.pageSize} total={props.totalItems} onChange={(page, pageSize) => props.onGetListJobSuitableCandidate(page - 1, pageSize)} />
        </div>
    )
}