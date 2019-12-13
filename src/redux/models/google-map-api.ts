export interface IGoogleMapApi {
    html_attributions?: Array<any>,
    result?: {
        address_components?: Array<IAddressComponent>,
        geometry?: {
            location?: {
                lat?: number,
                lng?: number
            },
            location_type?: string,
            viewport?: {
                northeast?: {
                    lat?: number,
                    lng?: number
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
        types?: Array<string>
    }
}

export interface IAddressComponent {
    long_name?: any;
    short_name?: any;
    types?: Array<any>;
}
