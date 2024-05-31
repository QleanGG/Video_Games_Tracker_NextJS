const styles = {
	heroSection: {
		bgcolor: 'primary.main',
		p: 4,
		textAlign: 'center' as const,
		width: '100vw',
		position: 'relative' as const,
		left: '50%',
		right: '50%',
		marginLeft: '-50vw',
		marginRight: '-50vw',
		height: '60vh',
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'url("/hero_gamevault.png")',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundColor: 'rgba(26, 26, 29, 0.85)', // Semi-transparent overlay
		backgroundBlendMode: 'overlay',
	},
	sectionLight: {
		bgcolor: 'background.paper',
		p: 4,
		width: '100vw',
		position: 'relative' as const,
		left: '50%',
		right: '50%',
		marginLeft: '-50vw',
		marginRight: '-50vw',
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sectionDark: {
		bgcolor: 'primary.dark',
		p: 4,
		textAlign: 'center' as const,
		width: '100vw',
		position: 'relative' as const,
		left: '50%',
		right: '50%',
		marginLeft: '-50vw',
		marginRight: '-50vw',
		display: 'flex',
		flexDirection: 'column' as const,
		justifyContent: 'center',
		alignItems: 'center',
	},
	marquee: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap' as const,
		overflow: 'hidden',
		whiteSpace: 'nowrap' as const,
		animation: 'marquee 60s linear infinite', // Slower animation
		'&:hover': {
			animationPlayState: 'paused',
		},
		'@keyframes marquee': {
			'0%': { transform: 'translateX(100)' },
			'100%': { transform: 'translateX(-100%)' },
		},
	},
	card: {
		width: '250px',
		height: '350px', // Adjust the height as needed
		margin: '0 8px', // Add margin to space out the cards
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	truncatedText: {
		overflow: 'hidden',
		display: 'webkitBox',
		webkitLineClamp: 2,
		webkitBoxOrient: 'vertical',
		textOverflow: 'ellipsis',
	},
	featureCard: {
		padding: 4,
		textAlign: 'left' as const,
	},
	footer: {
		bgcolor: 'primary.main',
		color: 'text.primary',
		p: 2,
		mt: 'auto',
		width: '100%',
	},
	formContainer: {
		maxWidth: 400,
		mx: 'auto',
		mt: 5,
		p: 4,
		backgroundColor: 'background.paper',
		borderRadius: 2,
		boxShadow: 3,
		border: '1px solid #e0e0e0',
	},
	formTitle: {
		color: 'primary.main',
		mb: 3,
		fontWeight: 'bold',
		textAlign: 'center' as const,
	},
	formField: {
		'& .MuiInputBase-root': {
			color: 'text.secondary',
			backgroundColor: '#f5f5f5',
			borderRadius: 1,
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#e0e0e0',
			},
			'&:hover fieldset': {
				borderColor: 'primary.main',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'primary.main',
			},
		},
	},
	submitButton: {
		mt: 3,
		py: 1.5,
		backgroundColor: 'primary.main',
		'&:hover': {
			backgroundColor: 'primary.dark',
		},
	},
	profileContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100vh',
		padding: 4,
	},
	profileTitle: {
		marginBottom: 3,
	},
	profileItem: {
		marginBottom: 2,
	},
	profileButton: {
		marginTop: 4,
	},
};

export default styles;
