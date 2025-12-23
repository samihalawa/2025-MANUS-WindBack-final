# WindBack.ai Rewind 功能完整实现计划

## 核心功能映射

### 已实现功能 ✅
- [x] 多租户架构（组织管理）
- [x] OAuth 认证（Manus）
- [x] 仪表板
- [x] Stripe 支付集成
- [x] 用户管理

### 需要实现的功能 ❌

#### 1. 屏幕录制（浏览器版本）
- [ ] 使用 MediaRecorder API 录制浏览器屏幕
- [ ] 支持多标签页录制
- [ ] 本地存储录制文件
- [ ] 时间戳记录

**实现方式：**
```typescript
// client/src/features/recording/useScreenRecorder.ts
- 使用 navigator.mediaDevices.getDisplayMedia()
- 使用 MediaRecorder 编码为 WebM/MP4
- 存储到 IndexedDB 或 S3
- 支持暂停/恢复
```

#### 2. 音频录制（麦克风）
- [ ] 麦克风音频录制
- [ ] 系统音频捕获（如果可能）
- [ ] 音频分块（~60秒）
- [ ] 本地存储

**实现方式：**
```typescript
// client/src/features/recording/useAudioRecorder.ts
- 使用 navigator.mediaDevices.getUserMedia()
- 使用 MediaRecorder 编码为 WAV/MP3
- 分块存储以优化大小
```

#### 3. 实时转录（语音转文本）
- [ ] 集成 Web Speech API 或 Whisper API
- [ ] 实时转录音频
- [ ] 支持多语言
- [ ] 存储转录文本

**实现方式：**
```typescript
// server/routers/transcription.ts
- 使用 Whisper API（通过 BUILT_IN_FORGE_API）
- 或使用 Web Speech API（客户端）
- 存储到 memories 表
```

#### 4. 语义搜索
- [ ] 全文搜索（屏幕文本 + 转录）
- [ ] 向量搜索（语义）
- [ ] 支持自然语言查询
- [ ] 快速检索

**实现方式：**
```typescript
// server/routers/search.ts
- 使用 MySQL 全文搜索
- 集成 LLM 进行语义理解
- 返回相关内存和时间戳
```

#### 5. 时间线视图
- [ ] 交互式时间线 UI
- [ ] 按时间浏览录制内容
- [ ] 预览缩略图
- [ ] 快速导航

**实现方式：**
```typescript
// client/src/pages/Timeline.tsx
- 显示按时间排序的录制
- 支持缩放和导航
- 点击跳转到特定时刻
```

#### 6. AI 总结和见解
- [ ] 自动生成会议总结
- [ ] 提取行动项
- [ ] 识别关键话题
- [ ] 生成见解

**实现方式：**
```typescript
// server/routers/summarization.ts
- 使用 LLM 总结转录文本
- 提取关键信息
- 存储到 memories 表
```

#### 7. 会议检测
- [ ] 自动检测会议（Zoom、Teams 等）
- [ ] 标记会议时间段
- [ ] 自动录制和转录
- [ ] 生成会议摘要

**实现方式：**
```typescript
// client/src/features/meetings/meetingDetector.ts
- 监听 URL 变化（zoom.us, teams.microsoft.com 等）
- 自动启动录制
- 标记为"会议"类型
```

#### 8. 数据导出/删除
- [ ] 导出选定的录制
- [ ] 批量删除
- [ ] 时间范围选择
- [ ] 格式选择（MP4、JSON 等）

**实现方式：**
```typescript
// server/routers/export.ts
- 生成导出文件
- 支持多种格式
- 通过 S3 提供下载
```

#### 9. 高级 UI/UX
- [ ] 搜索界面
- [ ] 播放器界面
- [ ] 设置面板
- [ ] 键盘快捷键

#### 10. 主动建议
- [ ] 基于活动的建议
- [ ] 提醒和跟进
- [ ] 模式识别

---

## 实现优先级

### 第一阶段（MVP）
1. 屏幕录制（浏览器）
2. 音频录制（麦克风）
3. 时间线视图
4. 基础搜索

### 第二阶段
5. 实时转录
6. AI 总结
7. 会议检测
8. 高级搜索

### 第三阶段
9. 数据导出/删除
10. 主动建议
11. 高级 UI/UX

---

## 数据库扩展

需要添加的表：

```sql
-- 录制表
CREATE TABLE recordings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organizationId INT NOT NULL,
  userId INT NOT NULL,
  type ENUM('screen', 'audio', 'meeting') NOT NULL,
  startTime TIMESTAMP NOT NULL,
  endTime TIMESTAMP,
  duration INT,
  fileUrl VARCHAR(512),
  fileSize BIGINT,
  status ENUM('recording', 'completed', 'processing', 'failed') NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id),
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- 转录表
CREATE TABLE transcriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recordingId INT NOT NULL,
  text LONGTEXT NOT NULL,
  language VARCHAR(10),
  confidence FLOAT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recordingId) REFERENCES recordings(id)
);

-- 内存表（已存在，可能需要扩展）
CREATE TABLE memories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organizationId INT NOT NULL,
  recordingId INT,
  type ENUM('note', 'meeting', 'search_result') NOT NULL,
  title VARCHAR(255),
  content LONGTEXT,
  summary LONGTEXT,
  tags JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id),
  FOREIGN KEY (recordingId) REFERENCES recordings(id)
);
```

---

## 实现步骤

1. ✅ 分析 Rewind 功能需求
2. ⏳ 更新数据库架构
3. ⏳ 实现屏幕录制
4. ⏳ 实现音频录制
5. ⏳ 实现时间线 UI
6. ⏳ 实现搜索功能
7. ⏳ 集成转录 API
8. ⏳ 实现 AI 总结
9. ⏳ 实现会议检测
10. ⏳ 完整测试和优化
