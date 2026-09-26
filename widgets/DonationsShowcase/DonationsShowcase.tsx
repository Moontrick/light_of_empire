'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { DONATIONS_SECTION_TITLE } from '@/shared/constants';
import { DonationCard } from '@ui/DonationCard';
import { BalanceChip } from '@ui/BalanceChip';
import { SectionHead } from '@ui/SectionHead';
import { DonationFeatured } from './components/DonationFeatured';
import { DonationSteps } from './components/DonationSteps';
import { useDonationsShowcase } from './hooks/useDonationsShowcase';
import {
  SHOWCASE_CATALOG_ROOT,
  SHOWCASE_CATALOG_TITLE,
  SHOWCASE_CRUMB,
  SHOWCASE_CRUMB_ROOT,
  SHOWCASE_EMPTY,
  SHOWCASE_ERROR,
  SHOWCASE_HERO_IMAGE,
  SHOWCASE_INTRO,
  SHOWCASE_LOGIN_SUB,
  SHOWCASE_LOGIN_TITLE,
  SHOWCASE_RETRY,
} from './constants';
import styles from './DonationsShowcase.module.scss';

export function DonationsShowcase() {
  const { featured, rest, loading, error, empty, retry, balance, authPending, guest } =
    useDonationsShowcase();

  return (
    <main className={styles.root}>
      <section className={styles.hero} style={{ backgroundImage: `url(${SHOWCASE_HERO_IMAGE})` }}>
        <div className={styles.fog} />
        <div className={styles.heroInner}>
          <div className={styles.head}>
            <span className={styles.crumbs}>
              <span className={styles.crumbRoot}>{SHOWCASE_CRUMB_ROOT}</span>
              <span className={styles.crumbSep}>/</span>
              <span>{SHOWCASE_CRUMB}</span>
            </span>
            <h1 className={styles.title}>{DONATIONS_SECTION_TITLE}</h1>
            <p className={styles.intro}>{SHOWCASE_INTRO}</p>
          </div>

          <div className={styles.wallet}>
            {guest ? (
              <Link href="/login" className={styles.loginTile}>
                <span className={styles.loginTitle}>{SHOWCASE_LOGIN_TITLE}</span>
                <span className={styles.loginSub}>{SHOWCASE_LOGIN_SUB}</span>
              </Link>
            ) : (
              <BalanceChip balance={balance} pending={authPending} guest={false} />
            )}
          </div>
        </div>
      </section>

      <div className={styles.content}>
        <DonationSteps />

        {loading ? (
          <div className={styles.grid}>
            <Skeleton active paragraph={{ rows: 6 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
            <Skeleton active paragraph={{ rows: 6 }} />
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>{SHOWCASE_ERROR}</p>
            <Button size="large" onClick={() => void retry()}>
              {SHOWCASE_RETRY}
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>{SHOWCASE_EMPTY}</p>
        ) : (
          <>
            {featured && <DonationFeatured item={featured} />}

            <SectionHead eyebrow={SHOWCASE_CATALOG_ROOT} title={SHOWCASE_CATALOG_TITLE} />
            <div className={styles.grid}>
              {rest.map((item) => (
                <DonationCard key={item.id} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
