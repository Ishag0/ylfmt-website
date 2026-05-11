/**
 * 发送验证码
 * POST /api/user/send-code
 * Body: { phone: "13812345678" }
 * Response: { code: 0, message: "发送成功" }
 *
 * 简化实现（开发阶段）：
 * - 生成 6 位随机数字验证码
 * - 存入 /tmp/codes.json（有效期 5 分钟）
 * - 生产环境请接入真实短信通道（腾讯云/阿里云）
 */
const fs = require('fs')
const path = require('path')

const CODES_FILE = '/tmp/sms_codes.json'
const CODE_EXPIRE_MS = 5 * 60 * 1000 // 5分钟

// 读取现有验证码
function loadCodes() {
  try {
    if (fs.existsSync(CODES_FILE)) {
      return JSON.parse(fs.readFileSync(CODES_FILE, 'utf8'))
    }
  } catch (e) {
    console.error('读取验证码文件失败', e)
  }
  return {}
}

// 保存验证码（只保留未过期的）
function saveCodes(codes) {
  try {
    const now = Date.now()
    const valid = {}
    for (const [phone, record] of Object.entries(codes)) {
      if (record.expires > now) {
        valid[phone] = record
      }
    }
    fs.writeFileSync(CODES_FILE, JSON.stringify(valid, null, 2))
  } catch (e) {
    console.error('保存验证码文件失败', e)
  }
}

// 生成6位验证码
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  }

  try {
    const { phone } = req.body || {}

    // 参数校验
    if (!phone || !/^1\d{10}$/.test(phone)) {
      return res.status(400).json({ code: -1, message: '请输入正确的手机号' })
    }

    const now = Date.now()
    const codes = loadCodes()
    const existing = codes[phone]

    // 防刷：60秒内不能重复发送
    if (existing && existing.expires > now && (now - existing.sentAt) < 60 * 1000) {
      return res.status(429).json({ code: -1, message: '发送太频繁，请稍后再试' })
    }

    // 生成验证码
    const code = generateCode()
    codes[phone] = {
      code,
      sentAt: now,
      expires: now + CODE_EXPIRE_MS
    }
    saveCodes(codes)

    // 【开发调试】打印到控制台，方便测试
    console.log(`[send-code] 手机号: ${phone}，验证码: ${code}`)

    // 生产环境：这里接入腾讯云/阿里云短信 API
    // await tencentCloudSms.send(phone, code)
    // await aliCloudSms.send(phone, code)

    res.status(200).json({ code: 0, message: '发送成功' })
  } catch (err) {
    console.error('send-code error:', err)
    res.status(500).json({ code: -1, message: '服务器错误，请稍后重试' })
  }
}
