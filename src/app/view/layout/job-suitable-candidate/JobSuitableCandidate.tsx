import React from 'react';
import { Empty, Pagination } from "antd";
import { IJobSuitableCandidate } from "../../../../models/job-suitable-candidate";
import CanSuitableCard from '../can-suitable-card/CanSuitableCard';

interface IProps {
    jobSuitableCandidates?: Array<IJobSuitableCandidate>,
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    onGetCanDetail?: (id?: string) => any;
    onGetListJobSuitableCandidate?: (pagIndex?: number, pageSize?: number) => any;
}

export default function JobSuitableCandidate(props?: IProps) {
    let { jobSuitableCandidates } = props;

    return (
        <div>
            {
                jobSuitableCandidates &&
                    jobSuitableCandidates.length > 0 ?
                    jobSuitableCandidates.map((item?: IJobSuitableCandidate) => (
                        <CanSuitableCard data={item} avatar={item.avatarUrl} id={item.id} key={item.id}>
                            {item.lastName + " " + item.firstName}
                        </CanSuitableCard>

                    )) : <Empty description={"Không tìm thấy ứng viên nào phù hợp"} />
            }
            <Pagination
                pageSize={props.pageSize}
                total={props.totalItems}
                style={{ textAlign: "center" }}
                onChange={(page, pageSize) => {
                    props.onGetListJobSuitableCandidate(page - 1, pageSize);
                    window.scroll(0, 0);
                }
                }
            />
        </div>
    )
}