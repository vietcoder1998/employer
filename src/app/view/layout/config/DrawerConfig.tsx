import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'react-redux';
import { IAppState } from '../../../../redux/store/reducer';
import { TYPE } from '../../../../common/const/type';

interface IDrawerConfigProps extends StateProps, DispatchProps {
    open: boolean;
    children?: any;
    title?: any;
    width?: string | number;
    handleDrawer: () => void;
}

interface IDrawerConfigState {

}

class DrawerConfig extends React.PureComponent<IDrawerConfigProps, IDrawerConfigState> {
    render() {
        let {
            open,
            handleDrawer,
            children,
            title,
            width,
        } = this.props;
        return (
            <Drawer
                title={title ? title : "Danh mục"}
                visible={open}
                width={width}
                onClose={() => handleDrawer()}
            >
                {children}
            </Drawer>
        )
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    open: state.MutilBox.open
})
const mapDispatchToProps = (dispatch: any, ownProps) => ({
    handleDrawer: () => dispatch({ type: TYPE.HANDLE }),
})

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(DrawerConfig);
