import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetProfileQuery } from '../../api/userApi';
import withAuth from '../../hoc/withAuth';
import Button from '../Button/Button';
import { ICONS } from '../Common/Icons';
import EditIssueModal from '../EditIssueModal/EditIssueModal';
import Header from '../Header/Header';
import LinkButton from '../LinkButton/LinkButton';
import LinkGroup from '../LinkGroup/LinkGroup';
import SideBar from '../SideBar/SideBar';
import './App.css';

function App() {
    const { data: currentUser } = useGetProfileQuery();
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [newIssueModalOpen, setNewIssueModalOpen] = useState(false);

    const handleToggleSideBar = () => {
        setToggleSideBar(!toggleSideBar);
    };

    const sideBar = (
        <SideBar>
            <div className="ap-new-issue-btn-container">
                {newIssueModalOpen && (
                    <EditIssueModal
                        handleClose={() => setNewIssueModalOpen(false)}
                    />
                )}
                <Button
                    className="btn btn-primary"
                    onClick={() => setNewIssueModalOpen(true)}
                >
                    Create New Issue
                </Button>
            </div>
            <LinkGroup title="Issues">
                {currentUser && currentUser.role === 'ISSUE_HANDLER' && (
                    <LinkButton
                        to="/issues/assigned"
                        icon={ICONS.issues}
                        label="Assigned to Me"
                    />
                )}
                {currentUser && currentUser.role === 'ISSUE_MANAGER' && (
                    <LinkButton
                        to="/issues/submitted"
                        icon={ICONS.issues}
                        label="Submitted Issues"
                    />
                )}
                <LinkButton
                    to="/issues"
                    icon={ICONS.issues}
                    label="All Issues"
                />
                <LinkButton
                    to="/notifications"
                    icon={ICONS.notifications}
                    label="Notifications"
                />
                <LinkButton
                    to="/issues/draft"
                    icon={ICONS.draft}
                    label="Draft Issues"
                />
                <LinkButton
                    to="/issues/closed"
                    icon={ICONS.closed}
                    label="Closed Issues"
                />
                <LinkButton
                    to="/issues/archived"
                    icon={ICONS.archived}
                    label="Archived Issues"
                />
            </LinkGroup>
            <LinkGroup title="Organization">
                <LinkButton
                    to="/departments"
                    icon={ICONS.departments}
                    label="Departments"
                />
                <LinkButton
                    to="/employees"
                    icon={ICONS.employees}
                    label="Employees"
                />
                {currentUser && currentUser.role === 'ADMIN' && (
                    <LinkButton
                        to="/customers"
                        icon={ICONS.customers}
                        label="Customers"
                    />
                )}
            </LinkGroup>
            <LinkGroup title="Others">
                <LinkButton to="/help" icon={ICONS.help} label="Help" />
                <LinkButton to="/about" icon={ICONS.about} label="About" />
            </LinkGroup>
        </SideBar>
    );

    return (
        <div className="ap-container">
            <div className="ap-content">
                <div className="ap-sidebar">{sideBar}</div>
                <div className="ap-main-container">
                    <div className="ap-header">
                        <button
                            className="ap-menu-toggle"
                            onClick={handleToggleSideBar}
                        >
                            {ICONS.menu}
                        </button>
                        {toggleSideBar && (
                            <div
                                className="ap-overlay"
                                onClick={handleToggleSideBar}
                            >
                                <div className="ap-sidebar-floating">
                                    {currentUser && sideBar}
                                </div>
                            </div>
                        )}
                        <Header />
                    </div>
                    <div className="ap-main">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer className="ap-footer">Gesela &copy; 2023</footer>
        </div>
    );
}

export default withAuth(App);
