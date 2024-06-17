import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="GameVault helps you track your video games, user interactions, and recommendations. Join now to manage your game library and discover new games!" />
          
          <meta property="og:title" content="GameVault - Your Game Tracking Companion" />
          <meta property="og:description" content="GameVault helps you track your video games, user interactions, and recommendations. Join now to manage your game library and discover new games!" />
          <meta property="og:image" content="https://gamevault.live/gameLogo.webp" />
          <meta property="og:url" content="https://gamevault.live" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="GameVault" />
          <meta property="og:locale" content="en_US" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="GameVault - Your Game Tracking Companion" />
          <meta name="twitter:description" content="GameVault helps you track your video games, user interactions, and recommendations. Join now to manage your game library and discover new games!" />
          <meta name="twitter:image" content="https://gamevault.live/gameLogo.webp" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://game-vault-express.onrender.com" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="author" content="Guy Guzman" />
          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
