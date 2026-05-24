import type { Artifact } from '../types';

export const artifacts: Artifact[] = [
  {
    id: 'zhangtian-ping', name: '掌天瓶', nameEn: 'Heaven-Opening Bottle', type: '辅助法宝', grade: '通天灵宝', gradeEn: 'Heavenly Spirit Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立所得的神秘小绿瓶，可催熟灵药，是韩立修仙路上最核心的至宝。',
    descriptionEn: 'The mysterious small green bottle Han Li obtained. It can accelerate the growth of spiritual herbs and is the most essential treasure on his cultivation path.',
    abilities: ['催熟灵药', '时间加速'], abilitiesEn: ['Herb Acceleration', 'Time Acceleration'], acquisition: '偶然获得', acquisitionEn: 'Found by chance', firstAppearChapter: '第1章', firstAppearChapterEn: 'Chapter 1',
    notableUsage: '无数次催熟灵药，为韩立提供了大量修炼资源', notableUsageEn: 'Used countless times to accelerate herbs, providing Han Li with vast cultivation resources',
  },
  {
    id: 'qingzhu-jian', name: '青竹蜂云剑', nameEn: 'Azure Bamboo Bee Cloud Swords', type: '飞剑', grade: '通天灵宝', gradeEn: 'Heavenly Spirit Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立本命法宝，以辟邪神雷为核心，七十二口飞剑组成剑阵。',
    descriptionEn: "Han Li's life-bound artifact, powered by the Evil-Repelling Divine Thunder, formed by seventy-two flying swords in a sword array.",
    abilities: ['辟邪神雷', '剑阵', '破邪驱魔'], abilitiesEn: ['Evil-Repelling Thunder', 'Sword Array', 'Demon Exorcism'], acquisition: '自己炼制', acquisitionEn: 'Self-forged', firstAppearChapter: '结丹期', firstAppearChapterEn: 'Core Formation Stage',
    notableUsage: '多次大战中作为主力法宝，辟邪神雷克制邪魔', notableUsageEn: 'Main artifact in many major battles; the Evil-Repelling Thunder counters evil forces',
  },
  {
    id: 'xutian-ding', name: '虚天鼎', nameEn: 'Void Heaven Cauldron', type: '十大至宝', grade: '通天灵宝', gradeEn: 'Heavenly Spirit Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '虚天殿中的上古至宝，蕴含空间法则。',
    descriptionEn: 'An ancient treasure from the Void Heaven Temple, containing spatial laws.',
    abilities: ['空间法则', '收纳万物'], abilitiesEn: ['Spatial Laws', 'Containment'], acquisition: '虚天殿获得', acquisitionEn: 'Obtained in Void Heaven Temple', firstAppearChapter: '虚天殿篇', firstAppearChapterEn: 'Void Heaven Temple Arc',
    notableUsage: '虚天殿争夺战中获得', notableUsageEn: 'Obtained during the Void Heaven Temple battle',
  },
  {
    id: 'bixie-shenlei', name: '辟邪神雷', nameEn: 'Evil-Repelling Divine Thunder', type: '火焰/神雷', grade: '法宝', gradeEn: 'Magical Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '青竹蜂云剑所蕴含的至阳神雷，专克邪魔妖物。',
    descriptionEn: 'The supreme yang thunder contained within the Azure Bamboo Bee Cloud Swords, specializing in countering evil demons.',
    abilities: ['破邪驱魔', '至阳之力'], abilitiesEn: ['Demon Exorcism', 'Supreme Yang Power'], acquisition: '炼制飞剑时获得', acquisitionEn: 'Obtained when forging the swords', firstAppearChapter: '结丹期', firstAppearChapterEn: 'Core Formation Stage',
    notableUsage: '克制各种邪魔妖物', notableUsageEn: 'Counters various evil demons and monsters',
  },
  {
    id: 'yuanmang-dun', name: '元磁神山', nameEn: 'Divine Magnet Mountain', type: '防御法器', grade: '古宝', gradeEn: 'Ancient Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立的重要防御法宝，可抵御强敌攻击。',
    descriptionEn: "An important defensive artifact of Han Li's, capable of withstanding powerful enemy attacks.",
    abilities: ['重力压制', '防御'], abilitiesEn: ['Gravity Suppression', 'Defense'], acquisition: '乱星海获得', acquisitionEn: 'Obtained in the Scattered Star Sea', firstAppearChapter: '乱星海篇', firstAppearChapterEn: 'Scattered Star Sea Arc',
    notableUsage: '多次在危急时刻保护韩立', notableUsageEn: 'Protected Han Li multiple times in critical moments',
  },
  {
    id: 'qisha-dun', name: '七杀诀', nameEn: 'Seven Killings Arts', type: '功法秘术', grade: '法宝', gradeEn: 'Magical Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立修炼的攻杀秘术之一。',
    descriptionEn: 'One of the offensive secret arts Han Li cultivated.',
    abilities: ['攻杀'], abilitiesEn: ['Offensive Kill'], acquisition: '机缘获得', acquisitionEn: 'Obtained through opportunity', firstAppearChapter: '元婴期', firstAppearChapterEn: 'Nascent Soul Stage',
    notableUsage: '战斗中使用', notableUsageEn: 'Used in combat',
  },
  {
    id: 'dayan-jue', name: '大衍诀', nameEn: 'Dayan Arts', type: '功法秘术', grade: '法宝', gradeEn: 'Magical Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '神识修炼功法，让韩立神识远超同阶。',
    descriptionEn: 'A divine sense cultivation art that made Han Li\'s spiritual awareness far surpass peers of the same level.',
    abilities: ['神识强化', '操控傀儡'], abilitiesEn: ['Spiritual Sense Enhancement', 'Puppet Control'], acquisition: '获得传承', acquisitionEn: 'Received as inheritance', firstAppearChapter: '筑基期', firstAppearChapterEn: 'Foundation Establishment Stage',
    notableUsage: '神识远超同阶，为操控傀儡和炼器打下基础', notableUsageEn: 'Spiritual sense far exceeded peers, laying the foundation for puppet control and artifact crafting',
  },
  {
    id: 'fansheng-zhenmogong', name: '梵圣真魔功', nameEn: 'Brahma Saint True Demon Art', type: '功法秘术', grade: '古宝', gradeEn: 'Ancient Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立后期主修功法，攻防一体。',
    descriptionEn: "Han Li's primary cultivation art in the later stages, combining offense and defense.",
    abilities: ['攻防一体', '法体双修'], abilitiesEn: ['Offense & Defense Integration', 'Dual Cultivation of Law and Body'], acquisition: '传承获得', acquisitionEn: 'Received as inheritance', firstAppearChapter: '元婴后期', firstAppearChapterEn: 'Late Nascent Soul Stage',
    notableUsage: '后期主要战斗功法', notableUsageEn: 'Primary combat art in later stages',
  },
  {
    id: 'tianjue-shi', name: '天绝尸', nameEn: 'Heavenly Absolute Corpse', type: '傀儡', grade: '法宝', gradeEn: 'Magical Treasure',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '韩立炼制的天绝尸，以曲魂（张铁）之身为基础。',
    descriptionEn: 'The Heavenly Absolute Corpse refined by Han Li, based on the body of Qu Hun (Zhang Tie).',
    abilities: ['战斗傀儡'], abilitiesEn: ['Combat Puppet'], acquisition: '自行炼制', acquisitionEn: 'Self-refined', firstAppearChapter: '结丹期', firstAppearChapterEn: 'Core Formation Stage',
    notableUsage: '辅助战斗', notableUsageEn: 'Assisted in combat',
  },
  {
    id: 'zhuji-dan', name: '筑基丹', nameEn: 'Foundation Establishment Pill', type: '丹药', grade: '灵材', gradeEn: 'Spirit Material',
    ownerId: 'han-li', ownerName: '韩立', ownerNameEn: 'Han Li', description: '修仙者从练气期突破到筑基期的关键丹药。',
    descriptionEn: 'The key pill for cultivators to break through from Qi Condensation to Foundation Establishment.',
    abilities: ['筑基突破'], abilitiesEn: ['Foundation Breakthrough'], acquisition: '自行炼制', acquisitionEn: 'Self-refined', firstAppearChapter: '练气期', firstAppearChapterEn: 'Qi Condensation Stage',
    notableUsage: '韩立成功筑基的关键', notableUsageEn: 'The key to Han Li\'s successful Foundation Establishment',
  },
];
