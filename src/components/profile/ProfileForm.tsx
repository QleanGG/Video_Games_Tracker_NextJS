// components/ProfileForm.tsx
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, CircularProgress, Avatar, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';
import { useUser } from '@/contexts/UserContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { PlatformName, Platform } from '@/types';
import styles from '@/styles/styles';
import ProfileAvatar from './ProfileAvatar';

interface ProfileFormProps {
  onCancel: () => void;
  avatarUrl: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onCancel,avatarUrl }) => {
  const { user } = useUser();
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformName[]>([]);
  const { data, isPending: profilePending } = useProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();

  useEffect(() => {
    if (data && data.profile && Array.isArray(data.profile.platforms)) {
      const platformNames = data.profile.platforms.map((platform: Platform) => platform.name as PlatformName);
      setSelectedPlatforms(platformNames);
    }
  }, [data]);

  const handleUpdateProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('platforms', JSON.stringify(selectedPlatforms));
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Profile updated successfully.');
        onCancel();
      },
      onError: () => {
        toast.error('Failed to update profile.');
      },
    });
  };

  const handlePlatformChange = (event: SelectChangeEvent<PlatformName[]>) => {
    setSelectedPlatforms(event.target.value as PlatformName[]);
  };

  if (profilePending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!data || !data.profile) {
    return null;
  }

  return (
    <Box sx={styles.profileContainer}>
      <ProfileAvatar avatarUrl={avatarUrl}/>
      <Box component="form" onSubmit={handleUpdateProfile} sx={styles.formContainer}>
        <TextField
          label="Bio"
          name="bio"
          fullWidth
          margin="normal"
          defaultValue={data.profile.bio}
          sx={styles.formField}
        />
        <TextField
          label="Favorite Games"
          name="favoriteGames"
          fullWidth
          margin="normal"
          defaultValue={data.profile.favoriteGames}
          sx={styles.formField}
        />
        <TextField
          label="Gamer Tag"
          name="gamerTag"
          fullWidth
          margin="normal"
          defaultValue={data.profile.gamerTag}
          sx={styles.formField}
        />
        <FormControl fullWidth margin="normal" sx={styles.mainPlatformField}>
          <InputLabel>Main Platform</InputLabel>
          <Select
            label="Main Platform"
            name="mainPlatform"
            defaultValue={data.profile.mainPlatform?.name || ''}
            sx={styles.formField}
          >
            {Object.values(PlatformName).map((platform) => (
              <MenuItem key={platform} value={platform} sx={styles.menuItem}>
                {platform}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" sx={styles.formField}>
          <InputLabel>Platforms</InputLabel>
          <Select
            label="Platforms"
            multiple
            value={selectedPlatforms}
            onChange={handlePlatformChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            {Object.values(PlatformName).map((platform) => (
              <MenuItem key={platform} value={platform} sx={styles.menuItem}>
                <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} />
                <ListItemText primary={platform} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Avatar
          <input type="file" name="avatar" hidden />
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={styles.submitButton} disabled={updating}>
            {updating ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
          </Button>
          <Button type="button" variant="contained" color="secondary" onClick={onCancel} sx={styles.submitButton}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileForm;
