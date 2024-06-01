// Example component in Next.js
import Image from 'next/image';

const ExampleImage = () => {
  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/avatar-1717279610992-168103303.jpg`;

  return (
    <Image
      src={imageUrl}
      alt="Example"
      width={100}
      height={100}
      layout="responsive"
    />
  );
};

export default ExampleImage;