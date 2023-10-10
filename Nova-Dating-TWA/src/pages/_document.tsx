import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import React from 'react';

function MyDocument() {
    return (
        <Html>
            <Head>
                <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
                <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default MyDocument;
