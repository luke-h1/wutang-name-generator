import axios from "axios";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

interface FormValues {
  name: string;
}

const Home: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [wuName, setWuName] = useState<string>("");

  return (
    <div className={styles.container}>
      <Head>
        <title>WU Tang Clan name generator</title>
        <meta name="description" content="Wu-Tang Clan Name Generator" />
      </Head>

      <main className={styles.main}>
        <div className="form">
          {wuName && (
            <p>
              {name}! You will now be known as
              <br />
              <span className="wu-name">{wuName}</span>
            </p>
          )}

          <input
            placeholder="Your name"
            onChange={(e) => {
              setName(e.target.value);
              setWuName("");
            }}
          />

          <button
            onClick={async () => {
              const { data } = await axios.get(`/api/name?name=${name}`);
              setWuName(data.name);
            }}
          >
            Generate name
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
