import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import './App.css';

function App() {
    return (
        <div className="ap-container">
            <div className="ap-content">
                <div className="ap-sidebar">
                    <SideBar>
                        <p>Menus</p>
                    </SideBar>
                </div>
                <div className='ap-main-container'>
                    <div className="ap-header">
                        <Header title="All Issues">Header</Header>
                    </div>
                    <main className="ap-main">Issues</main>
                </div>
            </div>
            <footer className="ap-footer">
                Gesela &copy; 2023
            </footer>
        </div>
    );
}

export default App;
