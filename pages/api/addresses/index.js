/**
 * 地址管理 API
 * GET    /api/addresses        - 获取地址列表
 * POST   /api/addresses        - 新增地址
 * PUT    /api/addresses/:id    - 更新地址
 * DELETE /api/addresses/:id    - 删除地址
 * PUT    /api/addresses/:id/default - 设为默认
 *
 * Header: Authorization: Bearer <token>
 * Response: { code: 0, data: [...] }
 */
const fs = require('fs')

const DATA_FILE = '/tmp/addresses.json'

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    }
  } catch (e) {
    console.error('读取地址文件失败', e)
  }
  return {}
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
  } catch (e) {
    console.error('保存地址文件失败', e)
  }
}

// 简化鉴权：提取手机号
function getPhone(req) {
  const auth = (req.headers.authorization || '').replace('Bearer ', '')
  // 简化：直接用 auth 作为手机号（生产用 JWT）
  if (/^1\d{10}$/.test(auth)) return auth
  return null
}

// 统一响应
function ok(res, data) {
  res.status(200).json({ code: 0, data })
}
function fail(res, status, msg) {
  res.status(status).json({ code: -1, message: msg })
}

module.exports = async (req, res) => {
  // 简单鉴权
  const phone = getPhone(req)
  if (!phone) {
    return fail(res, 401, '未授权')
  }

  // 路由分发
  const url = req.url || ''
  const idMatch = url.match(/\/api\/addresses\/([^/]+)/)
  const id = idMatch ? idMatch[1] : null
  const data = loadData()
  const myAddrs = data[phone] || []

  try {
    if (req.method === 'GET') {
      // GET /api/addresses
      return ok(res, myAddrs)

    } else if (req.method === 'POST') {
      // POST /api/addresses
      const addr = req.body || {}
      if (!addr.name || !addr.phone || !addr.detail) {
        return fail(res, 400, '缺少必填字段：name, phone, detail')
      }
      const newAddr = {
        id: 'addr_' + Date.now(),
        name: addr.name,
        phone: addr.phone,
        province: addr.province || '',
        city: addr.city || '',
        district: addr.district || '',
        detail: addr.detail,
        isDefault: myAddrs.length === 0 ? true : !!addr.isDefault
      }
      // 如果设为默认，取消其他的
      if (newAddr.isDefault) {
        myAddrs.forEach(a => a.isDefault = false)
      }
      myAddrs.push(newAddr)
      data[phone] = myAddrs
      saveData(data)
      return ok(res, newAddr)

    } else if (req.method === 'PUT' && id) {
      // PUT /api/addresses/:id
      const updates = req.body || {}
      const idx = myAddrs.findIndex(a => a.id === id)
      if (idx === -1) return fail(res, 404, '地址不存在')

      // 如果设为默认，取消其他的
      if (updates.isDefault) {
        myAddrs.forEach(a => a.isDefault = false)
      }
      myAddrs[idx] = { ...myAddrs[idx], ...updates, id }
      data[phone] = myAddrs
      saveData(data)
      return ok(res, myAddrs[idx])

    } else if (req.method === 'DELETE' && id) {
      // DELETE /api/addresses/:id
      const wasDefault = myAddrs.find(a => a.id === id)?.isDefault
      data[phone] = myAddrs.filter(a => a.id !== id)
      // 如果删除的是默认地址，把第一个设为默认
      if (wasDefault && data[phone].length > 0) {
        data[phone][0].isDefault = true
      }
      saveData(data)
      return ok(res, null)

    } else {
      return fail(res, 405, '不支持的请求方法')
    }
  } catch (err) {
    console.error('addresses error:', err)
    return fail(res, 500, '服务器错误')
  }
}
