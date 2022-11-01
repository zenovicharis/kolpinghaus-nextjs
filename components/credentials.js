import Link from "next/link";
import styles from "../styles/Credentials.module.scss";

export default function Credentials() {
  return (
    <div className={styles.copyRights}>
      <div>CodingBad &copy; {new Date().getFullYear()}</div>
      <div>
        <Link href="/impressum">
          <span>Impressum</span>
        </Link>
      </div>
    </div>
  );
}
