import React, { Component } from 'react';
import './Promotion.scss';
// @ts-ignore
import PromotionPdf from './../../../../assets/image/promotion.png';

export class Promotion extends Component {
    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        return (
            <div className='promotion'>
                <img
                    style={{ width: '50vw' }}
                    src={PromotionPdf}
                    alt={'Khuyến mãi'}
                />
            </div>
        );
    }
}