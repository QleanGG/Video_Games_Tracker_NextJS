import { Box, Typography } from "@mui/material"
import styles from '../styles/styles';

const Footer = () => {
    return (
        <Box sx={styles.footer}>
            <Typography variant="body2" align="center">
                &copy; 2024 Game Vault. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer;