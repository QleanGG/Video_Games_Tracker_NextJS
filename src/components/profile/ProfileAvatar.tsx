import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import { useUser } from '@/contexts/UserContext';
import styles from '@/styles/styles';

interface ProfileAvatarProps {
    avatarUrl: string;
    size?: number;
  }

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({avatarUrl, size = 100}) => {
  const { user } = useUser();
  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatarUrl}`;

  return (
    <Avatar sx={{...styles.profileAvatar, width:size, height:size }}>
      <div >
        <Image
          src={imageUrl}
          alt={user?.username || 'User'}
          style={{objectFit:"cover"}}
          quality={100}
          width={size}
          height={size}
        />
      </div>
    </Avatar>
  );
};

export default ProfileAvatar;
