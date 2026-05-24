import type { Honor, SiteStatistics } from '../types';

export const honors: Honor[] = [
  { id: 'h1', title: 'B站9.8高分国漫', issuer: '哔哩哔哩', year: 2024, description: '凡人修仙传在B站获得9.8超高分评价' },
  { id: 'h2', title: '豆瓣8.5分', issuer: '豆瓣', year: 2024, description: '凡人修仙传豆瓣评分8.5' },
  { id: 'h3', title: '年度最受欢迎国漫', issuer: ' bilibili', year: 2023, description: '凡人修仙传获年度最受欢迎国漫称号' },
];

export const siteStatistics: SiteStatistics = {
  bilibiliSeriesViews: 350000000,
  bilibiliFavorites: 8900000,
  bilibiliRating: 9.8,
  doubanRating: 8.5,
  seasonCount: 3,
  totalEpisodes: 96,
  yearStart: 2020,
  duration: '4年连载',
  durationEn: '4 Years Running',
  startDate: '2020-07-25',
  startDateEn: 'Jul 25, 2020',
};
