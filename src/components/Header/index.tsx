import { useRouter } from "next/router";
import { SignInButton } from "./SigninButton";

import styles from "./styles.module.scss";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="Logo Ig.news" />

        <nav>
          <ActiveLink activeClassname={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>

          <ActiveLink activeClassname={styles.active} href="/posts">
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
