import React from 'react';
import { Popover, Avatar } from 'antd';
import './CanProProp.scss';
import { IFindCandidate } from '../../../../models/find-candidates';

interface ICanProPop {
    children?: JSX.Element | any;
    data?: IFindCandidate;
    id?: string;
};

export default function CanProPop(props?: ICanProPop): JSX.Element {
    let { children, id, data } = props
    const [loading, setLoading] = React.useState(false);

    const content = () => {
        return (
            <div>
                <Avatar src={data && data.avatarUrl} />
                <div>

                </div>
            </div>
        )
    }

    return (
        <Popover className='can-pro-prop' content={content} title="Ứng viên" trigger="hover">
            <div className='link-to'>
                <a href={id} target='_blank'>
                    {children}
                </a>
            </div>
        </Popover>
    )
}