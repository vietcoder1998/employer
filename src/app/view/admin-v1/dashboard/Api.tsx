import React from 'react'
import ErrorBoundaryRoute from '../../../../routes/ErrorBoundaryRoute';
import { Row, Col, Divider, Pagination } from 'antd';
import { Document, Page } from 'react-pdf';
//@ts-ignore
import FileShow from './../../../../assets/file/program-file.pdf';

const Switch = require("react-router-dom").Switch;

interface IProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function Api(props?: IProps) {
    let { path } = props.match;

    const [onDocumentLoadSuccess, setLoad] = React.useState(false);
    const [pageIndex, setPageIndex] = React.useState(1)
    return (
        <Row>
            <h5>Api</h5>
            
        </Row>
    )
};