export interface Honor {
  id: string;
  title: string;
  issuer: string;
  year: number;
  description: string;
}

export interface SiteStatistics {
  bilibiliSeriesViews: number;
  bilibiliFavorites: number;
  bilibiliRating: number;
  doubanRating: number;
  seasonCount: number;
  totalEpisodes: number;
  yearStart: number;
  duration: string;
  startDate: string;
}
