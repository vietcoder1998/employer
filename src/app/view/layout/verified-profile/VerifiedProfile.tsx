import React from "react";
import './VerifiedProfile.scss';
import { IFindCandidateDetail } from "../../../../redux/models/find-candidates-detail";
import { NotUpdate } from "../common/Common";

export const VerifiedProfile = (props: any) => {
    let data: IFindCandidateDetail = props.data;

    return (
        <div className='verified-profile'>
            <div className="ic-ct-id">
                <h6>Số chứng minh thư nhân dân:</h6>
                <p style={{color: "#1890ff"}}>
                    {data && data.identityCard ? data.identityCard : <NotUpdate />}
                </p>
            </div>
        </div>
    )
}
