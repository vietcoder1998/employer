export default interface IApiMap {
    address_components?: Array<IAddressComponent>,
    geometry?: {
        location?: {
            lat?: any,
            lng?: any
        },
        location_type?: string,
        viewport?: {
            northeast?: {
                lat?: any,
                lng?: any,
            },
            southwest?: {
                lat?: number,
                lng?: number
            }
        }
    },
    formatted_address?: string;
    place_id?: string,
    plus_code?: {
        compound_code?: string,
        global_code?: string,
    },
}

export interface IAddressComponent {
    long_name?: any;
    short_name?: any;
    types?: Array<any>;
}
