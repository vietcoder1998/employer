export default function findIdWithValue(list_arr_ex?: Array<any>, value?: any, param?: string): any {
    let result: any;
    if (typeof value === "string") {
        list_arr_ex.forEach((item: any, index: number) => {
            if (item[param] === value) {
                result = item.id;
            }
        })
    } else {
        if (value) {
            let list_arr = [];
            value.forEach((element: string | number, index) => {
                list_arr_ex.forEach((item: any, index: number) => {
                    if (item[param] === element) {
                        list_arr.push(item.id);
                    }
                })
            });

            result = list_arr;
        }
    }

    console.log(result);
    return result;
}