import { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { requestLogin, cleanAuthState } from '../store/slice/auth';
import CustomErrorDialog from './CustomErrorDialog';

import { t } from 'i18next';

const mapStateToProps = (state) => {
    return {
        access_token: state.auth.access_token,
        companiesUser: state.auth.companiesUser,
        isLoading: state.auth.isLoading,
        error: state.auth.error
    };
};

const ReduxTestPage = (props) => {
    // eslint-disable-next-line react/prop-types
    const { access_token, companiesUser, isLoading, error } = props;
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();

    const errorTitle = t('Authentication failed');

    const onGetCompaniesBtnClick = () => {
        dispatch(
            requestLogin({
                username: 'juan',
                password: 'prueba',
                mainurl: import.meta.env.MAIN_URL
            })
        );
    };

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
    }, [isLoading]);

    useEffect(() => {
        console.log(`companiesUser: ${companiesUser}`);
    }, [companiesUser]);

    useEffect(() => {
        console.log(`access_token: ${access_token}`);
    }, [access_token]);

    useEffect(() => {
        if (error) {
            console.log(`error: ${error}`);
            setIsError(true);
        }
    }, [error]);

    const handleClose = () => {
        dispatch(cleanAuthState());
        setIsError(false);
    };

    return (
        <div>
            {isLoading ? <CircularProgress /> : null}
            <CustomErrorDialog
                title={errorTitle}
                description={error}
                open={isError}
                handleClose={handleClose}
            />
            <Button variant="contained" onClick={onGetCompaniesBtnClick} autoFocus>
                Get Companies
            </Button>
        </div>
    );
};

export default connect(mapStateToProps)(ReduxTestPage);
