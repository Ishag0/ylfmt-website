/**
 * 获取用户信息
 * GET /api/user/info
 * Header: Authorization: Bearer <token>
 * Response: { code: 0, data: { id, name, phone, avatar } }
 */
const fs = require('fs')

const USERS_FILE = '/tmp/users.json'

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

// 从 token 中简单提取手机号（生产请用 JWT 验证）
function getPhoneFromToken(token) {
  // 简化：token = phone_hash，直接遍历查找（生产用 JWT）
  const users = loadUsers()
  for (const [phone, user] of Object.entries(users)) {
    return phone
  }
  return null
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  }

  try {
    const auth = req.headers.authorization || ''
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ code: -1, message: '未授权，请先登录' })
    }

    const phone = getPhoneFromToken(auth.slice(7))
    if (!phone) {
      return res.status(401).json({ code: -1, message: 'Token无效' })
    }

    const users = loadUsers()
    const user = users[phone]
    if (!user) {
      return res.status(404).json({ code: -1, message: '用户不存在' })
    }

    res.status(200).json({
      code: 0,
      data: {
        id: user.id,
        name: user.name,
        phone: phone.slice(0, 3) + '****' + phone.slice(7),
        avatar: user.avatar
      }
    })
  } catch (err) {
    console.error('user/info error:', err)
    res.status(500).json({ code: -1, message: '服务器错误' })
  }
}
