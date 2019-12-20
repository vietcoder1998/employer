import React from 'react'
import './Guide.scss';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';
import { Divider } from 'antd';

interface IGuildProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

function Guide(props?: IGuildProps) {
    return (
        < >
            <h5>Hướng dẫn sử dụng</h5>
            <div className='guild'>
                <Divider children={"Đổi mật khẩu"} orientation={'left'} />
                <div className='a_c' dangerouslySetInnerHTML={{ __html: '<iframe width="752" height="402" src="https://www.youtube.com/embed/hkqn_Zn3MSQ?list=PLvjKE_gUfl_j0s7156YluPGUeTlz-b8W2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                <Divider children={"Cập nhật hồ sơ nhà tuyển dụng"} orientation={'left'} />
                <div className='a_c' dangerouslySetInnerHTML={{ __html: '<iframe width="752" height="402" src="https://www.youtube.com/embed/hZf0dj8rHFQ?list=PLvjKE_gUfl_j0s7156YluPGUeTlz-b8W2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                <Divider children={"Tạo thêm chi nhánh"} orientation={'left'} />
                <div className='a_c' dangerouslySetInnerHTML={{ __html: '<iframe width="752" height="402" src="https://www.youtube.com/embed/dQLOHMPgFI8?list=PLvjKE_gUfl_j0s7156YluPGUeTlz-b8W2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
                <Divider children={"Đăng bài tuyển dụng"} orientation={'left'} />
                <div className='a_c' dangerouslySetInnerHTML={{ __html: '<iframe width="752" height="402" src="https://www.youtube.com/embed/F8xhmk_OIG8?list=PLvjKE_gUfl_j0s7156YluPGUeTlz-b8W2" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' }} />
            </div>
        </>
    )
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Guide)


