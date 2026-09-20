'use client';

import { Button, ConfigProvider, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { CreditsAmount } from '@ui/CreditsAmount';
import { ImageGallery } from '@ui/ImageGallery';
import { NewsContent } from '@ui/NewsContent';
import { PurchasePanel } from './components/PurchasePanel';
import { useDonationArticle } from './hooks/useDonationArticle';
import type { DonationArticleProps } from './types';
import styles from './DonationArticle.module.scss';

export function DonationArticle({ idParam }: DonationArticleProps) {
  const { donation, loading, notFound, error, retry, refresh } = useDonationArticle(idParam);

  if (loading) {
    return (
      <main className={styles.root}>
        <div className={styles.layout}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <span className={styles.notFoundEyebrow}>The Light of Empire</span>
          <h1 className={styles.notFoundTitle}>Не удалось загрузить товар</h1>
          <p className={styles.notFoundText}>Проверьте соединение и попробуйте ещё раз.</p>
          <div className={styles.notFoundActions}>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
            <Link href="/donations" className={styles.notFoundButton}>
              Все товары
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !donation) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <span className={styles.notFoundEyebrow}>The Light of Empire</span>
          <h1 className={styles.notFoundTitle}>Товар не найден</h1>
          <p className={styles.notFoundText}>
            Похоже, этот товар снят с витрины или его никогда не было.
          </p>
          <Link href="/donations" className={styles.notFoundButton}>
            Все товары
          </Link>
        </div>
      </main>
    );
  }

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <main className={styles.root}>
        <div className={styles.layout}>
          <Link href="/donations" className={styles.back}>
            <span aria-hidden>←</span> Все товары
          </Link>

          <div className={styles.top}>
            <div className={styles.gallery}>
              <ImageGallery images={donation.images} alt={donation.title} />
            </div>
            <aside className={styles.side}>
              <h1 className={styles.title}>{donation.title}</h1>
              <div className={styles.price}>
                <CreditsAmount value={donation.price} size="lg" />
              </div>
              <PurchasePanel donation={donation} onUnavailable={refresh} />
            </aside>
          </div>

          {donation.body.length > 0 && (
            <article className={styles.article}>
              <NewsContent blocks={donation.body} />
            </article>
          )}
        </div>
      </main>
    </ConfigProvider>
  );
}
