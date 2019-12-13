import { noInfoHeader } from '../../services/auth';
import { GET } from '../const/method';
import { _requestToServer } from '../../services/exec';
import { IMapState } from '../../redux/models/mutil-box';
export default function mapConvert(searchText?: string, key_api?: string, components?: string): any {
    let mapState: IMapState = {
        location: null,
        marker: {
            lat: 21.0356398,
            lng: 105.7806001
        }
    };

    try {
        _requestToServer(
            GET,
            `/maps/api/geocode/json`,
            undefined,
            {
                key: key_api,
                components: components ? components : 'VN',
                address: searchText ? searchText : '',
            },
            noInfoHeader,
            `https://maps.googleapis.com`,
            false,
            false,
            false
        ).then((res: any) => {
            console.log(res)
            if (res) {
                let { result } = res.data;
                mapState.location = result.formatted_address;
                mapState.marker = result.geometry.location;
            };
        })

        return mapState;

    } catch (err) {
        throw err;
    }
};