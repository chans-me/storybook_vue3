export const camelCaseToKebabCase = (str) => {
    const stringIsAlreadyKebabCase = (/^[a-z\-]+$/).test(str);

    if (stringIsAlreadyKebabCase) {
        return str;
    }

    return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (char, index) => {
        return (index ? '-' : '') + char.toLowerCase()
    })
};
