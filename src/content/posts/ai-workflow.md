---
title: 让 AI 真正进入个人工作流
date: 2026-07-14
category: AI 实验
excerpt: 不再从聊天框出发，而是从重复任务出发，构建一个小而可靠的个人 AI 工具。
cover: https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85
readTime: 10 MIN READ
---

## 从真实摩擦开始

“做一个 AI 助手”是一个过于宽泛的目标。我真正遇到的问题，是每周需要整理大量实验记录，并从中提取下一步行动。

因此第一版工具只做三件事：读取当天的 Markdown 笔记、识别实验与结论、生成待确认的行动清单。

![工作台上的代码](https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=85)

## 一个克制的技术组合

我使用 Python 处理文件，用本地向量数据库保存片段，再由语言模型完成结构化提取。每一步都保留原始文本引用，避免输出无法追溯。

```python
result = extract_actions(note)
for item in result:
    item.require_source()
```

相比让模型“更聪明”，我更关心它什么时候应该保持沉默，以及用户怎样快速发现错误。

## 阶段结论

AI 最适合进入那些规则不完全固定、但结果可以被人快速检查的环节。好的落地不是替代完整工作，而是减少切换与整理的成本。
