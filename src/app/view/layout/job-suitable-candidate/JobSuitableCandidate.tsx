import React from 'react';
import { Empty, Pagination, Spin } from "antd";
import { IJobSuitableCandidate } from "../../../../models/job-suitable-candidate";
import CanSuitableCard from '../can-suitable-card/CanSuitableCard';
// @ts-ignore
import avatar_men from '../../../../assets/image/no-avatar.png';
// @ts-ignore
import avatar_women from '../../../../assets/image/women-no-avatar.jpg';
// import Loading from '../loading/Loading';
import { IFindCandidateDetail } from '../../../../models/find-candidates-detail';
// @ts-ignore
import backGround from '../../../../assets/image/base-image.jpg';

interface IProps {
    jobSuitableCandidates?: Array<IJobSuitableCandidate>,
    loading?: boolean;
    pageIndex?: number;
    pageSize?: number;
    totalItems?: number;
    onGetCanDetail?: (id?: string) => any;
    onGetListJobSuitableCandidate?: (pagIndex?: number, pageSize?: number) => any;
    profileType?: string;
    data?: IFindCandidateDetail
}



export default function JobSuitableCandidate(props?: IProps) {
    let { jobSuitableCandidates, loading , profileType} = props;
    let { data } = props;
    let [avatarUrl, setAvatarUrl] = React.useState(avatar_men);
    let [coverUrl, setcoverUrl] = React.useState(backGround);

    let [onErrAvatar, setErrAvatar] = React.useState(false);
    let [onErrCover, setErrCover] = React.useState(false);

    // if (data && data.avatarUrl !== avatarUrl) {
    //     setAvatarUrl(data.avatarUrl);
    // }
    // console.log(data)
    // if (data && data.coverUrl !== coverUrl) {
    //     setcoverUrl(data.coverUrl);
    // }
    
    return (
        <div>
            {
                !loading ?
                (jobSuitableCandidates &&
                    jobSuitableCandidates.length > 0 ?
                    jobSuitableCandidates.map((item?: IJobSuitableCandidate) => (
                        <CanSuitableCard profileType={profileType} data={item} avatar={!onErrAvatar && item.avatarUrl ? item.avatarUrl : (item.gender === "MALE" ? avatar_men : avatar_women)} id={item.id} key={item.id}>
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