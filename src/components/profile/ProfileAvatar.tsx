import React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';
import styles from '@/styles/styles';

interface ProfileAvatarProps {
  avatarUrl?: string;
  size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ avatarUrl, size = 100 }) => {
  const { data: user } = useUser();
  const imageUrl = avatarUrl
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarUrl}`
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/default_avatar.webp`;

  return (
    <Avatar sx={{ ...styles.profileAvatar, width: size, height: size }}>
      <Image
        src={imageUrl}
        alt={user?.username || 'User'}
        style={{ objectFit: 'cover' }}
        quality={100}
        width={size}
        height={size}
      />
    </Avatar>
  );
};

export default ProfileAvatar;
