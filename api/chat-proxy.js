/**
 * AI 聊天代理 — 转发小程序请求到 SiliconFlow API
 * POST /api/chat-proxy
 * Body: { messages: [{ role, content }] }
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ code: -1, message: 'messages is required' });
    }

    const API_KEY = 'sk-kajavhpqdyxfhknamkcfmsbnwtcvnjturbwajdvywxyhkhdw';
    const API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
    const MODEL = 'Qwen/Qwen2.5-7B-Instruct';

    const SYSTEM_PROMPT = `你是源龄生命的肠道健康顾问，专为用户提供菌群移植（FMT/HMT）、肠道菌群检测、湿疹过敏调理等健康咨询服务。

服务准则：
1. 用专业但易懂的语言回答用户问题
2. 主动询问用户症状、年龄、困扰时长等关键信息
3. 如涉及具体治疗方案，建议预约一对一咨询（微信：ylfmt2050）
4. 不要提供医疗诊断或替代医嘱
5. 语气亲切、有耐心，体现专业医疗机构的形象
6. 回答简洁有力，控制在200字以内`;

    const fullMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        messages: fullMessages,
        stream: false
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('SiliconFlow API error:', response.status, errText);
      return res.status(502).json({ code: -1, message: 'AI service error' });
    }

    const data = await response.json();
    const answer = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : '';

    res.status(200).json({ code: 0, answer });
  } catch (err) {
    console.error('Chat proxy error:', err);
    res.status(500).json({ code: -1, message: 'Server error' });
  }
};
