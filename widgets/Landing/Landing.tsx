import classNames from 'classnames';
import { russoOne, manrope } from '@utils/fonts';
import { LandingHero } from './components/LandingHero';
import { CharterCta } from './components/CharterCta';
import { LandingNews } from './components/LandingNews';
import styles from './Landing.module.scss';

export function Landing() {
  return (
    <main className={classNames(styles.landing, russoOne.variable, manrope.variable)}>
      <LandingHero />
      <CharterCta />
      <LandingNews />
    </main>
  );
}
