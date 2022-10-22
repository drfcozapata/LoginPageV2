import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
// import Bars from '../../assets/images/bars.svg';
import navBar from '../../config/navBar';
import Logo from '../../assets/images/tp-logo-wh.png';
import './Sidebar.css';
import MainOutlet from '../MainOutlet/MainOutlet';

const SideBar = () => {
    // const [isOpen, setIsOpen] = useState(true);
    // const toggle = () => setIsOpen(!isOpen);

    return (
        <Fragment>
            <div className="container">
                <aside className="sidebar">
                    {/* <aside className="sidebar" style={{ width: isOpen ? '200px' : '50px' }}> */}
                    <div className="top_section">
                        <img
                            src={Logo}
                            alt="Logo Trackingpremium"
                            className="logo"
                            // style={{ display: isOpen ? 'block' : 'none' }}
                        />
                        {/* <div style={{ paddingLeft: isOpen ? '20px' : '13px' }} className="bars">
                            <img src={Bars} onClick={toggle} />
                        </div> */}
                    </div>
                    {navBar.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className="link"
                            // style={{ paddingLeft: isOpen ? '23px' : '18px' }}
                            activeclassName="active">
                            <div className="icon">
                                <item.icon />
                            </div>
                            <div
                                // style={{ display: isOpen ? 'block' : 'none' }}
                                className="link-text">
                                {item.name}
                            </div>
                        </NavLink>
                    ))}
                </aside>
                <main className="main">
                    <MainOutlet />
                </main>
            </div>
        </Fragment>
    );
};

export default SideBar;
