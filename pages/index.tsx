import { Grid, Typography } from "@material-ui/core";
import Head from "next/head";
import Image from "next/image";
import SavedListings from "../components/savedListings";
import styles from "../styles/Home.module.css";

import initData from "../data/initData";
import SearchResults from "../components/SearchResults";

export default function Home() {
  const results = initData.results;

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Challenge</title>
        <meta name="description" content="Coding challenge for REA" />
        <link rel="icon" href="/favicon.ico" />

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

      <main className={styles.main}>
        <h1 className={styles.title}>View All Available Listings</h1>

        <Typography className={styles.description}>
          Look below for a great selection of properties in your area
        </Typography>
        <Grid container>
          <Grid item xs={12} md={8}>
            <SearchResults listings={results} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SavedListings />
          </Grid>
        </Grid>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
