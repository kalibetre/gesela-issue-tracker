import { Outlet } from 'react-router-dom';
import Button from '../Button/Button';
import { ICONS } from '../Common/Icons';
import Header from '../Header/Header';
import LinkButton from '../LinkButton/LinkButton';
import LinkGroup from '../LinkGroup/LinkGroup';
import SideBar from '../SideBar/SideBar';
import './App.css';

function App() {
    return (
        <div className="ap-container">
            <div className="ap-content">
                <div className="ap-sidebar">
                    <SideBar>
                        <div className="ap-new-issue-btn-container">
                            <Button className="btn btn-primary">
                                New Issue
                            </Button>
                        </div>
                        <LinkGroup title="Issues">
                            <LinkButton to="/issues" icon={ICONS.issues} label="All Issues" />
                            <LinkButton to="/notifications" icon={ICONS.notifications} label="Notifications"/>
                            <LinkButton to="/issues/draft" icon={ICONS.draft} label="Draft Issues"/>
                            <LinkButton to="/issues/closed" icon={ICONS.closed} label="Closed Issues"/>
                            <LinkButton to="/issues/archived" icon={ICONS.archived} label="Archived Issues"/>
                        </LinkGroup>
                        <LinkGroup title="Organization">
                            <LinkButton to="/departments" icon={ICONS.departments} label="Departments"/>
                            <LinkButton to="/employees" icon={ICONS.employees} label="Employees"/>
                            <LinkButton to="/customers" icon={ICONS.customers} label="Customers"/>
                        </LinkGroup>
                        <LinkGroup title="Others">
                            <LinkButton to="/help" icon={ICONS.help} label="Help" />
                            <LinkButton to="/about" icon={ICONS.about} label="About"/>
                        </LinkGroup>
                    </SideBar>
                </div>
                <div className='ap-main-container'>
                    <div className="ap-header">
                        <Header title="All Issues">Header</Header>
                    </div>
                    <div className="ap-main">
                        <Outlet />
                    </div>
                </div>
            </div>
            <footer className="ap-footer">
                Gesela &copy; 2023
            </footer>
        </div>
    );
}

export default App;
