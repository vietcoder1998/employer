import React from 'react'
import './Promotion.scss';
import { Divider } from 'antd';
import { IAppState } from '../../../../../redux/store/reducer';
import { connect } from 'react-redux';
// import { Document, Page, pdfjs } from 'react-pdf';
// @ts-ignore
import PromotionPng from '../../../../../assets/image/promotion.png';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${'2.1.266'}/pdf.worker.js`;

interface IPromotionProps extends StateProps, DispatchProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

class Promotion extends React.PureComponent<IPromotionProps> {
    render() {
        return (
            < >
                <h5>Khuyến mãi</h5>
                <div className='promotion'>
                    <Divider orientation="left" children={"Khuyến mãi tết Canh Tý"} />
                    <img src={PromotionPng} style={{ width: '100%'}} alt='promotion' />
                </div>
            </>
        )
    }

}
const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
})

const mapStateToProps = (state: IAppState, ownProps: any) => ({
})

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Promotion)


