export const profile = {
  name: "鲁越森",
  title: "Vibe Coding · Full-Stack · Agent Builder",
  targetCompany: "小满科技",
  age: 21,
  location: "山东临沂",
  politicalStatus: "中共党员",
  phone: "15153945240",
  email: "2629133574@qq.com",
  github: "https://github.com/sdyuyouth",
  summary:
    "具备外贸业务理解、Agent 应用开发、全栈工程、浏览器自动化、数据采集、SEO 建站和 Serverless 部署经验。能从客户需求拆解、方案设计、工具开发、上线部署到运营反馈闭环独立推进。",
  skills: {
    agent: [
      "Microsoft Agent Framework",
      "Claude Code / Skills",
      "OpenClaw",
      "FastAPI",
      "Neo4j",
      "SSE / HITL",
    ],
    fullstack: [
      "React / Vite",
      "Vue 3",
      "TypeScript",
      "Python",
      "Django",
      "Hono",
    ],
    automation: [
      "CDP / Selenium",
      "Chrome Extension MV3",
      "RPA",
      "Docker",
      "Celery",
    ],
    seo: [
      "Astro / Next.js",
      "Payload CMS",
      "Cloudflare Workers",
      "GEO / SEO",
      "多语言 i18n",
    ],
  },
  experience: [
    {
      id: "shanghai",
      company: "上海某机械设备有限公司",
      role: "数智化工程师",
      period: "2026.1 — 2026.6",
      highlights: [
        "外贸 AI Agent 的搭建与 SEO/GEO 自动化流程闭环",
        "多品牌企业官网建设与跨境链式代理网络搭建",
        "AI 工作流搭建与产品化落地",
      ],
    },
    {
      id: "shanqing",
      company: "山青院跨境电商运营项目",
      role: "技术总监",
      period: "2024.3 — 至今",
      highlights: [
        "独立开发多个企业官网，覆盖 CANMAX、XCMG、Wiseman 等客户",
        "一个月内将 wisemanloader.com 优化至 hofrac loader 关键词首页",
        "定制 RPA 爬取潜在客户信息 100000+",
        "熟悉 Facebook、LinkedIn、YouTube、TikTok 等海外社媒运营与 API",
      ],
      links: [
        { label: "CANMAX", url: "https://canmax-corporate-site.pages.dev/en/" },
        { label: "XCMG Used", url: "https://www.xcmgusedmachinery.com/" },
        { label: "Wiseman Loader", url: "https://www.wisemanloader.com" },
        { label: "Keilips", url: "https://www.keilips.com" },
        { label: "Hailongyuan", url: "https://en.hailongyuan.com" },
      ],
    },
    {
      id: "qidongli",
      company: "企动力",
      role: "全栈开发工程师",
      period: "2025.2 — 2025.4",
      highlights: [
        "集成 Facebook、Google Maps、广交会数据获客的外贸客户管理系统（SaaS）",
        "Vue 前端 + Django 后端，Redis 分布式任务队列 + Celery Worker 集群",
        "Selenium 浏览器池化 + Docker 容器化部署，多层用户鉴权",
      ],
    },
  ],
  honors: [
    "全国计算机等级二级",
    "会计从业资格证书",
    "全球校园人工智能算法大赛国赛三等奖",
    "大学英语四级",
    "三年优秀学生一等奖学金",
    "学习标兵 · 优秀班干部",
  ],
} as const

export type Profile = typeof profile
