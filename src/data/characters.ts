import type { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'han-li', name: '韩立', aliases: ['韩跑跑', '韩老魔'], realm: '化神期',
    imageUrl: '/images/characters/hanli.webp',
    affiliation: '落云宗', description: '本是山村少年，因机缘踏入修仙界。性格谨慎隐忍，杀伐果断，重情重义。凭借掌天瓶和坚韧意志，从凡人一步步修炼至化神期，最终飞升灵界。', personality: '谨慎隐忍、杀伐果断、重情重义',
    techniques: ['青竹蜂云剑', '辟邪神雷', '大衍诀', '梵圣真魔功'], relations: [
      { targetId: 'nangong-wan', targetName: '南宫婉', relation: '道侣' },
      { targetId: 'yin-yue', targetName: '银月', relation: '器灵/挚友' },
    ], firstAppearChapter: '第1章', status: 'alive', tags: ['主角阵营', '落云宗'], ending: '成功飞升灵界，与南宫婉重逢',
  },
  {
    id: 'nangong-wan', name: '南宫婉', aliases: ['南宫仙子'], realm: '元婴期',
    imageUrl: '/images/characters/nangong-wan.webp',
    affiliation: '掩月宗', description: '掩月宗天骄，韩立道侣。清冷高贵，外冷内热，对韩立深情专一。', personality: '清冷高贵、深情专一、外冷内热',
    techniques: ['素女轮回诀'], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '道侣' },
    ], firstAppearChapter: '血色禁地篇', status: 'alive', tags: ['主角阵营', '越国七派'], ending: '与韩立重逢，共同飞升',
  },
  {
    id: 'yin-yue', name: '银月', aliases: ['银月仙子'], realm: '元婴期',
    imageUrl: '/images/characters/yinyue.webp',
    affiliation: '灵界银月狼族', description: '韩立本命法宝器灵，实为灵界银月狼族公主。聪慧冷静，忠心耿耿，多次在关键时刻帮助韩立。', personality: '聪慧冷静、忠心耿耿',
    techniques: ['银月神识'], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '器灵/挚友' },
    ], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['主角阵营'], ending: '恢复本体，回归灵界',
  },
  {
    id: 'li-feyu', name: '厉飞雨', aliases: [], realm: '凡人',
    affiliation: '七玄门', description: '韩立在七玄门时唯一的好友，豪爽重义。最终因无法踏入修仙界而老去。', personality: '豪爽重义',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '挚友' },
    ], firstAppearChapter: '第1章', status: 'departed', tags: ['早期人脉', '七玄门'], ending: '凡人终老',
  },
  {
    id: 'zhang-tie', name: '张铁', aliases: [], realm: '凡人',
    affiliation: '七玄门', description: '韩立同门师兄弟，憨厚老实。被墨大夫选为修炼炉鼎，最终悲惨死去。', personality: '憨厚老实',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '同门' },
      { targetId: 'mo-daifu', targetName: '墨居仁', relation: '被害' },
    ], firstAppearChapter: '第1章', status: 'deceased', tags: ['早期人脉', '七玄门'], ending: '被墨大夫害死',
  },
  {
    id: 'mo-daifu', name: '墨居仁', aliases: ['墨大夫'], realm: '筑基期',
    imageUrl: '/images/characters/modaifu.svg',
    affiliation: '七玄门神手谷', description: '韩立修仙启蒙之人，表面慈祥实则心机深沉，企图夺舍韩立。', personality: '心机深沉、伪装极深',
    techniques: ['夺舍秘术', '傀儡术'], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '师徒/仇敌' },
    ], firstAppearChapter: '第1章', status: 'deceased', tags: ['早期人脉', '七玄门'], ending: '夺舍失败，被韩立反杀',
  },
  {
    id: 'mo-caihuan', name: '墨彩环', aliases: [], realm: '凡人',
    affiliation: '七玄门', description: '墨大夫之女，温柔善良，对韩立情有独钟。', personality: '温柔善良、真挚单纯',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '暗恋韩立' },
    ], firstAppearChapter: '第1章', status: 'departed', tags: ['早期人脉', '七玄门'], ending: '凡人终老',
  },
  {
    id: 'qu-hun', name: '曲魂', aliases: [], realm: '结丹期',
    affiliation: '韩立炼尸', description: '韩立所炼制的天绝尸，原为张铁之身。', personality: '无自主意识',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '炼尸' },
    ], firstAppearChapter: '人界篇早期', status: 'departed', tags: ['主角阵营'], ending: '在天绝地损毁',
  },
  {
    id: 'li-huayuan', name: '李化元', aliases: [], realm: '结丹期',
    affiliation: '黄枫谷', description: '韩立在黄枫谷的师父，小气市侩但重情守诺。', personality: '小气市侩但重情守诺、忠心护短',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '师徒' },
    ], firstAppearChapter: '黄枫谷篇', status: 'deceased', tags: ['越国七派'], ending: '在魔道入侵中陨落',
  },
  {
    id: 'chen-qiaoqian', name: '陈巧倩', aliases: [], realm: '筑基期',
    imageUrl: '/images/characters/chenqiaoqian.svg',
    affiliation: '黄枫谷', description: '黄枫谷女修，温柔清冷，内敛长情。', personality: '温柔清冷、内敛长情',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '同门' },
    ], firstAppearChapter: '黄枫谷篇', status: 'alive', tags: ['越国七派'], ending: '留在天南',
  },
  {
    id: 'xin-ruyin', name: '辛如音', aliases: [], realm: '练气期',
    affiliation: '修仙家族', description: '温柔聪慧，沉静淡雅，看淡生死。', personality: '温柔聪慧、沉静淡雅',
    techniques: ['阵法'], relations: [], firstAppearChapter: '越国篇', status: 'deceased', tags: ['越国七派'], ending: '病逝',
  },
  {
    id: 'wang-chan', name: '王蝉', aliases: [], realm: '元婴期',
    imageUrl: '/images/characters/wangchan.svg',
    affiliation: '鬼灵门', description: '魔道天才修士，阴毒狂傲，心机深沉。', personality: '阴毒狂傲、心机深沉',
    techniques: ['鬼灵门秘术'], relations: [], firstAppearChapter: '越国篇', status: 'deceased', tags: ['魔道六宗'], ending: '被韩立斩杀',
  },
  {
    id: 'zi-ling', name: '紫灵', aliases: ['紫灵仙子'], realm: '结丹期',
    imageUrl: '/images/characters/ziling.webp',
    affiliation: '乱星海散修', description: '乱星海第一美人，聪慧果敢，高贵冷艳，独立骄傲。', personality: '聪慧果敢、高贵冷艳',
    techniques: [], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '知己' },
    ], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['乱星海'], ending: '留在乱星海',
  },
  {
    id: 'yuan-yao', name: '元瑶', aliases: ['瑶儿'], realm: '结丹期',
    imageUrl: '/images/characters/yuanyao.webp',
    affiliation: '散修', description: '温柔坚韧、重情重义。', personality: '温柔坚韧、重情重义',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['乱星海'], ending: '继续修炼',
  },
  {
    id: 'mei-ning', name: '梅凝', aliases: ['凝儿'], realm: '筑基期',
    imageUrl: '/images/characters/mei-ning.webp',
    affiliation: '乱星海散修', description: '温婉柔弱，单纯善良。', personality: '温婉柔弱、单纯善良',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['乱星海'], ending: '随韩立同行',
  },
  {
    id: 'ling-yuling', name: '凌玉灵', aliases: [], realm: '元婴期',
    affiliation: '星宫', description: '星宫之人，干练沉稳，有恩必报。', personality: '干练沉稳、有恩必报',
    techniques: [], relations: [], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['乱星海'], ending: '执掌星宫',
  },
  {
    id: 'feng-xi', name: '风希', aliases: [], realm: '元婴期',
    affiliation: '妖族', description: '妖修，霸道强横。', personality: '霸道强横',
    techniques: ['风属性神通'], relations: [], firstAppearChapter: '乱星海篇', status: 'alive', tags: ['乱星海'], ending: '继续修炼',
  },
  {
    id: 'jinyin-laozu', name: '极阴老祖', aliases: ['极阴', '极阴祖师'], realm: '元婴期',
    imageUrl: '/images/characters/jinyin.webp',
    affiliation: '极阴岛', description: '霸道狠辣，老谋深算。', personality: '霸道狠辣、老谋深算',
    techniques: ['极阴神光'], relations: [], firstAppearChapter: '乱星海篇', status: 'deceased', tags: ['乱星海'], ending: '在虚天殿陨落',
  },
  {
    id: 'mu-peiling', name: '慕沛灵', aliases: ['沛灵'], realm: '筑基期',
    imageUrl: '/images/characters/mu-peiling.webp',
    affiliation: '落云宗', description: '温婉秀丽，聪慧沉静。', personality: '温婉秀丽、聪慧沉静',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['落云宗'], ending: '随韩立同行',
  },
  {
    id: 'song-yu', name: '宋玉', aliases: [], realm: '筑基期',
    imageUrl: '/images/characters/song-yu.webp',
    affiliation: '落云宗', description: '端庄秀丽，温和细腻。', personality: '端庄秀丽、温和细腻、谨慎克制',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['落云宗'], ending: '留在落云宗',
  },
  {
    id: 'xiang-zhili', name: '向之礼', aliases: [], realm: '化神期',
    affiliation: '天南散修', description: '天南化神期散修，洒脱诙谐，城府极深。', personality: '洒脱诙谐、城府极深',
    techniques: [], relations: [], firstAppearChapter: '天南篇', status: 'alive', tags: ['大晋'], ending: '飞升灵界',
  },
  {
    id: 'hu-laomo', name: '呼老魔', aliases: [], realm: '化神期',
    affiliation: '大晋魔道', description: '大晋魔道巨擘，暴虐凶残。', personality: '暴虐凶残、嗜血阴狠',
    techniques: ['魔道秘术'], relations: [], firstAppearChapter: '大晋篇', status: 'deceased', tags: ['大晋'], ending: '被韩立击杀',
  },
  {
    id: 'tianlan-shengnv', name: '天澜圣女', aliases: [], realm: '元婴期',
    affiliation: '天澜草原', description: '天澜草原领袖，领袖气度。', personality: '领袖气度',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['天澜草原'], ending: '继续统领天澜草原',
  },
  {
    id: 'nan-longhou', name: '南陇侯', aliases: [], realm: '元婴期',
    affiliation: '大晋正道', description: '儒雅从容，城府极深。', personality: '儒雅从容、城府极深、老谋深算',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['大晋'], ending: '继续修炼',
  },
  {
    id: 'dayan', name: '大衍神君', aliases: ['大衍'], realm: '化神期以上',
    imageUrl: '/images/characters/dayan.svg',
    affiliation: '大衍神君', description: '上古修士残魂，寄居于大衍诀中。指点韩立修炼，亦师亦友。', personality: '博学多识、亦师亦友',
    techniques: ['大衍诀', '傀儡术'], relations: [
      { targetId: 'han-li', targetName: '韩立', relation: '亦师亦友' },
    ], firstAppearChapter: '人界篇中期', status: 'departed', tags: ['主角阵营'], ending: '残魂消散',
  },
  {
    id: 'wentianren', name: '温天仁', aliases: [], realm: '元婴期',
    imageUrl: '/images/characters/wentianren.webp',
    affiliation: '九国盟', description: '九国盟修士，心思缜密，实力不凡。', personality: '心思缜密、城府极深',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['大晋'], ending: '继续修炼',
  },
  {
    id: 'qingyuanzi', name: '清源子', aliases: [], realm: '元婴期',
    imageUrl: '/images/characters/qingyuanzi.webp',
    affiliation: '大晋正道', description: '大晋正道修士，德高望重。', personality: '德高望重',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['大晋'], ending: '继续修炼',
  },
  {
    id: 'liudao', name: '六道极圣', aliases: ['六道'], realm: '化神期',
    imageUrl: '/images/characters/liudao.svg',
    affiliation: '魔道', description: '魔道巨擘，修为通天。', personality: '霸道阴狠',
    techniques: ['六道魔功'], relations: [], firstAppearChapter: '大晋篇', status: 'deceased', tags: ['魔道'], ending: '被击败',
  },
  {
    id: 'lifeiyu', name: '李飞宇', aliases: [], realm: '练气期',
    imageUrl: '/images/characters/lifeiyu.svg',
    affiliation: '黄枫谷', description: '黄枫谷弟子。', personality: '正直善良',
    techniques: [], relations: [], firstAppearChapter: '黄枫谷篇', status: 'alive', tags: ['越国七派'], ending: '继续修炼',
  },
  {
    id: 'qingyi-jushi', name: '清易居士', aliases: [], realm: '元婴期',
    imageUrl: '/images/characters/qingyi-jushi.webp',
    affiliation: '大晋', description: '大晋隐世高人，修为深厚。', personality: '隐逸淡泊',
    techniques: [], relations: [], firstAppearChapter: '大晋篇', status: 'alive', tags: ['大晋'], ending: '继续隐修',
  },
];
