export type CultivationRealm = '凡人' | '练气期' | '筑基期' | '筑基级' | '结丹期' | '结丹级' | '元婴期' | '元婴级' | '化神期' | '化神期以上';

export interface CharacterRelation {
  targetId: string;
  targetName: string;
  relation: string;
}

export interface Character {
  id: string;
  name: string;
  aliases: string[];
  imageUrl?: string;
  realm: CultivationRealm;
  affiliation: string;
  description: string;
  personality: string;
  techniques: string[];
  relations: CharacterRelation[];
  firstAppearChapter: string;
  status: 'alive' | 'departed' | 'deceased';
  tags: string[];
  ending: string;
}
