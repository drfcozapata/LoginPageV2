import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { t } from 'i18next';

const CustomErrorDialog = (props) => {
    // eslint-disable-next-line react/prop-types
    const { title, description, open, handleClose } = props;

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose} autoFocus>
                    {t('Close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomErrorDialog;
