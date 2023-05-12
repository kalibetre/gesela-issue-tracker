export const truncateText = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const groupByAttribute = (data, attributeName) => {
    const groups = {};
    for (const issue of data) {
        const attributeValue = issue[attributeName];
        if (!groups[attributeValue]) {
            groups[attributeValue] = [];
        }
        groups[attributeValue].push(issue);
    }
    return groups;
};

export const filterByAttribute = (data, attribute, value) => {
    return data.filter((issue) => issue[attribute] === value);
};
