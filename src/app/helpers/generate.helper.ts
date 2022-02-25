import { v4 as uuidv4 } from 'uuid';

export class GenerateHelper {
    public static generateUUID(): string {
        return uuidv4();
    }
}
