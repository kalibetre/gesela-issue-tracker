import React, { useRef } from 'react';
import './Workspace.css';

const Workspace = (props) => {
    const { searchHandler } = props;
    const searchInput = useRef(null);

    const clearSearchInput = () => {
        if (searchInput) {
            searchInput.current.value = '';
            searchHandler('');
        }
    };

    return (
        <section className="wks-main-container">
            <div className="wks-header">
                <h2 className="wks-title">{props.title}</h2>
                {searchHandler && (
                    <div className="wks-search">
                        <div className="wks-search-input-container">
                            <input
                                ref={searchInput}
                                className="wks-search-input"
                                placeholder="search"
                                onChange={(e) => searchHandler(e.target.value)}
                            />
                            <div className="wks-clear-btn-container">
                                <button
                                    className="wks-clear-btn"
                                    onClick={clearSearchInput}
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <main className="wks-main">{props.children}</main>
        </section>
    );
};

export default Workspace;
