export const truncateText = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const getInitials = (name) => {
    const parts = name.split(' ');
    return parts[0].charAt(0) + (parts[1] ? parts[1].charAt(0) : '');
};

export const groupByAttribute = (data, attributeName) => {
    if (attributeName == null)
        return { 'ALL': data }
    
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

const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
const DATETIME_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', DATE_OPTIONS);
};

export const getFormattedDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', DATETIME_OPTIONS);
};

export const deleteToken = () => {
    localStorage.removeItem('token');
};

export const saveToken = (response) => {
    const token = response.token;
    localStorage.setItem('token', token);
};

const status_class = {
    DRAFT: 'isu-draft',
    PENDING: 'isu-pending',
    IN_PROGRESS: 'isu-in-progress',
    ARCHIVED: 'isu-archived',
    CLOSED: 'isu-closed',
};

export const getStatusCSSClass = (status) => {
    return status_class[status];
};

export const isPhoneNumberValid = (phoneNumber) => {
    if (!phoneNumber
        || !phoneNumber.startsWith('+251')
        || phoneNumber.length !== 13) return false;
    let rest = phoneNumber.slice(4)
    if (rest.length !== 9 || isNaN(phoneNumber)) return false;
    return true;
}

export const isEmailValid = (email) => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (validRegex.test(email)) return true;
    return false
}
