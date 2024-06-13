import { Box, Link, Typography } from "@mui/material"
import styles from '../styles/styles';

const Footer = () => {
    return (
        <Box sx={styles.footer}>
            <Typography variant="body2" align="center">
                &copy; 2024 Game Vault. Made by 
                <Link href="https://www.linkedin.com/in/guy-guzman/" target="_blank" rel="noopener noreferrer" sx={styles.footerLink}>Guy Guzman</Link> 
            </Typography>
        </Box>
    )
}

export default Footer;