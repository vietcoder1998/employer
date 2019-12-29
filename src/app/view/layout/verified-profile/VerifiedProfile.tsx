import React from "react";
import './VerifiedProfile.scss';
import { IFindCandidateDetail } from "../../../../models/find-candidates-detail";
import { NotUpdate } from "../common/Common";
import { Row, Col, Skeleton } from "antd";

export const VerifiedProfile = (props: any) => {
    let data: IFindCandidateDetail = props.data;
    return (
        <div className='verified-profile'>
            <div className="ic-ct-id">
                <h6>Số chứng minh thư nhân dân:</h6>
                <p style={{ color: "#1890ff" }}>
                    {data && data.identityCard ? data.identityCard : <NotUpdate />}
                </p>
            </div>
            <Row>
                <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                    <div className="ic-ct-img test">
                        <Skeleton avatar loading={data.identityCardBackImageUrl ? false : true} >
                            <img className='ic' src={data.identityCardFrontImageUrl} alt='front description' />
                        </Skeleton>
                    </div>

                </Col>
                <Col xs={24} md={12} lg={12} xl={12} xxl={24} >
                    <div className="ic-ct-img test">
                        <Skeleton avatar loading={data.identityCardBackImageUrl ? false : true} >
                            <img className='ic' src={data.identityCardBackImageUrl} alt='front description' />
                        </Skeleton>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
