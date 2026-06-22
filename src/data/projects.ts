import type { PositionRelevance } from "./idealPositions"

export type Project = {
  id: string
  order: number
  title: string
  localPath: string
  category: string
  stack: string[]
  highlights: string[]
  relevance: PositionRelevance[]
  demoUrl?: string
  repoUrl?: string
}

export const PROJECTS: Project[] = [
  {
    id: "b2b-agent",
    order: 1,
    title: "B2B 外贸智能体平台",
    localPath: "D:\\code\\agent-framework\\b2b-agent-platform",
    category: "核心项目 · 2026",
    stack: ["Microsoft Agent Framework", "FastAPI", "React", "Neo4j", "Serper"],
    highlights: [
      "多 Agent 外贸获客工作流：搜索/地图发现 → 网页深掘 → 画像生成 → 触达",
      "Console Agent + HITL 审批 + SSE 流式运行 + Neo4j 记忆系统",
      "tool_catalog/tool_activate 按需激活，审计日志追踪工具调用",
    ],
    relevance: ["vibe-coding", "pm-ai"],
  },
  {
    id: "canmax-site",
    order: 2,
    title: "CANMAX 企业官网",
    localPath: "D:\\code\\canmax-corporate-site",
    category: "全栈建站 / SEO · 2026",
    stack: ["Payload CMS", "Astro", "Next.js", "Cloudflare Workers/D1/R2"],
    highlights: [
      "生产级多语言 B2B 企业站：产品、新闻、询盘、Deploy Hook",
      "Astro 生成 SEO 友好静态前端，支持 6 语言及 RTL",
      "编写站点迁移、产品导入、图片修复等批量脚本",
    ],
    relevance: ["pm-ai", "site"],
    demoUrl: "https://canmax-corporate-site.pages.dev/en/",
    repoUrl: "https://github.com/sdyuyouth/canmax-corporate-site",
  },
  {
    id: "page-agent",
    order: 3,
    title: "Page Agent CLI",
    localPath: "D:\\code\\page-agent",
    category: "自动化工具 · 2026",
    stack: ["TypeScript", "CDP", "WebSocket", "ReAct LLM"],
    highlights: [
      "基于 CDP 的浏览器自动化 CLI，供 OpenClaw/自研 Agent 子进程调用",
      "state/click/input/run/teach 等命令，支持经验复用",
      "fork 自 Alibaba page-agent，持续维护 upstream 同步",
    ],
    relevance: ["vibe-coding"],
    demoUrl: "https://alibaba.github.io/page-agent/",
    repoUrl: "https://github.com/sdyuyouth/page-agent-cli",
  },
  {
    id: "agent-doc-tool",
    order: 4,
    title: "外贸报价单 Agent 工具",
    localPath: "D:\\code\\agent-doc-tool",
    category: "Agent Skill · 2026",
    stack: ["Python", "openpyxl", "docxtpl", "LibreOffice", "Claude Skill"],
    highlights: [
      "JSON → Excel/Word + PDF 报价单/形式发票自动生成",
      "自带 Claude Skill，Agent 可直接调用生成单证",
      "贴近外贸业务员日常报价场景",
    ],
    relevance: ["vibe-coding", "pm-ai", "site"],
  },
  {
    id: "payload-starter",
    order: 5,
    title: "B2B 建站模板",
    localPath: "D:\\code\\payload-astro-cloudflare-starter",
    category: "产品化模板 · 2026",
    stack: ["Payload CMS", "Astro", "Cloudflare Pages", "i18n"],
    highlights: [
      "可复用 B2B 企业站模板：6 语言 i18n + 询盘 + 翻译辅助",
      "Cloudflare 一键部署，降低企业站迁移成本",
      "产品化思维：从客户实例抽象为通用模板",
    ],
    relevance: ["pm-ai", "site"],
    repoUrl: "https://github.com/sdyuyouth/payload-astro-cloudflare-starter",
  },
  {
    id: "geo-seo",
    order: 6,
    title: "GEO/SEO AI 审计套件",
    localPath: "D:\\code\\geo-seo-claude",
    category: "Claude Skills · 2026",
    stack: ["Python", "Claude Code Skills", "Schema.org", "PDF Report"],
    highlights: [
      "GEO + SEO 全站审计：AI 可见性、citability、llms.txt、schema",
      "多 Skill 并行编排，生成专业 PDF 审计报告",
      "独立站 AI 搜索时代差异化 SEO 优化",
    ],
    relevance: ["pm-ai", "site"],
    repoUrl: "https://github.com/zubair-trabzada/geo-seo-claude",
  },
]

export function getSortedProjects() {
  return [...PROJECTS].sort((a, b) => a.order - b.order)
}
