import type { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'han-li', name: '韩立', nameEn: 'Han Li', aliases: ['韩跑跑', '韩老魔'], aliasesEn: ['Runner Han', 'Old Demon Han'], realm: '化神期', realmEn: 'Deity Transformation',
    imageUrl: '/images/characters/hanli.webp',
    affiliation: '落云宗', affiliationEn: 'Fallen Cloud Sect', description: '本是山村少年，因机缘踏入修仙界。性格谨慎隐忍，杀伐果断，重情重义。凭借掌天瓶和坚韧意志，从凡人一步步修炼至化神期，最终飞升灵界。', descriptionEn: 'Originally a village boy who entered the cultivation world by chance. Cautious and patient, decisive in combat, loyal and righteous. Relying on the Heaven-Opening Bottle and unwavering will, he cultivated step by step from a mortal to Deity Transformation, eventually ascending to the Spirit Realm.',
    personality: '谨慎隐忍、杀伐果断、重情重义', personalityEn: 'Cautious & patient, decisive in combat, loyal & righteous',
    techniques: ['青竹蜂云剑', '辟邪神雷', '大衍诀', '梵圣真魔功'], techniquesEn: ['Azure Bee Cloud Swords', 'Evil-Repelling Divine Thunder', 'Dayan Arts', 'Brahma Sage True Demonic Art'], relations: [
      { targetId: 'nangong-wan', targetName: '南宫婉', targetNameEn: 'Nangong Wan', relation: '道侣', relationEn: 'Dao Companion' },
      { targetId: 'yin-yue', targetName: '银月', targetNameEn: 'Yin Yue', relation: '器灵/挚友', relationEn: 'Artifact Spirit / Close Friend' },
    ], firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1', status: 'alive', tags: ['主角阵营', '落云宗'], ending: '成功飞升灵界，与南宫婉重逢', endingEn: 'Successfully ascended to the Spirit Realm, reunited with Nangong Wan',
  },
  {
    id: 'nangong-wan', name: '南宫婉', nameEn: 'Nangong Wan', aliases: ['南宫仙子'], aliasesEn: ['Fairy Nangong'], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/nangong-wan.webp',
    affiliation: '掩月宗', affiliationEn: 'Moon Covering Sect', description: '掩月宗天骄，韩立道侣。清冷高贵，外冷内热，对韩立深情专一。', descriptionEn: 'A genius of the Moon Covering Sect and Han Li\'s Dao Companion. Aloof and noble on the outside, warm and devoted on the inside, deeply and exclusively in love with Han Li.',
    personality: '清冷高贵、深情专一、外冷内热', personalityEn: 'Aloof & noble, devoted & exclusive, cold outside warm inside',
    techniques: ['素女轮回诀'], techniquesEn: ['Maiden Reincarnation Art'], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '道侣', relationEn: 'Dao Companion' },
    ], firstAppearChapter: '血色禁地篇', firstAppearChapterEn: 'Blood-Colored Forbidden Land Arc', status: 'alive', tags: ['主角阵营', '越国七派'], ending: '与韩立重逢，共同飞升', endingEn: 'Reunited with Han Li, ascended together',
  },
  {
    id: 'yin-yue', name: '银月', nameEn: 'Yin Yue', aliases: ['银月仙子'], aliasesEn: ['Fairy Silver Moon'], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/yinyue.webp',
    affiliation: '灵界银月狼族', affiliationEn: 'Spirit Realm Silver Moon Wolf Clan', description: '韩立本命法宝器灵，实为灵界银月狼族公主。聪慧冷静，忠心耿耿，多次在关键时刻帮助韩立。', descriptionEn: 'The artifact spirit of Han Li\'s life-bound treasure, actually the princess of the Spirit Realm\'s Silver Moon Wolf Clan. Wise and calm, utterly loyal, helping Han Li at crucial moments many times.',
    personality: '聪慧冷静、忠心耿耿', personalityEn: 'Wise & calm, utterly loyal',
    techniques: ['银月神识'], techniquesEn: ['Silver Moon Divine Sense'], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '器灵/挚友', relationEn: 'Artifact Spirit / Close Friend' },
    ], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['主角阵营'], ending: '恢复本体，回归灵界', endingEn: 'Recovered her true form, returned to the Spirit Realm',
  },
  {
    id: 'li-feyu', name: '厉飞雨', nameEn: 'Li Feiyu', aliases: [], aliasesEn: [], realm: '凡人', realmEn: 'Mortal',
    affiliation: '七玄门', affiliationEn: 'Seven Mysteries Sect', description: '韩立在七玄门时唯一的好友，豪爽重义。最终因无法踏入修仙界而老去。', descriptionEn: "Han Li's only good friend at the Seven Mysteries Sect, bold and loyal. Eventually grew old as he couldn't enter the cultivation world.",
    personality: '豪爽重义', personalityEn: 'Bold & loyal',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '挚友', relationEn: 'Close Friend' },
    ], firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1', status: 'departed', tags: ['早期人脉', '七玄门'], ending: '凡人终老', endingEn: 'Lived out his life as a mortal',
  },
  {
    id: 'zhang-tie', name: '张铁', nameEn: 'Zhang Tie', aliases: [], aliasesEn: [], realm: '凡人', realmEn: 'Mortal',
    affiliation: '七玄门', affiliationEn: 'Seven Mysteries Sect', description: '韩立同门师兄弟，憨厚老实。被墨大夫选为修炼炉鼎，最终悲惨死去。', descriptionEn: "Han Li's fellow disciple, honest and simple. Selected by Doctor Mo as a cultivation vessel, dying tragically.",
    personality: '憨厚老实', personalityEn: 'Honest & simple',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '同门', relationEn: 'Fellow Disciple' },
      { targetId: 'mo-daifu', targetName: '墨居仁', targetNameEn: 'Mo Juren', relation: '被害', relationEn: 'Victim' },
    ], firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1', status: 'deceased', tags: ['早期人脉', '七玄门'], ending: '被墨大夫害死', endingEn: 'Killed by Doctor Mo',
  },
  {
    id: 'mo-daifu', name: '墨居仁', nameEn: 'Mo Juren', aliases: ['墨大夫'], aliasesEn: ['Doctor Mo'], realm: '筑基期', realmEn: 'Foundation Establishment',
    imageUrl: '/images/characters/modaifu.svg',
    affiliation: '七玄门神手谷', affiliationEn: 'Divine Hand Valley, Seven Mysteries Sect', description: '韩立修仙启蒙之人，表面慈祥实则心机深沉，企图夺舍韩立。', descriptionEn: "Han Li's cultivation mentor, seemingly kind but deeply scheming, attempted to possess Han Li's body.",
    personality: '心机深沉、伪装极深', personalityEn: 'Deeply scheming, master of disguise',
    techniques: ['夺舍秘术', '傀儡术'], techniquesEn: ['Possession Secret Art', 'Puppetry'], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '师徒/仇敌', relationEn: 'Master-Disciple / Enemy' },
    ], firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1', status: 'deceased', tags: ['早期人脉', '七玄门'], ending: '夺舍失败，被韩立反杀', endingEn: 'Possession failed, killed by Han Li',
  },
  {
    id: 'mo-caihuan', name: '墨彩环', nameEn: 'Mo Caihuan', aliases: [], aliasesEn: [], realm: '凡人', realmEn: 'Mortal',
    affiliation: '七玄门', affiliationEn: 'Seven Mysteries Sect', description: '墨大夫之女，温柔善良，对韩立情有独钟。', descriptionEn: "Doctor Mo's daughter, gentle and kind, harbored special feelings for Han Li.",
    personality: '温柔善良、真挚单纯', personalityEn: 'Gentle & kind, sincere & innocent',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '暗恋韩立', relationEn: 'Secretly in love with Han Li' },
    ], firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1', status: 'departed', tags: ['早期人脉', '七玄门'], ending: '凡人终老', endingEn: 'Lived out her life as a mortal',
  },
  {
    id: 'qu-hun', name: '曲魂', nameEn: 'Qu Hun', aliases: [], aliasesEn: [], realm: '结丹期', realmEn: 'Core Formation',
    affiliation: '韩立炼尸', affiliationEn: "Han Li's Refined Corpse", description: '韩立所炼制的天绝尸，原为张铁之身。', descriptionEn: 'The Heavenly Absolute Corpse refined by Han Li, originally the body of Zhang Tie.',
    personality: '无自主意识', personalityEn: 'No autonomous consciousness',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '炼尸', relationEn: 'Refined Corpse' },
    ], firstAppearChapter: '人界篇早期', firstAppearChapterEn: 'Early Human Realm Arc', status: 'departed', tags: ['主角阵营'], ending: '在天绝地损毁', endingEn: 'Destroyed at the Heavenly Absolute Land',
  },
  {
    id: 'li-huayuan', name: '李化元', nameEn: 'Li Huayuan', aliases: [], aliasesEn: [], realm: '结丹期', realmEn: 'Core Formation',
    affiliation: '黄枫谷', affiliationEn: 'Yellow Maple Valley', description: '韩立在黄枫谷的师父，小气市侩但重情守诺。', descriptionEn: "Han Li's master at Yellow Maple Valley, stingy and worldly but loyal and true to his word.",
    personality: '小气市侩但重情守诺、忠心护短', personalityEn: 'Stingy & worldly but loyal & trustworthy, protective',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '师徒', relationEn: 'Master-Disciple' },
    ], firstAppearChapter: '黄枫谷篇', firstAppearChapterEn: 'Yellow Maple Valley Arc', status: 'deceased', tags: ['越国七派'], ending: '在魔道入侵中陨落', endingEn: 'Fell in the Demonic Invasion',
  },
  {
    id: 'chen-qiaoqian', name: '陈巧倩', nameEn: 'Chen Qiaoqian', aliases: [], aliasesEn: [], realm: '筑基期', realmEn: 'Foundation Establishment',
    imageUrl: '/images/characters/chenqiaoqian.svg',
    affiliation: '黄枫谷', affiliationEn: 'Yellow Maple Valley', description: '黄枫谷女修，温柔清冷，内敛长情。', descriptionEn: 'A female cultivator of Yellow Maple Valley, gentle and reserved, with deep long-lasting feelings.',
    personality: '温柔清冷、内敛长情', personalityEn: 'Gentle & reserved, deep & long-lasting in love',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '同门', relationEn: 'Fellow Disciple' },
    ], firstAppearChapter: '黄枫谷篇', firstAppearChapterEn: 'Yellow Maple Valley Arc', status: 'alive', tags: ['越国七派'], ending: '留在天南', endingEn: 'Remained in Tiannan',
  },
  {
    id: 'xin-ruyin', name: '辛如音', nameEn: 'Xin Ruyin', aliases: [], aliasesEn: [], realm: '练气期', realmEn: 'Qi Condensation',
    affiliation: '修仙家族', affiliationEn: 'Cultivation Family', description: '温柔聪慧，沉静淡雅，看淡生死。', descriptionEn: 'Gentle and wise, calm and elegant, taking life and death lightly.',
    personality: '温柔聪慧、沉静淡雅', personalityEn: 'Gentle & wise, calm & elegant',
    techniques: ['阵法'], techniquesEn: ['Formations'], relations: [], firstAppearChapter: '越国篇', firstAppearChapterEn: 'Yue State Arc', status: 'deceased', tags: ['越国七派'], ending: '病逝', endingEn: 'Died of illness',
  },
  {
    id: 'wang-chan', name: '王蝉', nameEn: 'Wang Chan', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/wangchan.svg',
    affiliation: '鬼灵门', affiliationEn: 'Ghost Spirit Sect', description: '魔道天才修士，阴毒狂傲，心机深沉。', descriptionEn: 'A demonic path genius cultivator, venomous and arrogant, deeply scheming.',
    personality: '阴毒狂傲、心机深沉', personalityEn: 'Venomous & arrogant, deeply scheming',
    techniques: ['鬼灵门秘术'], techniquesEn: ['Ghost Spirit Sect Secret Art'], relations: [], firstAppearChapter: '越国篇', firstAppearChapterEn: 'Yue State Arc', status: 'deceased', tags: ['魔道六宗'], ending: '被韩立斩杀', endingEn: 'Slain by Han Li',
  },
  {
    id: 'zi-ling', name: '紫灵', nameEn: 'Zi Ling', aliases: ['紫灵仙子'], aliasesEn: ['Fairy Zi Ling'], realm: '结丹期', realmEn: 'Core Formation',
    imageUrl: '/images/characters/ziling.webp',
    affiliation: '乱星海散修', affiliationEn: 'Scattered Star Sea Rogue Cultivator', description: '乱星海第一美人，聪慧果敢，高贵冷艳，独立骄傲。', descriptionEn: 'The most beautiful woman in the Scattered Star Sea, wise and courageous, noble and aloof, independent and proud.',
    personality: '聪慧果敢、高贵冷艳', personalityEn: 'Wise & courageous, noble & aloof',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '知己', relationEn: 'Confidante' },
    ], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['乱星海'], ending: '留在乱星海', endingEn: 'Remained in the Scattered Star Sea',
  },
  {
    id: 'yuan-yao', name: '元瑶', nameEn: 'Yuan Yao', aliases: ['瑶儿'], aliasesEn: ['Yao\'er'], realm: '结丹期', realmEn: 'Core Formation',
    imageUrl: '/images/characters/yuanyao.webp',
    affiliation: '散修', affiliationEn: 'Rogue Cultivator', description: '温柔坚韧、重情重义。', descriptionEn: 'Gentle yet resilient, loyal and righteous.',
    personality: '温柔坚韧、重情重义', personalityEn: 'Gentle & resilient, loyal & righteous',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['乱星海'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'mei-ning', name: '梅凝', nameEn: 'Mei Ning', aliases: ['凝儿'], aliasesEn: ['Ning\'er'], realm: '筑基期', realmEn: 'Foundation Establishment',
    imageUrl: '/images/characters/mei-ning.webp',
    affiliation: '乱星海散修', affiliationEn: 'Scattered Star Sea Rogue Cultivator', description: '温婉柔弱，单纯善良。', descriptionEn: 'Gentle and frail, innocent and kind.',
    personality: '温婉柔弱、单纯善良', personalityEn: 'Gentle & frail, innocent & kind',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['乱星海'], ending: '随韩立同行', endingEn: 'Traveled with Han Li',
  },
  {
    id: 'ling-yuling', name: '凌玉灵', nameEn: 'Ling Yuling', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    affiliation: '星宫', affiliationEn: 'Star Palace', description: '星宫之人，干练沉稳，有恩必报。', descriptionEn: 'A member of the Star Palace, capable and composed, repays all favors.',
    personality: '干练沉稳、有恩必报', personalityEn: 'Capable & composed, repays all favors',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['乱星海'], ending: '执掌星宫', endingEn: 'Took charge of the Star Palace',
  },
  {
    id: 'feng-xi', name: '风希', nameEn: 'Feng Xi', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    affiliation: '妖族', affiliationEn: 'Demon Race', description: '妖修，霸道强横。', descriptionEn: 'A demon cultivator, domineering and tyrannical.',
    personality: '霸道强横', personalityEn: 'Domineering & tyrannical',
    techniques: ['风属性神通'], techniquesEn: ['Wind Attribute Divine Ability'], relations: [], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'alive', tags: ['乱星海'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'jinyin-laozu', name: '极阴老祖', nameEn: 'Patriarch Jiyin', aliases: ['极阴', '极阴祖师'], aliasesEn: ['Jiyin', 'Ancestor Jiyin'], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/jinyin.webp',
    affiliation: '极阴岛', affiliationEn: 'Extreme Yin Island', description: '霸道狠辣，老谋深算。', descriptionEn: 'Domineering and ruthless, deeply scheming.',
    personality: '霸道狠辣、老谋深算', personalityEn: 'Domineering & ruthless, deeply scheming',
    techniques: ['极阴神光'], techniquesEn: ['Extreme Yin Divine Light'], relations: [], firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc', status: 'deceased', tags: ['乱星海'], ending: '在虚天殿陨落', endingEn: 'Fell at the Void Heaven Temple',
  },
  {
    id: 'mu-peiling', name: '慕沛灵', nameEn: 'Mu Peiling', aliases: ['沛灵'], aliasesEn: ['Peiling'], realm: '筑基期', realmEn: 'Foundation Establishment',
    imageUrl: '/images/characters/mu-peiling.webp',
    affiliation: '落云宗', affiliationEn: 'Fallen Cloud Sect', description: '温婉秀丽，聪慧沉静。', descriptionEn: 'Gentle and beautiful, wise and serene.',
    personality: '温婉秀丽、聪慧沉静', personalityEn: 'Gentle & beautiful, wise & serene',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['落云宗'], ending: '随韩立同行', endingEn: 'Traveled with Han Li',
  },
  {
    id: 'song-yu', name: '宋玉', nameEn: 'Song Yu', aliases: [], aliasesEn: [], realm: '筑基期', realmEn: 'Foundation Establishment',
    imageUrl: '/images/characters/song-yu.webp',
    affiliation: '落云宗', affiliationEn: 'Fallen Cloud Sect', description: '端庄秀丽，温和细腻。', descriptionEn: 'Dignified and beautiful, gentle and delicate.',
    personality: '端庄秀丽、温和细腻、谨慎克制', personalityEn: 'Dignified & beautiful, gentle & delicate, cautious & restrained',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['落云宗'], ending: '留在落云宗', endingEn: 'Remained at Fallen Cloud Sect',
  },
  {
    id: 'xiang-zhili', name: '向之礼', nameEn: 'Xiang Zhili', aliases: [], aliasesEn: [], realm: '化神期', realmEn: 'Deity Transformation',
    affiliation: '天南散修', affiliationEn: 'Tiannan Rogue Cultivator', description: '天南化神期散修，洒脱诙谐，城府极深。', descriptionEn: 'A Deity Transformation rogue cultivator of Tiannan, free-spirited and humorous, with deep scheming.',
    personality: '洒脱诙谐、城府极深', personalityEn: 'Free-spirited & humorous, deeply scheming',
    techniques: [], relations: [], firstAppearChapter: '天南篇', firstAppearChapterEn: 'Tiannan Arc', status: 'alive', tags: ['大晋'], ending: '飞升灵界', endingEn: 'Ascended to the Spirit Realm',
  },
  {
    id: 'hu-laomo', name: '呼老魔', nameEn: 'Hu Laomo', aliases: [], aliasesEn: [], realm: '化神期', realmEn: 'Deity Transformation',
    affiliation: '大晋魔道', affiliationEn: 'Great Jin Demonic Path', description: '大晋魔道巨擘，暴虐凶残。', descriptionEn: 'A giant of the Great Jin Demonic Path, brutal and vicious.',
    personality: '暴虐凶残、嗜血阴狠', personalityEn: 'Brutal & vicious, bloodthirsty & sinister',
    techniques: ['魔道秘术'], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'deceased', tags: ['大晋'], ending: '被韩立击杀', endingEn: 'Killed by Han Li',
  },
  {
    id: 'tianlan-shengnv', name: '天澜圣女', nameEn: 'Tianlan Holy Maiden', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    affiliation: '天澜草原', affiliationEn: 'Tianlan Plains', description: '天澜草原领袖，领袖气度。', descriptionEn: 'Leader of the Tianlan Plains, with commanding presence.',
    personality: '领袖气度', personalityEn: 'Commanding presence',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['天澜草原'], ending: '继续统领天澜草原', endingEn: 'Continued ruling the Tianlan Plains',
  },
  {
    id: 'nan-longhou', name: '南陇侯', nameEn: 'Nan Longhou', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    affiliation: '大晋正道', affiliationEn: 'Great Jin Orthodox Path', description: '儒雅从容，城府极深。', descriptionEn: 'Refined and composed, deeply scheming.',
    personality: '儒雅从容、城府极深、老谋深算', personalityEn: 'Refined & composed, deeply scheming',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['大晋'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'dayan', name: '大衍神君', nameEn: 'Divine Lord Dayan', aliases: ['大衍'], aliasesEn: ['Dayan'], realm: '化神期以上', realmEn: 'Beyond Deity Transformation',
    imageUrl: '/images/characters/dayan.svg',
    affiliation: '大衍神君', affiliationEn: 'Divine Lord Dayan', description: '上古修士残魂，寄居于大衍诀中。指点韩立修炼，亦师亦友。', descriptionEn: 'The remnant soul of an ancient cultivator residing within the Dayan Arts. Guided Han Li in cultivation, serving as both mentor and friend.',
    personality: '博学多识、亦师亦友', personalityEn: 'Knowledgeable, mentor and friend',
    techniques: ['大衍诀', '傀儡术'], techniquesEn: ['Dayan Arts', 'Puppetry'], relations: [
      { targetId: 'han-li', targetName: '韩立', targetNameEn: 'Han Li', relation: '亦师亦友', relationEn: 'Mentor & Friend' },
    ], firstAppearChapter: '人界篇中期', firstAppearChapterEn: 'Mid Human Realm Arc', status: 'departed', tags: ['主角阵营'], ending: '残魂消散', endingEn: 'Remnant soul dissipated',
  },
  {
    id: 'wentianren', name: '温天仁', nameEn: 'Wen Tianren', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/wentianren.webp',
    affiliation: '九国盟', affiliationEn: 'Nine Nations Alliance', description: '九国盟修士，心思缜密，实力不凡。', descriptionEn: 'A cultivator of the Nine Nations Alliance, meticulous and formidable.',
    personality: '心思缜密、城府极深', personalityEn: 'Meticulous, deeply scheming',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['大晋'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'qingyuanzi', name: '清源子', nameEn: 'Qingyuanzi', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/qingyuanzi.webp',
    affiliation: '大晋正道', affiliationEn: 'Great Jin Orthodox Path', description: '大晋正道修士，德高望重。', descriptionEn: 'An orthodox cultivator of Great Jin, highly respected.',
    personality: '德高望重', personalityEn: 'Highly respected and virtuous',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['大晋'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'liudao', name: '六道极圣', nameEn: 'Six Paths Extreme Sage', aliases: ['六道'], aliasesEn: ['Six Paths'], realm: '化神期', realmEn: 'Deity Transformation',
    imageUrl: '/images/characters/liudao.svg',
    affiliation: '魔道', affiliationEn: 'Demonic Path', description: '魔道巨擘，修为通天。', descriptionEn: 'A giant of the Demonic Path, with heaven-reaching cultivation.',
    personality: '霸道阴狠', personalityEn: 'Domineering & sinister',
    techniques: ['六道魔功'], techniquesEn: ['Six Paths Demonic Art'], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'deceased', tags: ['魔道'], ending: '被击败', endingEn: 'Defeated',
  },
  {
    id: 'lifeiyu', name: '李飞宇', nameEn: 'Li Feiyu', aliases: [], aliasesEn: [], realm: '练气期', realmEn: 'Qi Condensation',
    imageUrl: '/images/characters/lifeiyu.svg',
    affiliation: '黄枫谷', affiliationEn: 'Yellow Maple Valley', description: '黄枫谷弟子。', descriptionEn: 'A disciple of Yellow Maple Valley.',
    personality: '正直善良', personalityEn: 'Righteous & kind',
    techniques: [], relations: [], firstAppearChapter: '黄枫谷篇', firstAppearChapterEn: 'Yellow Maple Valley Arc', status: 'alive', tags: ['越国七派'], ending: '继续修炼', endingEn: 'Continued cultivation',
  },
  {
    id: 'qingyi-jushi', name: '清易居士', nameEn: 'Qingyi Jushi', aliases: [], aliasesEn: [], realm: '元婴期', realmEn: 'Nascent Soul',
    imageUrl: '/images/characters/qingyi-jushi.webp',
    affiliation: '大晋', affiliationEn: 'Great Jin', description: '大晋隐世高人，修为深厚。', descriptionEn: 'A hidden master of Great Jin, with profound cultivation.',
    personality: '隐逸淡泊', personalityEn: 'Reclusive and detached',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', firstAppearChapterEn: 'Great Jin Arc', status: 'alive', tags: ['大晋'], ending: '继续隐修', endingEn: 'Continued in seclusion',
  },
];
