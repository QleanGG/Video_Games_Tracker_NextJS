import React, { useState } from 'react';
import {
	Box,
	TextField,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Button,
	Collapse,
	IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Genre } from '@/types';

interface GameFiltersProps {
	search: string;
	genre: string;
	genres: Genre[] | undefined;
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onGenreChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GameFilters: React.FC<GameFiltersProps> = ({ search, genre, genres, onSearchChange, onGenreChange }) => {
	const [isGenreOpen, setIsGenreOpen] = useState(false);

	const handleToggleGenre = () => {
		setIsGenreOpen(!isGenreOpen);
	};

	return (
		<Box mb={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
			<TextField
				fullWidth
				label="Search games..."
				value={search}
				onChange={onSearchChange}
				variant="outlined"
				sx={{ mb: 2 }}
			/>

			<FormControl component="fieldset" fullWidth>
				<FormLabel component="legend">Genre</FormLabel>
				<Button onClick={handleToggleGenre}>{isGenreOpen ? 'Hide Genres' : 'Show Genres'}</Button>
				<RadioGroup
					aria-label="genre"
					value={genre}
					onChange={onGenreChange}
					sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
				>
					<FormControlLabel value="" control={<Radio />} label="All Genres" />
					<Collapse in={isGenreOpen} timeout="auto" unmountOnExit>
						{genres?.map((genre) => (
							<FormControlLabel key={genre.id} value={genre.name} control={<Radio />} label={genre.name} />
						))}
					</Collapse>
					<IconButton onClick={handleToggleGenre}>{isGenreOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
				</RadioGroup>
			</FormControl>
		</Box>
	);
};

export default GameFilters;
