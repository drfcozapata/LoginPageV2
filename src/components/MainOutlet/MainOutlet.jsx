import { Fragment } from 'react';
import Navbar from '../Navbar/Navbar';
import './MainOutlet.css';

// style={{ width: isOpen ? 'calc(100% - 200px)' : 'calc(100% - 50px)' }}
import { t } from 'i18next';

const MainOutlet = () => {
    return (
        <Fragment>
            <Navbar />
            <div className="content">
                <h1>{t('Home')}</h1>
            </div>
        </Fragment>
    );
};

export default MainOutlet;
