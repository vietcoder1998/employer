import React from 'react'
// import { Icon } from 'antd';
// @ts-ignore
// import CatGif from './../../../../assets/image/cat-chocolate.gif';
// import CatGif from './../../../../assets/image/rainbow-cat-gif-7.gif';
// import Barloading from './../../../../assets/image/bar-loading.gif';
import Barloading from './../../../../assets/image/new-bar-loading.gif';



export default function Loading(props: any) {
    return (
        <div
            className="loading-content"
            style={{
                width: "100%",
                height: "100%",
                padding: "30% 0%",
                textAlign: "center",
            }}
        >
            {/* <h4 className='a_c'
            >
                Đang tải trang
                </h4> */}
            <div className='a_c'>
                {/* <p className=' a_c'>
                    <Icon type="loading-3-quarters" style={{ color: "blue", padding: "5px" }} spin />
                    loaddddddddddddding...
                    </p> */}
                <img src={Barloading}
                    style={{
                        width: "8%",
                        height: "10%",
                    }}
                    alt="gif"
                />
            </div>
        </div>
    )
}