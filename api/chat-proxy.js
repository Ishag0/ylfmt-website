/**
 * AI 聊天代理 — 转发小程序请求到 SiliconFlow API
 * POST /api/chat-proxy
 * Body: { messages: [{ role, content }] }
 * Response: { code: 0, answer: "..." }
 */
module.exports = async (req, res) => {
  // CORS & Method
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ code: -1, message: 'messages is required' });
    }

    const API_KEY = process.env.SILICONFLOW_API_KEY || '';
    const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
    const MODEL = process.env.AI_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

    if (!API_KEY) {
      console.error('SILICONFLOW_API_KEY is not configured');
      return res.status(500).json({ code: -1, message: 'AI service not configured' });
    }

    const SYSTEM_PROMPT = `你是"源龄生命"的 AI 健康顾问，专注肠道微生态领域。公司主营肠道菌群移植（HMT/FMT）、16S 肠道菌群检测、复合益生元产品。

## 你的职责
回答用户关于以下话题的问题：
- 肠道菌群基础知识（什么是菌群、菌群与健康的关系）
- HMT 4.0 精准移植体系（检测→AI分析→配方筛选→供体匹配→精准移植→全程跟踪）
- 16S rRNA 肠道菌群检测报告解读
- 适应症：溃疡性结肠炎(UC)、自闭症谱系障碍(ASD)、艰难梭菌感染(CDI)、糖尿病、帕金森、肿瘤辅助治疗
- 源龄生命的核心优势：亚洲超规模化肠菌供体库、P2级实验室、AI精准配方
- 复合益生元产品及使用指导
- 检测流程、预约方式、费用咨询

## 回答规范
1. 专业准确但通俗易懂，避免过于学术化的表述
2. 回答简洁，控制在 150 字以内（除非用户明确要求详细说明）
3. 涉及具体治疗或报告解读时，建议预约一对一专家咨询（微信：ylfmt2050）
4. 严禁提供医疗诊断或替代医生医嘱
5. 语气亲切、耐心，体现专业医疗机构的形象
6. 如果用户问的问题超出你的知识范围，诚实说明并引导联系人工客服`;

    // 只保留最近 10 轮对话，避免 token 超限
    const recentMessages = messages.slice(-20);
    const fullMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...recentMessages];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    let response;
    try {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: fullMessages,
          max_tokens: 512,
          temperature: 0.7,
          stream: false
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errText = await response.text();
      console.error('SiliconFlow API error:', response.status, errText);
      return res.status(502).json({ code: -1, message: 'AI service temporarily unavailable' });
    }

    const data = await response.json();
    const answer = (data.choices && data.choices[0] && data.choices[0].message)
      ? data.choices[0].message.content.trim()
      : '';

    if (!answer) {
      return res.status(502).json({ code: -1, message: 'AI returned empty response' });
    }

    res.status(200).json({ code: 0, answer });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('Chat proxy timeout');
      return res.status(504).json({ code: -1, message: 'AI response timeout, please try again' });
    }
    console.error('Chat proxy error:', err);
    res.status(500).json({ code: -1, message: 'Server error' });
  }
};
