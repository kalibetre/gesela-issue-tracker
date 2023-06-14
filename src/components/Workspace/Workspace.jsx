import React from 'react';
import './Workspace.css';

const Workspace = (props) => {
    const { searchHandler } = props;

    return (
        <section className="wks-main-container">
            <div className="wks-header">
                <h2 className="wks-title">{props.title}</h2>
                {searchHandler && (
                    <div className="wks-search">
                        <div className="wks-search-input-container">
                            <input
                                className="wks-search-input"
                                placeholder="search"
                                onChange={(e) => searchHandler(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </div>
            <main className="wks-main">{props.children}</main>
        </section>
    );
};

export default Workspace;
