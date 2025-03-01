# 开发指南

## 1. commit规范

本项目使用了changelogen做发包版本控制，请严格按照规范提交commit

```
- feat: 新功能
- fix: 修复bug
- docs: 文档相关更新
- style: 代码格式调整
- refactor: 重构代码
- perf: 优化性能
- test: 测试相关
- build: 构建系统或外部依赖项更新
- ci: CI配置文件和脚本更改
- chore: 其他修改（不修改src或测试文件）
- revert: 回滚之前的提交

- BREAKING CHANGE: 破坏性更新，不兼容的API修改
```

示例：

```bash
git commit -m "feat: 添加新的viewport单位转换功能"
git commit -m "fix: 修复小数点精度问题"

git commit -m "feat!: 升级postcss版本到8.0，并重构插件API
BREAKING CHANGE: 新版本不再支持postcss 7.x，请查看迁移指南"
```

每个提交都会被自动收集到changelog中，并在发布时自动生成版本说明。

> Breaking change 概念：
> "Breaking change"（翻译为“破坏性变更”）是指在软件开发中对现有功能或接口进行的修改，这种修改可能导致现有的代码、功能或者接口无法与之前的版本兼容。这种变更可能会打破依赖于原有行为的代码，因此称之为“破坏性变更”。
> Breaking change可能包括以下几个方面：

> 1.  API变更： 修改了现有的应用程序编程接口（API），可能会导致之前依赖于该API的代码无法正常运行。
> 2.  功能变更： 对现有功能进行了修改，可能导致依赖于这些功能的代码无法正常工作。
> 3.  配置项变更： 对配置项的修改，可能需要用户重新配置应用程序或服务。
> 4.  数据模型变更： 对数据模型或数据库结构的修改，可能导致之前的数据不再兼容，需要进行迁移或转换。
>     Breaking change 是需要谨慎处理的，因为它可能引起现有系统的不稳定性和不可预测的行为。为了最小化对用户和开发者的影响，开发者在引入 breaking change 时通常需要进行以下操作：
>     • 文档更新： 更新相关文档，明确说明变更内容、影响以及可能的迁移步骤。
>     • 版本升级： 如果是库或框架的发布，通常需要发布一个新版本，并在发布说明中清晰地标明 breaking change。
>     • 向后兼容性： 尽量在可能的情况下保持向后兼容性，提供过渡期，以便用户和开发者能够逐步迁移。
>     • 通知： 向用户、开发者或团队成员提供足够的通知，提前告知即将发生的变更，以便做好准备。
>     在敏感的环境中，特别是在大型项目或开发者社区中，引入 breaking change 需要慎之又慎，以确保最小化对系统的影响，同时提供清晰的迁移路径。

## 2. 构建命令

```bash
"scripts": {
    "build": "tsup",
    "build:demo": "pnpm --filter playground build",
    "preview:demo": "pnpm --filter playground preview",
    // 开发playground Demo示例
    "dev:demo": "pnpm --filter playground dev",
    // 开发插件
    "dev": "tsup --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prepack": "pnpm build",
    // 发布
    "release": "pnpm test && changelogen --release && pnpm build && pnpm publish --no-git-checks && git push --follow-tags",
    // 不通过changelogen发布，自定义修改package.json版本发布
    "publish:npm": "pnpm test && pnpm build && pnpm publish",
    // 单元测试
    "test": "pnpm lint && pnpm test:types && vitest run --coverage",
    "test:unit": "vitest dev",
    "test:update": "vitest -u",
    "test:types": "tsc --noEmit --skipLibCheck",
    "up": "taze -rwiI",
    "docs:gen": "typedoc",
    // 开发官网文档
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  },
```

## 3. 单测开发

单元测试开发过程中，可以运行 `test:unit`命令，运行后后台会实时监控单测的执行情况，新增或修改单元测试过程中有异常均会提示。

运行`test`命令可以进行一轮单元测试并生成测试结果报告
