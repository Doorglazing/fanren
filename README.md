# 天机阁 — 凡人修仙传粉丝网站

> 窥探天机，步入修仙之途

基于《凡人修仙传》IP 打造的沉浸式粉丝网站，采用中国水墨风格设计，包含时间线、人物图鉴、法宝展示、星图等多个互动页面。

## 在线预览

[https://fanren-website.vercel.app/](https://fanren-website.vercel.app/)

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18 | UI 框架 |
| TypeScript | 5.6 | 类型安全 |
| Vite | 5.4 | 构建工具 |
| React Router | 6 | 路由管理 |
| Framer Motion | 11 | 动画引擎 |
| Three.js + R3F | 0.170 | 3D 星图渲染 |
| CSS Modules | — | 样式隔离 |

## 页面一览

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 视频背景、荣誉殿堂、数据统计、评论墙 |
| 时间线 | `/timeline` | SVG 星图路径滚动叙事 |
| 法宝 | `/artifacts` | 法宝卡片展示与详情 |
| 人物 | `/characters` | 人物图鉴、筛选、关系图谱 |
| 人物详情 | `/characters/:id` | 单个人物详细介绍 |
| 天机阁 | `/tianji` | 天机秘境展示 |
| 星图 | `/starchart` | Three.js 3D 星空交互 |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看页面。

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
fanren/
├── public/                  # 静态资源
│   ├── bgm.mp3             # 背景音乐
│   ├── images/             # 图片资源
│   │   ├── bg/             # 背景图
│   │   └── characters/     # 人物肖像
│   └── videos/             # 视频资源
├── src/
│   ├── components/          # 组件
│   │   ├── artifacts/      # 法宝相关组件
│   │   ├── characters/     # 人物相关组件
│   │   ├── common/         # 通用组件（InkBrush, ScrollReveal, SectionTitle）
│   │   ├── home/           # 首页组件（Hero, Honors, Statistics, Banner...）
│   │   ├── layout/         # 布局组件（Header, Footer, Layout, MusicPlayer）
│   │   └── timeline/       # 时间线组件（ScrollPath, EventDetailCard）
│   ├── data/               # 数据文件
│   │   ├── artifacts.ts    # 法宝数据
│   │   ├── characters.ts   # 人物数据
│   │   ├── honors.ts       # 荣誉数据
│   │   ├── statistics.ts   # 统计数据
│   │   ├── timeline.ts     # 时间线数据
│   │   └── tianji.ts       # 天机数据
│   ├── hooks/              # 自定义 Hooks
│   │   ├── useCountUp.ts   # 数字递增动画
│   │   └── useScrollReveal.ts # 滚动显示
│   ├── pages/              # 页面组件
│   ├── styles/             # 全局样式
│   │   ├── variables.css   # CSS 变量
│   │   ├── reset.css       # 样式重置
│   │   ├── typography.css  # 字体排版
│   │   ├── animations.css  # 动画关键帧
│   │   └── ink-effects.css # 水墨特效
│   ├── types/              # TypeScript 类型定义
│   └── utils/              # 工具函数
├── index.html              # HTML 入口
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目配置
```

## 设计特色

- **水墨风格** — 宣纸纹理背景、朱砂配色、毛笔笔触动画
- **沉浸体验** — 全屏视频背景、滚动触发动画、粒子特效
- **3D 星图** — 基于 Three.js 的交互式星空
- **响应式** — 适配桌面与移动端

## 致谢

- 背景视频来自社交媒体平台，已获得原作者授权
- 感谢博主 @落雨无声、@天南第一深情 提供视频素材
- 本项目仅供学习交流，不作商业用途

## 许可证

MIT
