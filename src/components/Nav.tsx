// components/Nav.tsx
import React, { useState, useEffect } from 'react';
import {AppBar, Toolbar, Button, Box, Container, IconButton, Menu, MenuItem, Skeleton} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { useProfile } from '@/hooks/useProfile';
import LoadingNav from './nav/LoadingNav';
import { useGlobalLogout } from '@/utils/authUtils';

const Nav = () => {
	const { data: user, isLoading: userLoading, refetch } = useUser();
	const { data: profileData, isLoading: profileLoading } = useProfile(!!user);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const { logout } = useGlobalLogout();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	useEffect(() => {
		if (profileData?.profile.avatarUrl) {
			setProfileImage(profileData.profile.avatarUrl);
		}
	}, [profileData]);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	if (userLoading) {
		return <LoadingNav />;
	}

	return (
		<AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
			<Container maxWidth="lg">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Link href="/" passHref>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer',
								}}
							>
								<Image
									src="/gameLogo.webp"
									alt="Game Vault Logo"
									width={40}
									height={40}
									priority={true}
								/>
							</Box>
						</Link>
						<NavLinks />
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{profileLoading ? (
							<Skeleton variant="circular" width={40} height={40} />
						) : user ? (
							<>
								<IconButton
									onClick={handleMenuOpen}
									sx={{
										p: 0,
										position: 'relative',
										top: 5,
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<ProfileAvatar avatarUrl={profileImage || ''} size={40} />
								</IconButton>
								<ProfileMenu
									anchorEl={anchorEl}
									handleMenuClose={handleMenuClose}
									handleLogout={logout}
								/>
							</>
						) : (
							<>
								<Link href="/login" passHref>
									<Button sx={{ color: 'text.primary' }}>Login</Button>
								</Link>
								<Link href="/register" passHref>
									<Button sx={{ color: 'text.primary' }}>Register</Button>
								</Link>
							</>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

const NavLinks = () => (
	<Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
		<Link href="/" passHref>
			<Button sx={{ color: 'text.primary' }}>Home</Button>
		</Link>
		<Link href="/games" passHref>
			<Button sx={{ color: 'text.primary' }}>Games</Button>
		</Link>
		<Link href="/platforms" passHref>
			<Button sx={{ color: 'text.primary' }}>Platforms</Button>
		</Link>
	</Box>
);

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
		<MenuItem onClick={handleLogout}>Logout</MenuItem>
	</Menu>
);

export default Nav;
