import { Pipe, PipeTransform } from '@angular/core';
import { HOURS_IN_DAY } from "../../constants/common.constants";

@Pipe({
    name: 'displayEstimate'
})
export class DisplayEstimatePipe implements PipeTransform {
    transform(value: number): string | null {
        if (typeof +value !== 'number') {
            return null;
        }
        const days = (value - value % HOURS_IN_DAY) / HOURS_IN_DAY;
        const hours = value - days * HOURS_IN_DAY;
        return value ? `${days > 1 ? days + 'd' : ''} ${hours ? hours + 'h' : ''}` : `0h`
    }
}
