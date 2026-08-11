import { LandingHero } from './components/LandingHero';
import { ServerStatus } from './components/ServerStatus';
import { CharterCta } from './components/CharterCta';
import { LandingNews } from './components/LandingNews';
import styles from './Landing.module.scss';

export function Landing() {
  return (
    <main className={styles.landing}>
      <LandingHero />
      <ServerStatus />
      <CharterCta />
      <LandingNews />
    </main>
  );
}
