# WindBack.ai 自动驾驶模式分析

## 当前问题分析

### 1. 路由结构混乱
**问题：** 公开网站和应用混在一起
- `/` → MarketingHomeView（营销网站首页）
- `/app` → Home（应用首页）
- `/dashboard` → DashboardFull（应用仪表板）
- `/recording` → Recording（应用录制）

**应该是：**
- 公开网站：`/`, `/pricing`, `/features`, `/about`, `/contact`
- 应用：`/app/*` 下的所有路由（需要登录）

### 2. 登陆逻辑混乱
**问题：** 
- MarketingHomeView 显示"Sign In"按钮，但登录后应该进入应用
- 没有清晰的登录后重定向逻辑
- 应用页面（Dashboard、Recording）没有登录保护

### 3. 导航混乱
**问题：**
- 公开网站和应用使用相同的导航
- 没有清晰的"已登录"vs"未登录"状态
- 没有"登出"功能的清晰位置

## 修复计划

### Phase 1: 路由重组
1. 创建 `/public/*` 路由（营销网站）
2. 创建 `/app/*` 路由（需要登录的应用）
3. 添加路由保护中间件

### Phase 2: 登陆页面修复
1. MarketingHomeView 作为公开登陆页面
2. 登录后重定向到 `/app/dashboard`
3. 未登录用户无法访问 `/app/*`

### Phase 3: 应用结构修复
1. 所有应用页面放在 `/app/*` 下
2. 添加应用布局（侧边栏、导航）
3. 添加登出功能

### Phase 4: 导航修复
1. 公开网站导航：Logo、Features、Pricing、Contact、Sign In
2. 应用导航：Logo、Dashboard、Recording、Settings、User Profile、Sign Out

## 执行步骤

1. 分析当前所有路由和页面
2. 创建新的路由结构
3. 创建路由保护组件
4. 修复所有页面逻辑
5. 修复导航组件
6. 测试所有流程
7. 最后构建和验证
