export const ROUTES = {
  HOME: '/',
  TIMELINE: '/timeline',
  ARTIFACTS: '/artifacts',
  CHARACTERS: '/characters',
  TIANJI: '/tianji',
} as const;

export const NAV_ITEMS = [
  { label: '首页', path: ROUTES.HOME },
  { label: '时间线', path: ROUTES.TIMELINE },
  { label: '法宝', path: ROUTES.ARTIFACTS },
  { label: '人物', path: ROUTES.CHARACTERS },
  { label: '天机阁', path: ROUTES.TIANJI },
] as const;

export const REALM_HIERARCHY: Record<string, number> = {
  '练气期': 1,
  '筑基期': 2,
  '结丹期': 3,
  '元婴期': 4,
  '化神期': 5,
  '炼虚期': 6,
  '合体期': 7,
  '大乘期': 8,
};

export const REALM_COLORS: Record<string, string> = {
  '练气期': '#7a8a6e',
  '筑基期': '#4a7c59',
  '结丹期': '#c4a84b',
  '元婴期': '#c03b3b',
  '化神期': '#8b1a6e',
  '炼虚期': '#6b3d3d',
  '合体期': '#1a1a2e',
  '大乘期': '#c4a84b',
};

export const EVENT_TYPE_COLORS: Record<string, string> = {
  'breakthrough': '#c4a84b',
  'battle': '#c03b3b',
  'treasure': '#5b8c5a',
  'encounter': '#6b8fbf',
  'parting': '#a0a0a0',
  'secret_realm': '#8b6fbf',
  'key_decision': '#c4a84b',
};

export const EVENT_TYPE_LABELS: Record<string, string> = {
  'breakthrough': '修为突破',
  'battle': '大战',
  'treasure': '获宝',
  'encounter': '结识',
  'parting': '离别',
  'secret_realm': '秘境',
  'key_decision': '抉择',
};
