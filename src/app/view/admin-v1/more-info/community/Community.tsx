import React from 'react'
import './Community.scss';
import { Carousel } from 'antd';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';

// @ts-ignore
import NTD1 from '../../../../../assets/image/carousel-app/NTD-1.PNG';
// @ts-ignore
import NTD2 from '../../../../../assets/image/carousel-app/NTD-2.PNG';
// @ts-ignore
import NTD3 from '../../../../../assets/image/carousel-app/NTD-3.PNG';
// @ts-ignore
import NTD4 from '../../../../../assets/image/carousel-app/NTD-4.PNG';
// @ts-ignore
import NTD5 from '../../../../../assets/image/carousel-app/NTD-5.PNG';
// @ts-ignore
import NTD6 from '../../../../../assets/image/carousel-app/NTD-6.PNG';
// @ts-ignore
import NTD7 from '../../../../../assets/image/carousel-app/NTD-7.PNG';

interface ICommunityProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

function Community(props?: ICommunityProps) {
    return (
        < >
            <h5>App Mobile</h5>
            <div className='job-service' >
                <p>
                    Sử dụng app <a
                        href='https://apps.apple.com/us/app/works-vn-tuy%E1%BB%83n-d%E1%BB%A5ng/id1486080602'
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        Employer
                    </a>
                    trên chợ để tận hưởng toàn bộ tiện ích của works.vn
                </p>
                <div>
                    <Carousel
                        autoplay
                    >
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD1}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD2}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD3}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD3}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD4}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD5}
                                    alt="anh1"

                                />
                            </div>
                        </div>
                        <div>
                            <div className='img-inside'>
                                <img
                                    src={NTD6}
                                    alt="anh1"
                                />
                            </div>
                        </div>

                        <div >
                            <div className='img-inside'>
                                <img
                                    src={NTD7}
                                    alt="anh1"
                                />
                            </div>
                        </div>
                    </Carousel>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Community)


