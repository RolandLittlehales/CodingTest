import HomeBody from "../components/HomeBody";
import ListingsProvider from "../providers/ListingsProvider";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <ListingsProvider>
      <div className={styles.container}>
        <HomeBody />
      </div>
    </ListingsProvider>
  );
}
