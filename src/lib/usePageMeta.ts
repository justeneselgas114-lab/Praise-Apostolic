import { useEffect } from 'react';

const SITE_NAME = 'Praise Apostolic Pentecostals';

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === 'Home'
      ? SITE_NAME
      : `${title} | ${SITE_NAME}`;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', description);
      }

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${title} | ${SITE_NAME}`);
      }

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
