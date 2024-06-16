
# GameVault Frontend

This is the frontend for GameVault, a comprehensive platform for tracking and managing your video game library. The application is built with React, TypeScript, and Material-UI, and utilizes React Query for data fetching and state management.

## Features

- User authentication with Google OAuth
- Search and filter games by title and genre
- View games by platform
- User game library management (add, edit, delete games)
- User profile management
- Responsive design

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Material-UI**: A popular React UI framework.
- **React Query**: For data fetching and state management.
- **Next.js**: A React framework for server-side rendering and static site generation.
- **React Router**: For routing and navigation.
- **Axios**: For making HTTP requests.
- **React Toastify**: For displaying notifications.
- **Skeletons**: For loading states.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/qleangg/Video_Games_Tracker_NextJS.git
   cd gamevault-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root of your project and add the following variables:

   ```plaintext
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-api-key
   ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3001`.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

### Running Tests

To run tests:

```bash
npm test
# or
yarn test
```

## Project Structure

```plaintext
.
├── components    # Reusable components
├── hooks         # Custom hooks for data fetching and state management
├── pages         # Next.js pages
├── public        # Public assets
├── styles        # Styling (CSS, Mui style, etc.)
├── types         # TypeScript types
├── utils         # Utility functions
├── Api           # axios request to backend
├── services      # Services functions
├── mappings      # Mappings for types
├── README.md
├── .env.local.example
├── .gitignore
├── package.json
├── tsconfig.json
└── next.config.js
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out to the project maintainer at [qleantest@gmail.com](mailto:qleantest@gmail.com).
