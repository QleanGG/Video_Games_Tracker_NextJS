// components/Nav.tsx
import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	Button,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/router';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { logout } from '@/services/authService';
import { useProfile } from '@/hooks/useProfile';

const Nav = () => {
	const { user, setUser, userLoading } = useUser();
	const { data: profileData, isLoading: profileLoading } = useProfile(!!user);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const router = useRouter();
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

	const handleLogout = async () => {
		await logout();
		setUser(null);
		setAnchorEl(null);
		await router.push('/login');
	};

	if (userLoading) {
		return (
			<AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
				<Container maxWidth="lg">
					<Toolbar sx={{ justifyContent: 'space-between' }}>
						<CircularProgress size={24} />
					</Toolbar>
				</Container>
			</AppBar>
		);
	}

	return (
		<AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
			<Container maxWidth="lg">
				<Toolbar sx={{ justifyContent: 'space-between' }}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Link href="/">
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
						<Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
							<Link href="/">
								<Button sx={{ color: 'text.primary' }}>Home</Button>
							</Link>
							<Link href="/games">
								<Button sx={{ color: 'text.primary' }}>Games</Button>
							</Link>
							<Link href="/platforms">
								<Button sx={{ color: 'text.primary' }}>Platforms</Button>
							</Link>
						</Box>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{profileLoading ? (
							<CircularProgress size={24} />
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
										<Link href="/dashboard">
											<Box
												component="a"
												sx={{ textDecoration: 'none', color: '#FBFEF9' }}
											>
												Dashboard
											</Box>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleMenuClose}>
										<Link href="/profile">
											<Box
												component="a"
												sx={{ textDecoration: 'none', color: '#FBFEF9' }}
											>
												Profile
											</Box>
										</Link>
									</MenuItem>
									<MenuItem onClick={handleLogout}>Logout</MenuItem>
								</Menu>
							</>
						) : (
							<>
								<Link href="/login">
									<Button sx={{ color: 'text.primary' }}>Login</Button>
								</Link>
								<Link href="/register">
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

export default Nav;
