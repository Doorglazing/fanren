export type CultivationRealm = '凡人' | '练气期' | '筑基期' | '筑基级' | '结丹期' | '结丹级' | '元婴期' | '元婴级' | '化神期' | '化神期以上';

export interface CharacterRelation {
  targetId: string;
  targetName: string;
  targetNameEn?: string;
  relation: string;
  relationEn?: string;
}

export interface Character {
  id: string;
  name: string;
  nameEn?: string;
  aliases: string[];
  aliasesEn?: string[];
  imageUrl?: string;
  realm: CultivationRealm;
  realmEn?: string;
  affiliation: string;
  affiliationEn?: string;
  description: string;
  descriptionEn?: string;
  personality: string;
  personalityEn?: string;
  techniques: string[];
  techniquesEn?: string[];
  ending: string;
  endingEn?: string;
  relations: CharacterRelation[];
  firstAppearChapter: string;
  firstAppearChapterEn?: string;
  status: 'alive' | 'departed' | 'deceased';
  tags: string[];
}
