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
    let { listJobService } = props;
    return (
        < >
            <h5>Thông tin gói dịch vụ</h5>
            <div className='job-service'>
                <Divider orientation="left" children={"Gói dịch vụ đặc biệt"} />
                <div>
                    <label className='top'>Gói tuyển dụng gấp: {listJobService.homeTopQuantiy}</label>
                    <label className='in_day'>Gói tuyển dụng trong ngày: {listJobService.homeInDayQuantity}</label>
                    <label className='high_light'>Gói tìm kiếm nổi bật:  {listJobService.searchHighLightQuantity}</label>
                </div>
                <Divider orientation="left" children={"Gói dịch vụ thường"} />
                <div>
                    <label className='unlock'>Số lượt mở khóa ứng viên:  {listJobService.unlockProfileQuantity}</label>
                    <label className='unlock'>Số lượt đăng bài:  {listJobService.nomalQuantity}</label>
                </div>
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    listJobService: state.JobService,
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobService)


