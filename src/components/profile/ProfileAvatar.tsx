import React from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import styles from '@/styles/styles';

interface ProfileAvatarProps {
    avatarUrl: string;
  }

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({avatarUrl}) => {
  const { user } = useUser();
  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarUrl}`;

  return (
    <Avatar sx={styles.profileAvatar}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Image
          src={imageUrl}
          alt={user?.username || 'User'}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </Avatar>
  );
};

export default ProfileAvatar;
