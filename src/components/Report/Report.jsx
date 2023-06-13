import React from 'react';
import { useGetStatsQuery } from '../../api/departmentApi';
import ReportCard from '../ReportCard/ReportCard';
import StatusMessage from '../StatusMessage/StatusMessage';
import Workspace from '../Workspace/Workspace';

const Report = () => {
    const { data, isLoading, isError } = useGetStatsQuery();

    return (
        <Workspace title="Report">
            {isLoading || data === undefined ? (
                <StatusMessage loading title="Loading reports ..." />
            ) : isError ? (
                <StatusMessage error title="Error reports ..." />
            ) : (
                <div className="card-list-container">
                    <div className="card-list">
                        {Object.keys(data).map((key, idx) => (
                            <ReportCard
                                key={idx}
                                department={key}
                                data={data[key]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </Workspace>
    );
};

export default Report;
