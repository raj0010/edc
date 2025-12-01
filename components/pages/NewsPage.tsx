import React from 'react';
import { PageHeader } from '../ui/PageHeader';
import { NewsFeed } from '../ui/NewsFeed';
import { NewsItem } from '../../types';

export const NewsPage = ({ news }: { news: NewsItem[] }) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0F0F0F]">
      <PageHeader title="Newsroom" subtitle="Latest stories, achievements, and announcements from our network." />
      <div className="-mt-12">
        <NewsFeed news={news} />
      </div>
    </div>
  );
};