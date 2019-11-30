import React from 'react'
import { Layout, Icon, Avatar, Menu, Breadcrumb, BackTop } from 'antd';
import './CandidateProfile.scss';
import { IFindCandidateDetail } from '../../../../redux/models/find-candidates-detail';

interface ICandidateProfileState {
    show_menu: boolean;
    to_logout: boolean;
    location?: string;
    data_breakcumb?: Array<string>
}

interface ICandidateProfileProps {
    data?: IFindCandidateDetail
}

function CandidateProfile(props: ICandidateProfileProps) {
    return (
        <>
            <div className="candidate-profile">
                <div>
                    
                </div>
            </div>
        </>
    )
}


export default CandidateProfile