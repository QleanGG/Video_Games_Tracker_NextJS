import React from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import Link from 'next/link';

interface ProfileMenuProps {
	anchorEl: HTMLElement | null;
	handleMenuClose: () => void;
	handleLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ anchorEl, handleMenuClose, handleLogout }) => (
	<Menu
		anchorEl={anchorEl}
		open={Boolean(anchorEl)}
		onClose={handleMenuClose}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		sx={{ animation: 'fadeIn 0.3s' }}
	>
		<MenuItem onClick={handleMenuClose}>
			<Link href="/dashboard" passHref>
				<Box sx={{ textDecoration: 'none', color: '#FBFEF9' }}>Dashboard</Box>
			</Link>
		</MenuItem>
		<MenuItem onClick={handleMenuClose}>
			<Link href="/profile" passHref>
				<Box sx={{ textDecoration: 'none', color: '#FBFEF9' }}>Profile</Box>
			</Link>
		</MenuItem>
		<MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Logout</MenuItem>
	</Menu>
);

export default ProfileMenu;
