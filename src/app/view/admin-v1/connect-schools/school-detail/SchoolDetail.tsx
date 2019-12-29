import React, { PureComponent } from 'react'
import './SchoolDetail.scss';
import SchoolInfo from '../../../layout/school-info/SchoolInfo';
import { IAppState } from '../../../../../redux/store/reducer';
import { REDUX_SAGA } from '../../../../../const/actions';
import { connect } from 'react-redux';

interface ISchoolDetailState {
    id?: string;
}

interface ISchoolDetailProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getSchoolDetail: (id?: string) => any;
}

class SchoolDetail extends PureComponent<ISchoolDetailProps, ISchoolDetailState> {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
        }
    }

    static getDerivedStateFromProps(props?: ISchoolDetailProps, state?: ISchoolDetailState) {
        if (props.match.params.id !== state.id) {
            props.getSchoolDetail(props.match.params.id);

            return {
                id: props.match.params.id
            }
        }
        return null;
    }

    render() {
        let { school_detail } = this.props;
        return (
            <div>
                <h5>{school_detail.name + `(${school_detail && school_detail})`}</h5>
                <SchoolInfo data={school_detail} />
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    mapState: state.MutilBox.mapState,
    school_detail: state.SchoolsDetail
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    getSchoolDetail: (id?: string) => dispatch({ type: REDUX_SAGA.CONNECT_SCHOOL.GET_SCHOOL_DETAIL, id })
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;


export default connect(mapStateToProps, mapDispatchToProps)(SchoolDetail)
