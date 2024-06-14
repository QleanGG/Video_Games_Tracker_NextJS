import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Divider, Typography, Link as MuiLink } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GamepadIcon from '@mui/icons-material/Gamepad';
import DevicesIcon from '@mui/icons-material/Devices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NextLink from 'next/link';

interface MobileDrawerProps {
	drawerOpen: boolean;
	toggleDrawer: (open: boolean) => () => void;
	user: any;
	handleMenuClose: () => void;
	handleLogout: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ drawerOpen, toggleDrawer, user, handleMenuClose, handleLogout }) => (
	<Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
		<Box
			sx={{ width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
		>
			<List>
				<ListItemButton onClick={handleMenuClose}>
					<NextLink href="/" passHref>
						<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</MuiLink>
					</NextLink>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<NextLink href="/about" passHref>
						<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
							<ListItemIcon>
								<InfoIcon />
							</ListItemIcon>
							<ListItemText primary="About Us" />
						</MuiLink>
					</NextLink>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<NextLink href="/games" passHref>
						<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' }  }}>
							<ListItemIcon>
								<GamepadIcon />
							</ListItemIcon>
							<ListItemText primary="Games" />
						</MuiLink>
					</NextLink>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<NextLink href="/platforms" passHref>
						<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
							<ListItemIcon>
								<DevicesIcon />
							</ListItemIcon>
							<ListItemText primary="Platforms" />
						</MuiLink>
					</NextLink>
				</ListItemButton>
				<Divider />
				{user ? (
					<>
						<ListItemButton onClick={handleMenuClose}>
							<NextLink href="/dashboard" passHref>
								<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
									<ListItemIcon>
										<AccountCircleIcon />
									</ListItemIcon>
									<ListItemText primary="Dashboard" />
								</MuiLink>
							</NextLink>
						</ListItemButton>
						<ListItemButton onClick={handleMenuClose}>
							<NextLink href="/profile" passHref>
								<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
									<ListItemIcon>
										<AccountCircleIcon />
									</ListItemIcon>
									<ListItemText primary="Profile" />
								</MuiLink>
							</NextLink>
						</ListItemButton>
						<ListItemButton onClick={() => { handleLogout(); handleMenuClose(); }}>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</ListItemButton>
					</>
				) : (
					<>
						<ListItemButton onClick={handleMenuClose}>
							<NextLink href="/login" passHref>
								<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
									<ListItemIcon>
										<ExitToAppIcon />
									</ListItemIcon>
									<ListItemText primary="Login" />
								</MuiLink>
							</NextLink>
						</ListItemButton>
						<ListItemButton onClick={handleMenuClose}>
							<NextLink href="/register" passHref>
								<MuiLink sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white', '&:hover': { color: 'white' } }}>
									<ListItemIcon>
										<ExitToAppIcon />
									</ListItemIcon>
									<ListItemText primary="Register" />
								</MuiLink>
							</NextLink>
						</ListItemButton>
					</>
				)}
			</List>
			<Box sx={{ p: 2 }}>
				<Typography variant="body2" color="textSecondary" align="center">
					© 2024 GameVault
				</Typography>
			</Box>
		</Box>
	</Drawer>
);

export default MobileDrawer;
