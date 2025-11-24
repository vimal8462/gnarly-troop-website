import Image from "next/image";
import styles from "@/app/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContent}>
        <div className={styles.leftCol}>
          <div className={styles.logoBox}>
            <Image
              src="/images/logos/logo-2.svg"
              width={350}
              height={180}
              alt="Logo"
            />
          </div>
        </div>

        <div className={styles.rightCol}>
          <ul>
            <li>SUMMIT</li>
            <li>LEADER RESOURCES</li>
            <li>WHO WE ARE</li>
            <li>GIVE</li>
            <li>CAREERS</li>
          </ul>

          <ul>
            <li>CONTACT</li>
            <li>HELP CENTER</li>
            <li>INTERNATIONAL SITE</li>
            <li>SIGN IN</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
