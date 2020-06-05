import React from 'react'
import { Button } from 'antd'
export default class ButtonDynamic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invite: 'Tham gia ngay'
        }
        this.interval = null
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            // alert("Chào mừng bạn đến với freetuts.net");
            if (this.state.invite === null) {
                this.setState({ invite: 'Tham gia ngay' })
            } else {
                this.setState({ invite: null })
            }
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    render() {
        return (
            <Button
                type="danger"
                style={{ position: 'absolute', top: 105, right: 25, backgroundColor: '#ff6912', fontWeight: 'bold', minWidth: 122 }}
                onClick={() => {
                    window.open('https://forms.gle/9ihSrQ9bVztRHBjs9')
                }}
            >{this.state.invite}</Button>
        )
    }
}