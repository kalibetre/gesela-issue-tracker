import { Link, Outlet } from 'react-router-dom';
import Button from '../Button/Button';
import Header from '../Header/Header';
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
                        <div>
                            <Link to="/issues">All Issues</Link>
                            <Link to="/issues/archived">Archived Issues</Link>
                        </div>
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
