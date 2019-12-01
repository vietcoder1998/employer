import * as moment from 'moment';

export const timeConverter = (value?: any, number?: number, format?: string) => {
    let time;
    let formatTime = "DD/MM/YYYY";
    if (format) {
        formatTime = format
    }

    try {
        
        if (value) {
            if (!number) {
                if (format)
                    time = moment(value, formatTime);
            } else {
                time = moment.unix(value / number).format(formatTime);
            }
            return time;
        }
    } catch (err) {
        return "Sai định dạng";
    }
};

export const momentToUnix = (value) => {
    return moment(value).unix();
}