import { ServerStyleSheets } from "@material-ui/styles";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

/**
 * Due to the SSR nature of Next.js refreshing the page does not pick up useStyles by default (Not an issue if I went with css/SCSS files).
 * This code below fixes that issue
 * https://nextjs.org/docs/advanced-features/custom-document
 * https://www.developerhandbook.com/react/how-to-set-up-nextjs-material-ui/
 */
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>Coding Challenge</title>
          <meta name="description" content="Coding challenge for REA" />
          <link rel="icon" href="/favicon.ico" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          {/* Import material ui default icons and font for quick style wins */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <footer />
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
