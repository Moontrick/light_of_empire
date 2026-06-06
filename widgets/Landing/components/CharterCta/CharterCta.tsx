import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import { DISCORD_URL } from '../../data';
import styles from './CharterCta.module.scss';

export function CharterCta() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <HudCorners />
        <span className={styles.eyebrow}>Документация</span>
        <h2 className={styles.title}>Воинский устав Имперской Армии</h2>
        <p className={styles.text}>
          Структура командования, права и обязанности, дисциплина, специальные службы —
          ИСБ, Инквизиторий и Корпус тёмных штурмовиков. Всё, что должен знать каждый
          военнослужащий Нового Порядка.
        </p>
        <div className={styles.actions}>
          <Link href="/ustav" className={styles.button}>
            Открыть устав
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className={styles.discord}
          >
            Discord
          </a>
        </div>
      </div>
    </section>
  );
}
