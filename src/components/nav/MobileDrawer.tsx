import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, Box, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import GamepadIcon from '@mui/icons-material/Gamepad';
import DevicesIcon from '@mui/icons-material/Devices';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';

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
					<Link href="/" passHref>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</Link>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<Link href="/about" passHref>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="About Us" />
					</Link>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<Link href="/games" passHref>
						<ListItemIcon>
							<GamepadIcon />
						</ListItemIcon>
						<ListItemText primary="Games" />
					</Link>
				</ListItemButton>
				<ListItemButton onClick={handleMenuClose}>
					<Link href="/platforms" passHref>
						<ListItemIcon>
							<DevicesIcon />
						</ListItemIcon>
						<ListItemText primary="Platforms" />
					</Link>
				</ListItemButton>
				<Divider />
				{user ? (
					<>
						<ListItemButton onClick={handleMenuClose}>
							<Link href="/dashboard" passHref>
								<ListItemIcon>
									<AccountCircleIcon />
								</ListItemIcon>
								<ListItemText primary="Dashboard" />
							</Link>
						</ListItemButton>
						<ListItemButton onClick={handleMenuClose}>
							<Link href="/profile" passHref>
								<ListItemIcon>
									<AccountCircleIcon />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</Link>
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
							<Link href="/login" passHref>
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
								<ListItemText primary="Login" />
							</Link>
						</ListItemButton>
						<ListItemButton onClick={handleMenuClose}>
							<Link href="/register" passHref>
								<ListItemIcon>
									<ExitToAppIcon />
								</ListItemIcon>
								<ListItemText primary="Register" />
							</Link>
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
