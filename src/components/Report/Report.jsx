import React from 'react';
import ReportCard from '../ReportCard/ReportCard';
import Workspace from '../Workspace/Workspace';

const Report = () => {
    const data = {
        PENDING: 50,
        'IN-PROGRESS': 152,
        CLOSED: 220,
    };

    return (
        <Workspace title="Report">
            <div className="card-list-container">
                <div className="card-list">
                    {[1, 2, 3].map((i) => (
                        <ReportCard key={i} data={data} />
                    ))}
                </div>
            </div>
        </Workspace>
    );
};

export default Report;
