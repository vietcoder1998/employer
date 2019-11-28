export const findIdWithValue = (list_arr_ex?: Array<any>, value?: any, param?: string, typeReturn?: string): any => {
    let result: any;

    if (typeof value === "string" || typeof value === "number") {
        list_arr_ex.forEach((item: any, index: number) => {
            if (item[param] === value) {
                if (typeReturn) {
                    result = item[typeReturn]
                } else result = item.id;
            }
        })
    } else {
        if (value) {
            let list_arr = [];
            value.forEach((element: string | number, index: number) => {
                list_arr_ex.forEach((item: any, index: number) => {
                    if (item[param] === element) {
                        if (typeReturn) {
                            list_arr.push(item[typeReturn])
                        } else list_arr.push(item.id);
                    }
                })
            });

            result = list_arr;
        }
    }

    console.log(result)
    return result;
}