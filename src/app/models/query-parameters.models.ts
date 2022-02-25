import { QueryParametersEnum } from "../constants/query-parameters.constants";

export type QueryParametersEntities = {
    [QueryParametersEnum.QUERY_PARAM_TASK_ID]?: string;
    [QueryParametersEnum.QUERY_PARAM_DASHBOARD_ID]?: string;
    [QueryParametersEnum.QUERY_PARAM_CHAT_ID]?: string;

}
