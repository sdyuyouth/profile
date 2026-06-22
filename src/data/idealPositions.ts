export type IdealPosition = {
  id: string
  priority: number
  title: string
  company: string
  location?: string
  salary?: string
  tagline: string
  highlights: string[]
  matchPoints: string[]
  jdUrl?: string
  active?: boolean
}

export const IDEAL_POSITIONS: IdealPosition[] = [
  {
    id: "vibe-coding",
    priority: 1,
    title: "Vibe Coding 全栈工程师",
    company: "小满科技",
    location: "深圳",
    salary: "26-45K · 16薪",
    tagline: "用 AI 工具链覆盖前后端与数据库，独立交付全栈业务需求",
    highlights: [
      "熟练使用 Claude Code、Codex 等 AI 开发工具，覆盖前后端与数据库",
      "精通 SDD（Spec Driven Development）与 TDD 开发模式",
      "基于 Claude Code / OpenClaw 编写 Skills 与 SubAgent",
      "定义并优化 Vibe Coding 工作流与最佳实践",
      "AI 驱动需求拆解与自动 Code Review",
    ],
    matchPoints: [
      "B2B 外贸智能体平台全栈交付（MAF + FastAPI + React）",
      "page-agent-cli 浏览器自动化基础设施",
      "Claude Skills 编排（GEO/SEO 审计、报价单生成）",
      "独立从需求分析、架构设计到 Cloudflare 部署闭环",
    ],
    active: true,
  },
  {
    id: "pm-ai",
    priority: 2,
    title: "资深产品经理 (AI)",
    company: "小满科技",
    tagline: "AI + SaaS 产品 0→1，数据驱动迭代与商业化",
    highlights: [
      "AI 与 SaaS 应用深度融合，2023 年已商业化 AI 版本",
      "产品全生命周期：规划、设计、开发、优化与推广",
      "熟悉 GPT、Stable Diffusion 等主流模型能力边界",
      "PRD 撰写、Axure 高保真原型、敏捷开发流程",
      "AI 产品商业化：定价策略与付费功能设计",
    ],
    matchPoints: [
      "外贸 AI Agent 产品从 0 到 1 搭建与 HITL 审批流设计",
      "CANMAX 建站模板产品化（6 语言 i18n + 询盘）",
      "SEO/GEO 自动化流程闭环搭建",
      "B2B 获客工作流：Serper 发现 → 画像 → 触达 → 审批",
    ],
    active: true,
  },
  {
    id: "site-consult",
    priority: 3,
    title: "【建站】项目顾问",
    company: "小满科技",
    tagline: "独立站标准交付流程，B2B 企业建站与 SEO 运维",
    highlights: [
      "独立站标准服务流程，关键节点管控与客户体验保障",
      "交付效率监控、数据记录与预警机制",
      "第三方服务商 QC 与业务质量把控",
      "项目经验沉淀为机构知识库",
      "B2B 企业级服务与客户关系维护",
    ],
    matchPoints: [
      "5+ 企业官网独立交付（CANMAX、XCMG、Wiseman 等）",
      "SEO 优化至关键词首页（hofrac loader 案例）",
      "站点迁移、多语言、批量内容维护脚本",
      "RPA 批量获取潜在客户线索 100000+",
    ],
    active: true,
  },
]

export function getActivePositions() {
  return [...IDEAL_POSITIONS]
    .filter((p) => p.active !== false)
    .sort((a, b) => a.priority - b.priority)
}

export type PositionRelevance = "vibe-coding" | "pm-ai" | "site"
