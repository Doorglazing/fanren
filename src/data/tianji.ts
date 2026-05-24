export interface FortuneEntry {
  id: string;
  level: number;
  name: string;
  story: { title: string; text: string };
  color: string;
  bgEffect: string;
}

const stories: Record<string, { title: string; text: string }[]> = {
  '天命道祖': [
    { title: '掌天瓶认主', text: '韩立偶然得到神秘小绿瓶，从此拥有催熟灵药的逆天能力。一个毫无背景的山村少年，自此真正踏上逆天改命之路。' },
    { title: '青竹蜂云剑炼成', text: '韩立成功炼制本命法宝"青竹蜂云剑"，以辟邪神雷为核心，日后更成为横扫诸敌的顶级杀器。' },
    { title: '飞升灵界', text: '在人界历经无数生死后，韩立最终突破化神，成功飞升灵界。昔日凡人，终成真正的大能修士。' },
  ],
  '气运滔天': [
    { title: '血色禁地遇南宫婉', text: '韩立在血色禁地中意外救下南宫婉，两人因墨蛟毒雾结下姻缘。这场偶遇，彻底改变了他的修仙人生。' },
    { title: '虚天鼎现世', text: '虚天殿开启，无数修士争夺上古至宝。韩立凭借谨慎与运气，最终获得虚天鼎的重要机缘。' },
    { title: '乱星海得古修传承', text: '韩立在乱星海苦修时，偶然发现古修士遗迹，获得大量功法与傀儡术传承，实力大增。' },
  ],
  '大吉': [
    { title: '筑基成功', text: '韩立历经艰难，终于炼制筑基丹并成功筑基。从此真正迈入修仙者行列。' },
    { title: '太南小会淘宝', text: '韩立初入修仙界，在太南小会低价淘到大量珍贵材料，狠狠赚了一笔。' },
    { title: '得大衍诀', text: '韩立获得《大衍诀》，神识远超同阶修士，为后来操控傀儡和炼器打下基础。' },
  ],
  '小吉': [
    { title: '七玄门习武', text: '少年韩立进入七玄门，虽然只是普通弟子，却因此接触到真正改变命运的修仙世界。' },
    { title: '学会炼丹', text: '韩立依靠掌天瓶不断催熟灵药，逐渐掌握炼丹之术，从此修炼资源再不匮乏。' },
    { title: '获得飞行法器', text: '第一次御器飞行时，韩立终于真正感受到修仙者腾云驾雾的自由。' },
  ],
  '平运': [
    { title: '洞府苦修', text: '韩立长期闭关修炼，几十年如一日。没有奇遇，也没有大战，只有枯燥却稳定的提升。' },
    { title: '摆摊交易', text: '为了低调获取资源，韩立经常在坊市中伪装身份，与其他修士进行普通交易。' },
    { title: '炼制符箓', text: '韩立不断练习制符之术，虽然过程平淡，却积累了大量实战保命手段。' },
  ],
  '暗流涌动': [
    { title: '魔道入侵前夕', text: '天南修仙界表面平静，实则魔道六宗已暗中集结，大战即将爆发。' },
    { title: '虚天殿开启前', text: '无数老怪物提前布局，表面合作，暗地里却都想着夺宝杀人。' },
    { title: '黄枫谷局势恶化', text: '门派内部人心浮动，各大势力互相猜忌，韩立逐渐意识到宗门并非真正安全。' },
  ],
  '小凶': [
    { title: '被封岳追杀', text: '血色禁地中，韩立遭遇炼气顶峰的封岳追杀，几乎数次险死还生。' },
    { title: '墨蛟暴走', text: '韩立与南宫婉联手对抗墨蛟，稍有失误便可能当场陨落。' },
    { title: '修炼受阻', text: '韩立闭关多年，却始终无法突破瓶颈，灵力反而开始紊乱。' },
  ],
  '大凶': [
    { title: '墨大夫夺舍', text: '昔日恩师墨大夫终于露出真面目，企图夺舍韩立身体。韩立稍有不慎，便会彻底魂飞魄散。' },
    { title: '虚天殿大战', text: '虚天殿内各方元婴老怪疯狂厮杀，韩立只能在夹缝中拼命求生。' },
    { title: '风希追杀', text: '乱星海中，韩立被妖修风希盯上，一路亡命奔逃，稍有停顿便会身死道消。' },
  ],
  '心魔缠身': [
    { title: '南宫婉失忆', text: '南宫婉因功法问题逐渐忘却前尘往事，韩立却始终无法释怀。' },
    { title: '长生孤独', text: '韩立一次次闭关后再出世，却发现故人早已化作尘土，只剩自己仍在修仙路上前行。' },
    { title: '修炼心境不稳', text: '连续大战后，韩立内心逐渐滋生心魔，险些在突破时走火入魔。' },
  ],
  '杀劫将至': [
    { title: '元婴大战爆发', text: '数位元婴修士同时出手，天地灵气疯狂震荡，一场真正的修仙大战正式开始。' },
    { title: '昆吾山开启', text: '上古禁地昆吾山现世，各方老怪齐聚。机缘与死亡，仅有一步之遥。' },
    { title: '魔道全面进攻', text: '魔道六宗正式入侵天南，无数宗门覆灭，整个修仙界陷入血雨腥风。' },
  ],
};

export const fortuneList = [
  { name: '天命道祖', color: '#f0d060', bgEffect: 'golden', desc: '道祖垂青，万法归宗' },
  { name: '气运滔天', color: '#78c8c8', bgEffect: 'azure', desc: '气运加身，势不可挡' },
  { name: '大吉', color: '#d4b840', bgEffect: 'lightgold', desc: '吉星高照，诸事顺遂' },
  { name: '小吉', color: '#7aaf6a', bgEffect: 'green', desc: '小有收获，宜守宜进' },
  { name: '平运', color: '#9a9a9a', bgEffect: 'grey', desc: '风平浪静，稳扎稳打' },
  { name: '暗流涌动', color: '#7a5a8a', bgEffect: 'purple', desc: '暗流潜藏，谨言慎行' },
  { name: '小凶', color: '#c06050', bgEffect: 'red', desc: '小有波折，以退为进' },
  { name: '大凶', color: '#c02020', bgEffect: 'blood', desc: '煞气冲天，宜避锋芒' },
  { name: '心魔缠身', color: '#6a2080', bgEffect: 'demon', desc: '心魔作祟，固守本心' },
  { name: '杀劫将至', color: '#e02020', bgEffect: 'lightning', desc: '杀劫临头，速避锋芒' },
] as const;

export function drawFortune(): FortuneEntry {
  const idx = Math.floor(Math.random() * fortuneList.length);
  const fortune = fortuneList[idx];
  const pool = stories[fortune.name];
  const story = pool[Math.floor(Math.random() * pool.length)];
  return {
    id: `${Date.now()}-${idx}`,
    level: idx,
    name: fortune.name,
    story,
    color: fortune.color,
    bgEffect: fortune.bgEffect,
  };
}
