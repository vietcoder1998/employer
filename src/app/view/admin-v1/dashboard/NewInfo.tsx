import React from 'react'
import { Row, Pagination } from 'antd';
import { Document, Page } from 'react-pdf';
import {pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//@ts-ignore
import FileShow from './../../../../assets/file/program-file.pdf';

interface IProps {
    match: Readonly<any>;
    getTypeManagement: Function;
}

export default function NewInfo(props?: IProps) {
    const [pageIndex, setPageIndex] = React.useState(1)
    return (
        <Row>
            <h5>Thông tin mới</h5>
            <Document
                file={FileShow}
            >
                <Page pageNumber={pageIndex} />
            </Document>
            <div style={{textAlign: "right", marginTop: 10}}>
                <Pagination onChange={(event)=>{setPageIndex(event)}} pageSize={1} total={7} />
            </div>
        </Row>
    )
};