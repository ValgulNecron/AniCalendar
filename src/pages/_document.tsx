// Next.js
import {Head, Html, Main, NextScript} from "next/document";

// Modules
import {CssBaseline} from "@nextui-org/react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>{CssBaseline.flush()}</Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
