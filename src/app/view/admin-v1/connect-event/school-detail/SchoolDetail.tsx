import React, { PureComponent } from 'react'
import './SchoolDetail.scss';
import SchoolInfo from '../../../layout/school-info/SchoolInfo';
import { IAppState } from '../../../../../redux/store/reducer';
import { REDUX_SAGA, REDUX } from '../../../../../const/actions';
import { connect } from 'react-redux';
import { IMapState } from '../../../../../models/mutil-box';
import { ISchoolDetail } from '../../../../../models/school-detail';

interface IState {
    id?: string;
    schoolDetail?: ISchoolDetail
}

interface IProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getSchoolDetail: (id?: string) => any;
    getSchoolBranches: (id?: string) => any;
    setMapState: (mapState?: IMapState) => any;
}

class SchoolDetail extends PureComponent<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            schoolDetail: null,
        }
    }

    static getDerivedStateFromProps(props?: IProps, state?: IState) {
        if (props.match.params.id !== state.id) {
            props.getSchoolDetail(props.match.params.id);
            props.getSchoolBranches(props.match.params.id);

            return {
                id: props.match.params.id
            };
        }

        if (props.schoolDetail && props.schoolDetail !== state.schoolDetail) {
            let {schoolDetail} = props;
            props.setMapState({location: schoolDetail.address, marker: {lat: schoolDetail.lat, lng: schoolDetail.lon}})

            return {schoolDetail}
        }

        return null;
    }

    render() {
        let { schoolDetail, schoolBranches } = this.props;
        return (
            <div>
                <h5>{schoolDetail.name
                    // +  (schoolDetail && schoolDetail.state ?`(${schoolDetail && schoolDetail.state})`:'')
                }</h5>
                <SchoolInfo data={schoolDetail}  schoolBranches={schoolBranches}/>
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    schoolDetail: state.SchoolsDetail,
    schoolBranches: state.SchoolBranches.items,
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getSchoolDetail: (id?: string) => dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_SCHOOL_DETAIL, id }),
    getSchoolBranches: (id?: string) => dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_SCHOOL_BRANCHES, id }),
    setMapState: (mapState?: IMapState) => dispatch({ type: REDUX.MAP.SET_MAP_STATE, mapState }),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;


export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail)
