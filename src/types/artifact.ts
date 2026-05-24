export type ArtifactType = '飞剑' | '攻击法宝' | '防御法器' | '储物法器' | '辅助法宝' | '灵兽/灵虫' | '丹药' | '阵法' | '功法秘术' | '灵材' | '符箓' | '傀儡' | '火焰/神雷' | '十大至宝';

export type ArtifactGrade = '凡器' | '法器' | '灵器' | '法宝' | '古宝' | '通天灵宝' | '灵材';

export interface Artifact {
  id: string;
  name: string;
  imageUrl?: string;
  type: ArtifactType;
  grade: ArtifactGrade;
  ownerId: string;
  ownerName: string;
  description: string;
  abilities: string[];
  acquisition: string;
  firstAppearChapter: string;
  notableUsage: string;
}
