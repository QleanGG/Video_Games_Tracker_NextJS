import React from 'react';
import { Box, Button } from "@mui/material";
import Link from "next/link";


const NavLinks = ({ mobile }: { mobile?: boolean }) => (
	<Box sx={{ ml: 2, display: 'flex', gap: 2 }}>
		<Link href="/" passHref>
			<Button sx={{ color: 'text.primary' }}>Home</Button>
		</Link>
		<Link href="/about" passHref>
			<Button sx={{ color: 'text.primary' }}>About Us</Button>
		</Link>
		<Link href="/games" passHref>
			<Button sx={{ color: 'text.primary' }}>Games</Button>
		</Link>
		<Link href="/platforms" passHref>
			<Button sx={{ color: 'text.primary' }}>Platforms</Button>
		</Link>
	</Box>
);

export default NavLinks;