import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import { APP_NAME, APP_DESCRIPTION } from "@/config";

export default function Document(props) {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='keywords' content='' />
        <meta name='author' content='' />
        <meta name='robots' content='' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:title' content={APP_NAME} />
        <meta property='og:description' content={APP_DESCRIPTION} />
        <meta name='description' content={APP_DESCRIPTION} />
        <title>{APP_NAME}</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
