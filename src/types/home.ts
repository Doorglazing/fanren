export interface Honor {
  id: string;
  title: string;
  titleEn?: string;
  issuer: string;
  issuerEn?: string;
  year: number;
  description: string;
  descriptionEn?: string;
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
  durationEn: string;
  startDate: string;
  startDateEn: string;
}
