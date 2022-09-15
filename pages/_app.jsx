import "../styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Head from "next/head";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Head>
        <title>Desafio ServiceNet</title>
        <meta name="description" content="Desafio ServiceNet" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
