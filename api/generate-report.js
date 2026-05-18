/**
 * HMT 报告生成 — AI 根据检测数据生成肠道菌群分析报告
 * POST /api/generate-report
 * Body: { orderId, patientInfo, testResult }
 *
 * patientInfo: { name, age, gender, symptoms }
 * testResult:  { summary, diversity, pathogens, beneficial, recommendations }
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' });
  }

  try {
    const { patientInfo, testResult } = req.body || {};

    // 参数校验
    if (!patientInfo || !testResult) {
      return res.status(400).json({ code: -1, message: '缺少必要参数：patientInfo, testResult' });
    }

    const { name, age, gender, symptoms } = patientInfo;
    const { summary, diversity, pathogens, beneficial, recommendations } = testResult;

    if (!name || !age) {
      return res.status(400).json({ code: -1, message: 'patientInfo 缺少 name 或 age' });
    }

    // SiliconFlow API 配置（支持 OpenAI 兼容格式）
    const API_KEY = 'sk-tp-05fe7EHlJvV2uSawlRfp9Su5gVaNIbsnlHjUBJ4PA5x74Z2W';
    const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
    const MODEL = 'Qwen/Qwen2.5-72B-Instruct'; // 用更强模型生成报告

    const REPORT_PROMPT = `你是深圳源龄生命科技有限公司的肠道微生态分析专家，负责根据 16S rRNA 测序数据生成专业的肠道菌群检测报告。

## 当前客户信息
- 姓名：${name}
- 年龄：${age}岁
- 性别：${gender || '未知'}
- 主诉症状：${symptoms || '未提供'}

## 检测数据概要
- 菌群总体评估：${summary || '待分析'}
- 菌群多样性指数：${diversity || '待分析'}
- 检出有害菌/致病菌：${pathogens || '未检出'}
- 有益菌丰度：${beneficial || '待分析'}
- 初步建议：${recommendations || '待生成'}

## 报告生成要求
请按以下结构生成完整的专业报告：

### 一、报告摘要（200字以内）
用通俗易懂的语言总结检测结论，指出核心问题。

### 二、菌群多样性分析
分析 Alpha 多样性和 Beta 多样性，判断菌群丰富度和均匀度。

### 三、有益菌分析
列出关键有益菌（如双歧杆菌、乳酸杆菌、阿克曼菌等）的丰度情况，说明其对健康的意义。

### 四、有害菌/条件致病菌分析
列出检出的潜在有害菌，评估其健康风险。

### 五、菌群失衡评估
根据有益菌与有害菌的比例，评估整体失衡程度（轻度/中度/重度）。

### 六、健康风险提示
结合菌群数据，提示可能相关的健康风险（如肠易激、免疫失调、代谢异常等）。

### 七、干预建议
1. 饮食建议（具体到食物类别）
2. 生活方式建议
3. 益生菌补充建议
4. 是否建议 HMT 精准移植（说明理由）
5. 复查建议时间

### 八、免责声明
报告仅供参考，不构成医疗诊断。具体治疗方案请遵医嘱。

注意事项：
- 数据不足时用"数据未提供"标注，不要编造数据
- 语言专业但易懂，面向非医学背景的用户
- HMT 相关内容需体现源龄生命的专业优势
- 联系方式统一为微信：ylfmt2050`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: REPORT_PROMPT }],
        stream: false,
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Report generation API error:', response.status, errText);
      return res.status(502).json({ code: -1, message: 'AI 报告生成服务异常' });
    }

    const data = await response.json();
    const reportContent = data.choices?.[0]?.message?.content || '';

    if (!reportContent) {
      return res.status(502).json({ code: -1, message: 'AI 未返回有效报告内容' });
    }

    res.status(200).json({
      code: 0,
      message: '报告生成成功',
      data: {
        reportContent,
        generatedAt: new Date().toISOString(),
        model: MODEL
      }
    });
  } catch (err) {
    console.error('Generate report error:', err);
    res.status(500).json({ code: -1, message: '服务器错误' });
  }
};
