# LY·LAB Portfolio

一份使用 React + Vite 构建的个人作品集基础版本，适合展示独立游戏、AI 应用与数据研究项目。

## 本地运行

### Windows 一键启动（推荐）

在项目文件夹中右键打开 PowerShell，然后运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\start-dev.ps1
```

脚本会自动使用 Codex 自带的 Node.js 环境，无需另外安装 npm。

### 已安装 Node.js 的电脑

```bash
npm install
npm run dev
```

## 发布到 GitHub Pages

1. 在 GitHub 创建仓库并推送代码。
2. 将 `package.json` 中的 `deploy` 脚本保留，运行 `npm run deploy`。
3. 在仓库 Settings → Pages 中确认来源为 `gh-pages` 分支。

部署前请把页面中的姓名、邮箱、GitHub 地址、个人介绍和项目资料替换为真实内容。

## 新增博客文章

博客文章保存在 `src/content/posts/`。复制任意 `.md` 文件并修改顶部信息即可：

```md
---
title: 文章标题
date: 2026-07-22
category: 独立游戏
excerpt: 显示在档案列表中的文章摘要
cover: https://example.com/cover.jpg
readTime: 6 MIN READ
---

## 正文标题

这里开始写 Markdown 正文。
```

保存后，文章会自动出现在档案页，并进入分类筛选和搜索结果。
