import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { requestLogin, cleanAuthState } from '../../store/slice/auth';
// import { handleUserLogin } from '../../store/sagas/auth';
import CustomErrorDialog from '../../components/CustomErrorDialog';

import LogoTP from '../../assets/images/tp-logo.png';
// import  from '@mui/material/Box';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormGroup,
    IconButton,
    InputAdornment,
    OutlinedInput
    // Stack,
    // Alert
} from '@mui/material';
import {
    AccountCircle,
    LockResetSharp,
    LoginSharp,
    Visibility,
    VisibilityOff
} from '@mui/icons-material';
import './LoginPage.css';

import { t } from 'i18next';

const mapStateToProps = (state) => {
    return {
        access_token: state.auth.access_token,
        companiesUser: state.auth.companiesUser,
        isLoading: state.auth.isLoading,
        error: state.auth.error
    };
};

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line react/prop-types
    const { access_token, companiesUser, isLoading, error } = props;
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const errorTitle = t('Authentication failed');

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
    }, [isLoading]);

    useEffect(() => {
        console.log(`companiesUser: ${companiesUser}`);
    }, [companiesUser]);

    useEffect(() => {
        console.log(`access_token: ${access_token}`);
        if (access_token) {
            localStorage.setItem('token', access_token);
            navigate('/home');
        }
    }, [access_token]);

    useEffect(() => {
        if (error) {
            console.log(`error: ${error}`);
            setIsError(true);
        }
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            requestLogin({
                username,
                password,
                mainurl: import.meta.env.MAIN_URL
            })
        );
        console.log(username, password);
        console.log('send dispatch');
        setUsername('');
        setPassword('');

        // dispatch(handleUserLogin());
        // if (loginSuccess) {
        localStorage.setItem('token', access_token);
        navigate('/home');
        // } else {
        //     alert('Datos incorrectos');
        // }
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClose = () => {
        dispatch(cleanAuthState());
        setIsError(false);
    };

    return (
        <div className="login">
            {isLoading ? <CircularProgress /> : null}
            <CustomErrorDialog
                title={errorTitle}
                description={error}
                open={isError}
                handleClose={handleClose}
            />
            <Box
                sx={{
                    width: 400,
                    minHeight: 295,
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
                    color: '#555'
                }}>
                <img
                    src={LogoTP}
                    alt="Logo Trackingpremium"
                    style={{ margin: '20px 0' }}
                    className="login-form__logo"
                />
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormControl variant="standard">
                            <OutlinedInput
                                className="input first-input"
                                id="input-with-icon-adornment"
                                name="username"
                                value={username}
                                placeholder={t('Enter your username')}
                                onBlur={(e) => console.log(e.target.value)}
                                onChange={(e) => setUsername(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                required
                            />
                            {/* <Stack
                                className="stack-user"
                                sx={{
                                    width: '100%',
                                    mt: '-20px'
                                }}>
                                <Alert severity="error">{t('User cannot be empty')}</Alert>
                            </Stack> */}
                        </FormControl>
                        <FormControl variant="standard">
                            <OutlinedInput
                                className="input"
                                type={showPassword ? 'text' : 'password'}
                                id="standard-adornment-password"
                                name="password"
                                value={password}
                                placeholder={t('Enter your password')}
                                onChange={(e) => setPassword(e.target.value)}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <LockResetSharp />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                            sx={{
                                                backgroundColor: '#e8f0fe',
                                                borderRadius: '0',
                                                paddingLeft: '0px',
                                                paddingRight: '0',
                                                marginLeft: '-10px',
                                                marginRight: '1px'
                                            }}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                required
                            />
                            {/* <Stack
                                className="stack-pass"
                                sx={{
                                    width: '100%',
                                    mt: '-20px'
                                }}>
                                <Alert severity="error">{t('Password cannot be empty')}</Alert>
                            </Stack> */}
                        </FormControl>
                        <FormControl>
                            <Link to={'/'} className="login-form__forgot">
                                {t('Forgot your password?')}
                            </Link>
                        </FormControl>
                        <Button
                            className="button-login"
                            variant="contained"
                            endIcon={<LoginSharp />}
                            disableElevation
                            type="submit">
                            {t('Log In')}
                        </Button>
                    </FormGroup>
                </form>
                <p className="login-form__register">
                    {t('You do not have an account?')}
                    <span>
                        <Link to={'/'}> {t('Create an account')}</Link>
                    </span>
                </p>
            </Box>
            <p className="copy">&copy; {new Date().getFullYear()} Trackingpremium</p>
        </div>
    );
};

export default connect(mapStateToProps)(LoginPage);
