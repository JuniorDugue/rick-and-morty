import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  // console.log("data", data);
  const { info, results: defaultResults = [] } = data;
  const [results, setResults] = useState(defaultResults);
  const [page, setPage] = useState({
    ...info,
    current: defaultEndpoint,
  });

  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      setPage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        setResults(nextData.results);
        return;
      }

      setResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }
    request();
  }, [current]);

  function handleLoadMore(){
    setPage(prev => {
      return {
        ...prev, 
        current: page?.next
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1 className={styles.title}>Wubba Lubba Dub Dub!</h1> */}
        <h1 className={styles.title}>Rick and Morty Wiki</h1>

        {/* <p className={styles.description}>Rick and Morty Wiki</p> */}
        <p className={styles.description}>Wubba Lubba Dub Dub!</p>

        <ul className={styles.grid}>
          {results.map((results) => {
            const { id, name, image } = results;

            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  {/* <Image src={image} width={200} height={200} alt={`${name} thumbnail`}/> */}
                  <img src={image} alt={`${name} thumbnail`} />
                  <h3>{name}</h3>
                </a>
              </li>
            );
          })}
        </ul>
        <p>
          <button onClick={handleLoadMore}>Load More</button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
