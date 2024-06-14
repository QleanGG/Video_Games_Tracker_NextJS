import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	Button,
	Box,
	Container,
	IconButton,
	Skeleton,
	Hidden,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import ProfileAvatar from '@/components/profile/ProfileAvatar';
import { useProfile } from '@/hooks/useProfile';
import LoadingNav from './nav/LoadingNav';
import { useGlobalLogout } from '@/utils/authUtils';
import NavLinks from './nav/NavLinks';
import ProfileMenu from './nav/ProfileMenu';
import MobileDrawer from './nav/MobileDrawer';

const Nav = () => {
	const { data: user, isLoading: userLoading } = useUser();
	const { data: profileData, isLoading: profileLoading } = useProfile(!!user);
	const [profileImage, setProfileImage] = useState<string | null>(null);
	const { logout } = useGlobalLogout();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);

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

	const toggleDrawer = (open: boolean) => () => {
		setDrawerOpen(open);
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
							<Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
								<Image
									src="/gameLogo.webp"
									alt="Game Vault Logo"
									width={40}
									height={40}
									priority={true}
								/>
							</Box>
						</Link>
						<Hidden mdDown>
							<NavLinks />
						</Hidden>
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						{profileLoading ? (
							<Skeleton variant="circular" width={40} height={40} />
						) : user ? (
							<>
								<Hidden mdDown>
									<IconButton onClick={handleMenuOpen} sx={{ p: 0, position: 'relative', top: 5 }}>
										<ProfileAvatar avatarUrl={profileImage || ''} size={40} />
									</IconButton>
								</Hidden>
								<ProfileMenu
									anchorEl={anchorEl}
									handleMenuClose={handleMenuClose}
									handleLogout={logout}
								/>
							</>
						) : (
							<Hidden mdDown>
								<>
									<Link href="/login" passHref>
										<Button sx={{ color: 'text.primary' }}>Login</Button>
									</Link>
									<Link href="/register" passHref>
										<Button sx={{ color: 'text.primary' }}>Register</Button>
									</Link>
								</>
							</Hidden>
						)}
						<Hidden mdUp>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								onClick={toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
							<MobileDrawer
								drawerOpen={drawerOpen}
								toggleDrawer={toggleDrawer}
								user={user}
								handleMenuClose={handleMenuClose}
								handleLogout={logout}
							/>
						</Hidden>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Nav;
