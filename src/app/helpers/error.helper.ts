export class ErrorHelper {
    public static errorMap: Map<number, string> = new Map<number, string>([
        [404, 'Not found server operation'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [500, "Token doesn't have permissions to create dashboards"]
    ])
}
