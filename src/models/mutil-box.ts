export interface IModalState {
    title?: string,
    open_modal?: boolean,
    children?: any,
    typeModal?: string,
    msg?: any,
}

export interface IDrawerState {
    title?: string,
    msg?: string,
    openDrawer?: boolean,
    type_drawer?: any,
    children?: string,
}

export interface IMapState {
    marker: {
        lat?: number,
        lng?: number,
    },
    location?: string,
}

export interface IMutilBox {
    modalState?: IModalState,
    drawerState?: IDrawerState,
    mapState?: IMapState,
    loading?: boolean,
}
