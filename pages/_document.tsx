import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="description"
          content="Get detailed information and statistics for any MuseScore account!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Ryan Zhu" />

        <meta property="og:url" content="https://musestats.github.io" />
        <meta property="og:site_name" content="MuseStats" />
        <meta property="og:title" content="MuseStats" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Get detailed information and statistics for any MuseScore account!"
        />
        <meta property="og:locale" content="en_US" />

        <meta property="og:image" content="/musestats.png" />
        <meta property="og:image:alt" content="MuseStats" />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
