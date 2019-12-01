import React from "react";
import './VerifiedProfile.scss';
import {  Row, Col } from "antd";
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
            <Row>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                    <div className="ic-ct-img">
                        <h6>Ảnh mặt trước</h6>
                        <div>
                            {data && data.identityCardFrontImageUrl ?
                                <img className="ic" src={data && data.identityCardFrontImageUrl} alt="Ảnh trước" /> :
                                <NotUpdate msg={"Chưa có ảnh mặt trước"} />
                            }
                        </div>
                    </div>

                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
                    <div className="ic-ct-img">
                        <h6>Ảnh mặt sau</h6>
                        <div>
                            {data && data.identityCardBackImageUrl ?
                                <img className="ic" src={data && data.identityCardBackImageUrl} alt="Ảnh sau" /> :
                                <NotUpdate msg={"Chưa có ảnh mặt sau"} />
                            }
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    )
}
