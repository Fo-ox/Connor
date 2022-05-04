import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayProto'
})
export class ArrayProtoPipe implements PipeTransform {
    transform<T>(original: Array<T>, operator: 'find', path: string, condition: string): T | Array<T> {
        switch (operator) {
            case "find": {
                return original?.find((item) => item[path] === condition);
            }
        }
    }

}
