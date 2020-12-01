import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";

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
  const { results = [] } = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Wubba Lubba Dub Dub!</h1>

        <p className={styles.description}>Rick and Morty Wiki</p>

        <ul className={styles.grid}>
          {results.map((results) => {
            const { id, name, image } = results;

            return (
              <li key={id} className={styles.card}>
                <a href="https://nextjs.org/docs">
                  {/* <Image src={image} width={200} height={200} alt={`${name} thumbnail`}/> */}
                  <img src={image} alt={`${name} thumbnail`}/>
                  <h3>{ name }</h3>
                </a>
              </li>
            );
          })}

        </ul>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
