export interface FortuneEntry {
  id: string;
  level: number;
  name: string;
  nameEn: string;
  story: { title: string; text: string };
  storyEn: { title: string; text: string };
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

const storiesEn: Record<string, { title: string; text: string }[]> = {
  '天命道祖': [
    { title: 'Heaven-Opening Bottle Acknowledges Its Master', text: 'Han Li accidentally obtains a mysterious little green bottle, gaining the heaven-defying ability to accelerate the growth of spiritual herbs. A village boy with no background truly begins his path of defying fate.' },
    { title: 'Azure Bee Cloud Swords Forged', text: 'Han Li successfully refines his life-bound treasure, the Azure Bee Cloud Swords, with Evil-Repelling Divine Thunder at their core. They later become a top-tier weapon that sweeps through all enemies.' },
    { title: 'Ascension to the Spirit Realm', text: 'After countless life-and-death struggles in the Human Realm, Han Li finally breaks through to Deity Transformation and successfully ascends. A former mortal becomes a truly mighty cultivator.' },
  ],
  '气运滔天': [
    { title: 'Meeting Nangong Wan at the Blood-Colored Forbidden Land', text: 'Han Li unexpectedly rescues Nangong Wan in the Blood-Colored Forbidden Land. Bound by the ink dragon\'s toxic mist, their fate is sealed. This chance encounter changes his cultivation journey forever.' },
    { title: 'The Void Heaven Cauldron Appears', text: 'The Void Heaven Temple opens, and countless cultivators fight over ancient treasures. Through caution and luck, Han Li ultimately obtains a crucial opportunity — the Void Heaven Cauldron.' },
    { title: 'Ancient Cultivator\'s Legacy in the Scattered Star Sea', text: 'While cultivating in the Scattered Star Sea, Han Li stumbles upon an ancient cultivator\'s ruins, gaining numerous techniques and puppetry inheritances that greatly boost his power.' },
  ],
  '大吉': [
    { title: 'Foundation Establishment Success', text: 'After arduous efforts, Han Li finally refines a Foundation Establishment Pill and succeeds. He truly steps into the ranks of cultivators.' },
    { title: 'Treasure Hunting at the Taian Gathering', text: 'New to the cultivation world, Han Li scores a massive deal at the Taian Gathering, buying precious materials at low prices.' },
    { title: 'Obtaining the Dayan Arts', text: 'Han Li acquires the Dayan Arts, granting him divine sense far beyond his peers, laying the foundation for puppetry and artifact refinement.' },
  ],
  '小吉': [
    { title: 'Martial Training at the Seven Mysteries Sect', text: 'Young Han Li enters the Seven Mysteries Sect. Though merely an ordinary disciple, it brings him into contact with the cultivation world that will change his destiny.' },
    { title: 'Learning Alchemy', text: 'Using the Heaven-Opening Bottle to accelerate spiritual herb growth, Han Li gradually masters alchemy, ensuring his cultivation resources never run dry.' },
    { title: 'Obtaining a Flying Artifact', text: 'The first time he rides a flying artifact, Han Li finally experiences the freedom of soaring through the clouds like a true cultivator.' },
  ],
  '平运': [
    { title: 'Secluded Cultivation', text: 'Han Li enters long-term seclusion, cultivating for decades. No great adventures, no epic battles — just steady, if tedious, progress.' },
    { title: 'Market Trading', text: 'To gather resources discreetly, Han Li frequently disguises himself at markets, trading with fellow cultivators in ordinary transactions.' },
    { title: 'Crafting Talismans', text: 'Han Li practices talisman-making relentlessly. Though the process is mundane, he accumulates a wealth of life-saving tools for battle.' },
  ],
  '暗流涌动': [
    { title: 'Eve of the Demonic Invasion', text: 'The Tiannan cultivation world appears calm, but the Demonic Six Sects have secretly assembled. A great war is imminent.' },
    { title: 'Before the Void Heaven Temple Opens', text: 'Countless old monsters scheme in advance. On the surface they cooperate, but in the shadows, each plots to kill and seize treasures.' },
    { title: 'Deteriorating Situation at Yellow Maple Valley', text: 'Internal factions grow restless, major powers suspect each other. Han Li gradually realizes his sect is not truly safe.' },
  ],
  '小凶': [
    { title: 'Pursued by Feng Yue', text: 'In the Blood-Colored Forbidden Land, Han Li is hunted by Feng Yue at the peak of Qi Condensation, narrowly escaping death several times.' },
    { title: 'Ink Dragon Rampage', text: 'Han Li and Nangong Wan join forces against the ink dragon. A single misstep could mean instant death.' },
    { title: 'Cultivation Blockage', text: 'After years of seclusion, Han Li still cannot break through his bottleneck. His spiritual energy begins to destabilize.' },
  ],
  '大凶': [
    { title: 'Doctor Mo\'s Possession Attempt', text: 'His former mentor Doctor Mo finally reveals his true face, attempting to possess Han Li\'s body. One wrong move and Han Li\'s soul would be utterly destroyed.' },
    { title: 'Battle at the Void Heaven Temple', text: 'Nascent Soul eccentrics slaughter each other madly inside the Void Heaven Temple. Han Li can only struggle to survive in the cracks between their attacks.' },
    { title: 'Feng Xi\'s Pursuit', text: 'In the Scattered Star Sea, the demon cultivator Feng Xi targets Han Li. He flees for his life — one pause and his path ends forever.' },
  ],
  '心魔缠身': [
    { title: 'Nangong Wan\'s Memory Loss', text: 'Due to a technique malfunction, Nangong Wan gradually forgets her past. Han Li can never let go, yet cannot help.' },
    { title: 'The Loneliness of Longevity', text: 'After each seclusion, Han Li emerges to find old friends long turned to dust. Only he continues on the cultivation path alone.' },
    { title: 'Unstable Cultivation Mindset', text: 'After consecutive battles, inner demons gradually fester in Han Li\'s heart. He nearly suffers a qi deviation during a breakthrough.' },
  ],
  '杀劫将至': [
    { title: 'Nascent Soul Battle Erupts', text: 'Multiple Nascent Soul cultivators strike simultaneously. Spiritual energy between heaven and earth goes berserk. A true cultivation war begins.' },
    { title: 'Kunwu Mountain Opens', text: 'The ancient forbidden land of Kunwu Mountain appears, drawing old monsters from all sides. Opportunity and death are but a step apart.' },
    { title: 'Full-Scale Demonic Assault', text: 'The Demonic Six Sects formally invade Tiannan. Countless sects are annihilated, and the entire cultivation world descends into blood and chaos.' },
  ],
};

export const fortuneList = [
  { name: '天命道祖', nameEn: 'Heaven\'s Chosen', color: '#f0d060', bgEffect: 'golden', desc: '道祖垂青，万法归宗', descEn: 'Favored by the Dao Ancestor, all paths converge' },
  { name: '气运滔天', nameEn: 'Overwhelming Fortune', color: '#78c8c8', bgEffect: 'azure', desc: '气运加身，势不可挡', descEn: 'Fortune upon you, unstoppable momentum' },
  { name: '大吉', nameEn: 'Great Auspice', color: '#d4b840', bgEffect: 'lightgold', desc: '吉星高照，诸事顺遂', descEn: 'Lucky star shines, all goes smoothly' },
  { name: '小吉', nameEn: 'Minor Auspice', color: '#7aaf6a', bgEffect: 'green', desc: '小有收获，宜守宜进', descEn: 'Small gains, favorable for both defense and advance' },
  { name: '平运', nameEn: 'Neutral', color: '#9a9a9a', bgEffect: 'grey', desc: '风平浪静，稳扎稳打', descEn: 'Calm waters, steady progress' },
  { name: '暗流涌动', nameEn: 'Hidden Currents', color: '#7a5a8a', bgEffect: 'purple', desc: '暗流潜藏，谨言慎行', descEn: 'Undercurrents lurk, speak and act with caution' },
  { name: '小凶', nameEn: 'Minor Misfortune', color: '#c06050', bgEffect: 'red', desc: '小有波折，以退为进', descEn: 'Minor setbacks, retreat to advance' },
  { name: '大凶', nameEn: 'Great Misfortune', color: '#c02020', bgEffect: 'blood', desc: '煞气冲天，宜避锋芒', descEn: 'Killing intent fills the air, avoid the frontlines' },
  { name: '心魔缠身', nameEn: 'Inner Demons', color: '#6a2080', bgEffect: 'demon', desc: '心魔作祟，固守本心', descEn: 'Inner demons plague you, hold fast to your true heart' },
  { name: '杀劫将至', nameEn: 'Killing Tribulation', color: '#e02020', bgEffect: 'lightning', desc: '杀劫临头，速避锋芒', descEn: 'Killing tribulation descends, flee the frontlines swiftly' },
] as const;

export function drawFortune(): FortuneEntry {
  const idx = Math.floor(Math.random() * fortuneList.length);
  const fortune = fortuneList[idx];
  const pool = stories[fortune.name];
  const story = pool[Math.floor(Math.random() * pool.length)];
  const poolEn = storiesEn[fortune.name];
  const storyEn = poolEn[Math.floor(Math.random() * poolEn.length)];
  return {
    id: `${Date.now()}-${idx}`,
    level: idx,
    name: fortune.name,
    nameEn: fortune.nameEn,
    story,
    storyEn,
    color: fortune.color,
    bgEffect: fortune.bgEffect,
  };
}
