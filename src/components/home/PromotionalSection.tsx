import ScrollReveal from '../common/ScrollReveal';
import styles from './PromotionalSection.module.css';

const highlights = [
  {
    title: 'B站镇站之宝',
    desc: '年番鼻祖，B站国创区收视连续两年第一，追番人数突破1500万',
  },
  {
    title: '3D国漫天花板',
    desc: '电影级画质，动作捕捉技术，第30届亚洲电视大奖最佳3D动画',
  },
  {
    title: '韩立IP现象',
    desc: '"韩立结婴"单集在线破44万，冲崩B站服务器，登上微博热搜',
  },
  {
    title: '中华文化出海',
    desc: 'Netflix海外周榜TOP 1，海外播放量突破2亿次',
  },
];

export default function PromotionalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <ScrollReveal>
          <div className={styles.synopsis}>
            <h2 className={styles.synopsisTitle}>故事简介</h2>
            <div className={styles.underline}>
              <span className={styles.underlineLine} />
              <span className={styles.underlineDot} />
              <span className={styles.underlineLine} />
            </div>
            <div className={styles.synopsisText}>
              <p>
                一个出身平凡的穷小子，资质普通却心志坚韧。在尔虞我诈、弱肉强食的修仙世界中，他靠着坚定的意志与过人的心智，一步步走向巅峰。
              </p>
              <p>
                从七玄门到黄枫谷，从乱星海到大晋，韩立用他的"韩跑跑"式谨慎与"韩老魔"式狠辣，书写了一段最励志的凡人修仙传奇。
              </p>
              <p>人界篇，是这一切传奇的起点。</p>
            </div>
          </div>
        </ScrollReveal>

        <div className={styles.highlights}>
          {highlights.map((item, i) => (
            <ScrollReveal key={i} className={styles.highlightCard}>
              <div className={styles.highlightInner}>
                <span className={styles.highlightNumber}>0{i + 1}</span>
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p className={styles.highlightDesc}>{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
