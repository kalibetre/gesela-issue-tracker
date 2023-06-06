import React, { Fragment } from 'react';
import PieChart, { CHART_COLORS } from '../PieChart/PieChart';
import './ReportCard.css';

const ReportCard = (props) => {
    return (
        <div className="report-card">
            <div className="report-container">
                <div className="report-stats">
                    <div className="report-subtitle">Department</div>
                    <div className="report-title">Administration</div>
                    <div className="report-data-container">
                        <div className="report-data">
                            {Object.entries(props.data).map(([key, value]) => (
                                <Fragment key={key}>
                                    <div className="report-data-value">
                                        {value}
                                    </div>
                                    <div className="report-data-key">
                                        <span
                                            style={{
                                                backgroundColor:
                                                    CHART_COLORS[key],
                                            }}
                                        ></span>
                                        {key}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="report-chart">
                    <PieChart data={props.data} />
                </div>
            </div>
        </div>
    );
};

export default ReportCard;
