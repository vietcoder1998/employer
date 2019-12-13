import React from 'react'
import './JobService.scss';
import { Divider } from 'antd';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';

interface IJobServiceProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

function JobService(props?: IJobServiceProps) {
    let { list_job_service } = props;
    return (
        < >
            <h5>Thông tin gói dịch vụ</h5>
            <div className='job-service'>
                <Divider orientation="left" children={"Gói dịch vụ đặc biệt"} />
                <div>
                    <label className='top'>Gói tuyển dụng gấp: {list_job_service.homeTopQuantiy}</label>
                    <label className='in_day'>Gói tuyển dụng trong ngày: {list_job_service.homeInDayQuantity}</label>
                    <label className='high_light'>Gói tìm kiếm nổi bật:  {list_job_service.searchHighLightQuantity}</label>
                </div>
                <Divider orientation="left" children={"Gói dịch vụ thường"} />
                <div>
                    <label className='unlock'>Số lượt mở khóa ứng viên:  {list_job_service.unlockProfileQuantity}</label>
                    <label className='unlock'>Số lượt đăng bài:  {list_job_service.nomalQuantity}</label>
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    list_job_service: state.JobService,
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobService)


