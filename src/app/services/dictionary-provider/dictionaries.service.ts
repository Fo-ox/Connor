import {DictionariesBeArray, DictionariesBeObject, Dictionary, Icon, Transition} from "./dictionaries.models";
import {
    PRIORITY_DICTIONARY,
    STATUS_DICTIONARY,
    STATUS_TRANSITION_DICTIONARY,
    TYPE_DICTIONARY
} from "./status.dictionaries";

export class DictionariesService {
    public static DEFAULT_ICON_NAME = 'd-type-default';
    public static DEFAULT_ICON_COLOR = '#79798B';
    public static DEFAULT_ICON_BACKGROUND_COLOR = '#BABACA';

    public static arrayDictionaries: DictionariesBeArray = {
        type: TYPE_DICTIONARY,
        priority: PRIORITY_DICTIONARY,
        status: STATUS_DICTIONARY,
        transition: STATUS_TRANSITION_DICTIONARY
    };
    public static objectDictionaries: DictionariesBeObject =
        DictionariesService.convertDictionaryArrayToObject(DictionariesService.arrayDictionaries);

    private static convertDictionaryArrayToObject(arrayDictionaries: DictionariesBeArray): DictionariesBeObject {
        const processedDictionary: DictionariesBeObject = {};
        Object.keys(arrayDictionaries).map((dictionaryType: string) => {
            processedDictionary[dictionaryType] = {};
            arrayDictionaries[dictionaryType].forEach((item: Dictionary | Transition) => {
                processedDictionary[dictionaryType][item.key] = item
            })
        })
        return processedDictionary
    }

    // Public methods for components
    public static getIconForTask(type: string, priority: string): Icon {
        return {
            name: DictionariesService.objectDictionaries?.type?.[type]?.icon?.name
                || DictionariesService.DEFAULT_ICON_NAME,
            color: DictionariesService.objectDictionaries?.priority?.[priority]?.icon?.color
                || DictionariesService.DEFAULT_ICON_COLOR,
            backgroundColor: DictionariesService.objectDictionaries?.priority?.[priority]?.icon?.backgroundColor
                || DictionariesService.DEFAULT_ICON_BACKGROUND_COLOR,
        }
    }
}
