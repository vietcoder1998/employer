import { TYPE } from './../../common/const/type';
export const handleDrawer = () => ({
    type: TYPE.HANDLE,
});

export const handleModal = (msg?: string, type_modal?: string, title?: string, children?: any) => ({
    type: TYPE.OPEN,
    title,
    type_modal,
    msg,
    children
})

export const handleMapMarker = ( marker?: any, location?: any) => ({
    type: TYPE.OPEN,
    marker,
    location,
})