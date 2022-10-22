import Head from 'next/head';
import '../styles/globals.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeProvider } from '@mui/material';

function MyApp({ Component, pageProps }) {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>Pastoral App</title>
                <meta name="description" content="Pastoral App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
