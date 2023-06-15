import React from 'react';
import './Icons.css';

export const IssuesIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/issues.svg"
            alt="Issues Icon"
        />
    );
};

export const NotificationsIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/notifications.svg"
            alt="Notifications Icon"
        />
    );
};

export const DraftIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/draft.svg"
            alt="Draft Icon"
        />
    );
};

export const ClosedIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/closed.svg"
            alt="Closed Icon"
        />
    );
};

export const ArchivedIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/archived.svg"
            alt="Archived Icon"
        />
    );
};

export const DepartmentsIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/departments.svg"
            alt="Departments Icon"
        />
    );
};

export const EmployeesIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/employees.svg"
            alt="Employees Icon"
        />
    );
};

export const CustomersIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/customers.svg"
            alt="Customers Icon"
        />
    );
};

export const HelpIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/help.svg"
            alt="Help Icon"
        />
    );
};

export const AboutIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/about.svg"
            alt="About Icon"
        />
    );
};

export const MenuIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/menu.svg"
            alt="Menu Icon"
        />
    );
};

export const SpinnerIcon = () => {
    return <span className="spinner" />;
};

export const PlusIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/plus.svg"
            alt="Plus Icon"
        />
    );
};

export const ErrorIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/error.svg"
            alt="Error Icon"
        />
    );
};

export const ReportIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/piechart.svg"
            alt="Error Icon"
        />
    );
};

export const SubmittedIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/submitted.svg"
            alt="Error Icon"
        />
    );
};

export const CloseIcon = () => {
    return (
        <img
            style={{ width: '100%', height: '100%' }}
            src="/images/close-icon.svg"
            alt="Close Icon"
        />
    );
};

export const ICONS = {
    issues: <IssuesIcon />,
    notifications: <NotificationsIcon />,
    draft: <DraftIcon />,
    closed: <ClosedIcon />,
    archived: <ArchivedIcon />,
    departments: <DepartmentsIcon />,
    employees: <EmployeesIcon />,
    customers: <CustomersIcon />,
    help: <HelpIcon />,
    about: <AboutIcon />,
    menu: <MenuIcon />,
    spinner: <SpinnerIcon />,
    plus: <PlusIcon />,
    error: <ErrorIcon />,
    report: <ReportIcon />,
    submitted: <SubmittedIcon />,
    close: <CloseIcon />,
};
