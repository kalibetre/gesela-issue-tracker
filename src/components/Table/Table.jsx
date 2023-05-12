import React from 'react';
import './Table.css';

const Table = (props) => {
    const { data } = props;
    let { ignoreAttributes, highlightAttr } = props;

    if (!data.length) {
        return (
            <div className="table">
                <p>No data</p>
            </div>
        );
    }

    if (!ignoreAttributes) ignoreAttributes = {};
    const ignoreKeys = Object.keys(ignoreAttributes);
    const ignoreIndexes = Object.values(ignoreAttributes);

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {Object.keys(data[0]).map((key, index) => {
                        if (ignoreKeys.includes(key)) return null;
                        return <th key={index}>{key}</th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((notification, index) => {
                    return (
                        <tr
                            key={index}
                            className={
                                highlightAttr && notification[highlightAttr]
                                    ? 'row-highlight'
                                    : ''
                            }
                        >
                            {Object.values(notification).map((value, index) => {
                                if (ignoreIndexes.includes(index)) return null;
                                return (
                                    <td
                                        key={index}
                                        onClick={() =>
                                            props.handleRowClick(notification)
                                        }
                                    >
                                        {value}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
