export const getTitle = (pathname: string, query: { [key: string]: string | string[] | undefined }) => {
  const toUpperCase = (str: string | string[] | undefined) => (typeof str === 'string' ? str.toUpperCase() : str);

  switch (pathname) {
    case '/':
      return 'GameVault';
    case '/games':
      return 'Games';
    case '/about':
      return 'About Me';
    case '/login':
      return 'Login';
    case '/register':
      return 'Register';
    case '/profile':
      return 'Profile';
    case '/dashboard':
      return 'Dashboard';
    case '/platforms/[platformName]/games':
      return query.platformName ? `${toUpperCase(query.platformName)}` : 'Platform Games';
    case '/games/[slug]':
      return query.slug ? `${toUpperCase(query.slug)}` : 'Game';
    default:
      return 'GameVault';
  }
};
