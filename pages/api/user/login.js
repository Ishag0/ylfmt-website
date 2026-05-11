/**
 * 手机号+验证码登录
 * POST /api/user/login
 * Body: { phone: "13812345678", code: "123456" }
 * Response: { code: 0, data: { token, user: { id, name, phone, avatar } } }
 *
 * 简化实现（开发阶段）：
 * - 验证验证码是否正确且未过期
 * - 生成临时 token（生产环境请用 JWT + HTTPS）
 */
const crypto = require('crypto')
const fs = require('fs')

const CODES_FILE = '/tmp/sms_codes.json'
const USERS_FILE = '/tmp/users.json' // 简单用户数据文件

// 读取验证码
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

// 读取用户数据
function loadUsers() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'))
    }
  } catch (e) {
    console.error('读取用户文件失败', e)
  }
  return {}
}

// 保存用户数据
function saveUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2))
  } catch (e) {
    console.error('保存用户文件失败', e)
  }
}

// 生成 token
function generateToken(phone) {
  return crypto
    .createHash('sha256')
    .update(phone + Date.now() + Math.random().toString(36))
    .digest('hex')
    .substring(0, 32)
}

// 掩码手机号
function maskPhone(phone) {
  return phone.slice(0, 3) + '****' + phone.slice(7)
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  }

  try {
    const { phone, code } = req.body || {}

    // 参数校验
    if (!phone || !/^1\d{10}$/.test(phone)) {
      return res.status(400).json({ code: -1, message: '请输入正确的手机号' })
    }
    if (!code || !/^\d{6}$/.test(code)) {
      return res.status(400).json({ code: -1, message: '请输入6位验证码' })
    }

    // 验证验证码
    const codes = loadCodes()
    const record = codes[phone]
    const now = Date.now()

    if (!record || record.expires < now) {
      return res.status(400).json({ code: -1, message: '验证码已过期，请重新获取' })
    }
    if (record.code !== code) {
      return res.status(400).json({ code: -1, message: '验证码错误' })
    }

    // 验证通过，删除验证码（一次性）
    delete codes[phone]
    try { fs.unlinkSync(CODES_FILE) } catch (e) { /* ignore */ }
    if (Object.keys(codes).length > 0) {
      fs.writeFileSync(CODES_FILE, JSON.stringify(codes))
    }

    // 获取或创建用户
    const users = loadUsers()
    if (!users[phone]) {
      users[phone] = {
        id: 'U' + phone.slice(-8),
        phone,
        name: '源龄会员',
        avatar: '',
        createdAt: new Date().toISOString()
      }
      saveUsers(users)
    }

    const user = users[phone]
    const token = generateToken(phone)

    console.log(`[login] 用户 ${maskPhone(phone)} 登录成功，token: ${token}`)

    res.status(200).json({
      code: 0,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: maskPhone(phone),
          avatar: user.avatar
        }
      }
    })
  } catch (err) {
    console.error('login error:', err)
    res.status(500).json({ code: -1, message: '服务器错误，请稍后重试' })
  }
}
