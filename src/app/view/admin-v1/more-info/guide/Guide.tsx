import React from 'react'
import './Guide.scss';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';

interface IGuildProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

function Guide(props?: IGuildProps) {
    return (
        < >
            <h5>Hướng dẫn</h5>
            <div className='guild'>
                
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


