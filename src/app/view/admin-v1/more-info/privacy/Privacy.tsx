import React, { CSSProperties } from 'react'
import './Privacy.scss';
import { Icon, Tooltip } from 'antd';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';

interface IPrivacyProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

const bigSize: CSSProperties = {
    width: "100vw",
    height: "100vh",
    zIndex: 1000,
    position: "fixed",
    backgroundColor: 'white',
    right: 0,
    top: 0
}

function Privacy(props?: IPrivacyProps) {
    const useSkale = true;
    const [skale, setSkale] = React.useState(true);
    React.useEffect(() => {
        window.addEventListener("keydown", (event) => {
            if (useSkale) {
                if (event.keyCode === 27) {
                    setSkale(true)
                }

                if (event.keyCode === 115) {
                    setSkale(!skale)
                }
            }
        })

        return () => {
            window.removeEventListener("keydown", () => { })
        }
    })
    return (
        < >
            <h5>
                Điều khoản
            </h5>
            <div
                style={skale ? undefined : bigSize}
            >
                <div>
                    <Tooltip title={skale ? 'Phóng to' : 'Thu nhỏ'}>
                        <Icon
                            type={skale ? "fullscreen" : "fullscreen-exit"}
                            style={{
                                float: "right",
                                fontSize: 20,
                                padding: 20
                            }}
                            onClick={() => setSkale(!skale)}
                        />
                    </Tooltip>
                </div>
                <iframe
                    title='Bản mẫu'
                    className='test'
                    style={{
                        width: '100%',
                        height: '100vh'
                    }}
                    src=' https://works.vn/privacy-policy/'
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(Privacy)


