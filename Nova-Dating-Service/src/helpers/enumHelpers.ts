export function randomEnum<T extends object>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export function randomEnumExcept<T extends object>(anEnum: T, except: number): T[keyof T] {
    const enumValues = Object.keys(anEnum)
        .map((n) => Number.parseInt(n))
        .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    let randomIndex = Math.floor(Math.random() * enumValues.length);
    while (randomIndex === except) randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex];
}

export function integerEnumKeys(dictionary: any): string[] {
    return Object.keys(dictionary)
        .map((key) => dictionary[key])
        .filter((value) => typeof value === 'string');
}

export function integerEnumValues(dictionary: any): string[] {
    return Object.keys(dictionary)
        .map((key) => dictionary[key])
        .filter((value) => typeof value !== 'string');
}

export function integerEnumDocumentation(title: string, dictionary: any): string {
    let str = '';
    for (const key of integerEnumKeys(dictionary))
        if (dictionary[key] !== undefined) str += '    ' + key + ' = ' + dictionary[key] + ',\n';
    return '``` typescript\nenum ' + title + ' {\n' + str + '}\n\n```\n\n';
}
