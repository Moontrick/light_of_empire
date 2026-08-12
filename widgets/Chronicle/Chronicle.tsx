import { chronicleContent } from './content';
import { ChronicleIntroSection } from './components/ChronicleIntroSection';
import { ChronicleTimeline } from './components/ChronicleTimeline';
import styles from './Chronicle.module.scss';

export function Chronicle() {
  const { hero, intro, nodes } = chronicleContent;

  return (
    <div className={styles.root}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>{hero.eyebrow}</span>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.lead}>{hero.intro}</p>
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.introSections}>
          {intro.map((section) => (
            <ChronicleIntroSection key={section.title} section={section} />
          ))}
        </section>

        <ChronicleTimeline nodes={nodes} />
      </main>
    </div>
  );
}
