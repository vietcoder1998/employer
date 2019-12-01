import React, { CSSProperties } from "react";
import { Icon } from "antd";


export const VerifiedProfile = (props: any) => {
    let { children } = props;
    let { style } = props;


    const tlcfStyle: CSSProperties = {
        position: "relative",
        minHeight: "30px",
        paddingBottom: "10px",
        margin: "0px 0px 0px 10px !important",
    }

    const dtStyle: CSSProperties = {
        position: "absolute",
        left: 5,
        top: 0,
        zIndex: 1,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: `solid ${props.color ? props.color : "gray"} 2px`,
        backgroundColor: "white"
    }

    const lStyle: CSSProperties = {
        position: "absolute",
        left: 9,
        top: 0,
        zIndex: 0,
        borderLeft: "2px solid #e8e8e8",
        height: "100%",
    }

    const cttlStyle: CSSProperties = {
        paddingLeft: 30,
        fontStyle: props.reserve ? "italic" : null
    }

    return (
        <li className="time-line-config-item" style={tlcfStyle}>
            {!props.reserve ?
                <>
                    <div className="dot-time-line-config" style={dtStyle} />
                    <div className="line-time-line-config" style={lStyle} />
                </>
                :
                <div style={{ margin: "0px 5px", position: "absolute" }}>
                    <Icon type="loading" style={{ color: props.color, fontSize: 12, marginBottom: -5 }} />
                </div>
            }
            <div className="time-line-config-content" style={cttlStyle}>
                {children ? children : "Không có nội dung"}
            </div>
        </li>
    )
}
