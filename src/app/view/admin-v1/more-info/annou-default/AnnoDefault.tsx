import React from 'react'
import './AnnoDefault.scss';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { routeLink, routePath } from '../../../../../common/const/break-cumb';

interface IAnnoDefaultProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

function AnnoDefault(props?: IAnnoDefaultProps) {
    return (
        < >
            <h5>Bài viết cho bạn</h5>
            <div className='job-service'>
                Tuyển chọn các bài viết hay cho bạn ở  <Link to={routeLink.ANNOUNCEMENT + routePath.LIST} target='_blank' >Đây</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnoDefault)


