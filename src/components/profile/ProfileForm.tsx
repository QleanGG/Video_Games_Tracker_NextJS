import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Popover,
  MenuItemProps,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { useUser } from '@/hooks/useUser';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { PlatformName, Platform } from '@/types';
import styles from '@/styles/styles';
import ProfileAvatar from './ProfileAvatar';

interface ProfileFormProps {
  onCancel: () => void;
  avatarUrl: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onCancel, avatarUrl }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformName[]>([]);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [newMainPlatform, setNewMainPlatform] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarUploaded(true);
    }
  };

  const handleMainPlatformChange = (event: SelectChangeEvent<string>) => {
    setNewMainPlatform(event.target.value);
    setOpenConfirmDialog(true);
  };

  const handleConfirmMainPlatform = () => {
    setOpenConfirmDialog(false);
    const formData = new FormData();
    formData.append('mainPlatform', newMainPlatform);
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Main platform updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update main platform.');
      },
    });
  };

  const handleCancelMainPlatformChange = () => {
    setOpenConfirmDialog(false);
    setNewMainPlatform('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmPlatforms = () => {
    handleClose();
    const formData = new FormData();
    formData.append('platforms', JSON.stringify(selectedPlatforms));
    updateProfile(formData, {
      onSuccess: () => {
        toast.success('Platforms updated successfully.');
      },
      onError: () => {
        toast.error('Failed to update platforms.');
      },
    });
  };

  const open = Boolean(anchorEl);

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
      <ProfileAvatar avatarUrl={avatarUrl} />
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
            onChange={handleMainPlatformChange}
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
            onClick={handleClick}
            renderValue={(selected) => (selected as string[]).join(', ')}
          >
            <MenuItem value="" disabled>
              Select Platforms
            </MenuItem>
          </Select>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {Object.values(PlatformName).map((platform) => (
                <MenuItem
                  key={platform}
                  value={platform}
                  onClick={() => {
                    setSelectedPlatforms((prev) =>
                      prev.includes(platform)
                        ? prev.filter((p) => p !== platform)
                        : [...prev, platform]
                    );
                  }}
                  sx={styles.menuItem as MenuItemProps['sx']}
                >
                  <Checkbox checked={selectedPlatforms.indexOf(platform) > -1} size="small" />
                  <ListItemText primary={platform} />
                </MenuItem>
              ))}
              <Button onClick={handleConfirmPlatforms} variant="contained" color="primary" sx={{ mt: 2 }}>
                Confirm
              </Button>
            </Box>
          </Popover>
        </FormControl>
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Avatar
          <input type="file" name="avatar" hidden onChange={handleAvatarUpload} />
        </Button>
        {avatarUploaded && (
          <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
            Avatar uploaded successfully.
          </Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" sx={styles.submitButton} disabled={updating}>
            {updating ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
          </Button>
          <Button type="button" variant="contained" color="secondary" onClick={onCancel} sx={styles.submitButton}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelMainPlatformChange}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Main Platform Change</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description" color='secondary'>
            Are you sure you want to change your main platform to {newMainPlatform}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelMainPlatformChange} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmMainPlatform} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileForm;
