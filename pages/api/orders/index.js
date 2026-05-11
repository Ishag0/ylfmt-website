/**
 * 订单管理 API
 * GET    /api/orders           - 获取订单列表
 * POST   /api/orders           - 创建订单
 * GET    /api/orders/:id       - 订单详情
 * PUT    /api/orders/:id/cancel - 取消订单
 *
 * Header: Authorization: Bearer <token>
 */
const fs = require('fs')

const DATA_FILE = '/tmp/orders.json'

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    }
  } catch (e) { return {} }
}

function saveData(data) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)) } catch (e) { console.error(e) }
}

function getPhone(req) {
  const auth = (req.headers.authorization || '').replace('Bearer ', '')
  if (/^1\d{10}$/.test(auth)) return auth
  return null
}

function ok(res, data) { res.status(200).json({ code: 0, data }) }
function fail(res, s, msg) { res.status(s).json({ code: -1, message: msg }) }

module.exports = async (req, res) => {
  const phone = getPhone(req)
  if (!phone) return fail(res, 401, '未授权')

  const url = req.url || ''
  const idMatch = url.match(/\/api\/orders\/([^/]+)/)
  const id = idMatch ? idMatch[1] : null
  const data = loadData()
  const myOrders = data[phone] || []

  try {
    if (req.method === 'GET' && !id) {
      // GET /api/orders?status=pending
      const status = req.query?.status
      const list = status ? myOrders.filter(o => o.status === status) : myOrders
      return ok(res, list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime)))

    } else if (req.method === 'GET' && id) {
      const order = myOrders.find(o => o.id === id)
      if (!order) return fail(res, 404, '订单不存在')
      return ok(res, order)

    } else if (req.method === 'POST') {
      const { title, price, serviceDate } = req.body || {}
      if (!title || !price) return fail(res, 400, '缺少必填字段')
      const order = {
        id: 'ORD' + Date.now().toString().slice(-10),
        title,
        price: Number(price),
        serviceDate: serviceDate || '',
        status: 'pending',
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
        payTime: null,
        completeTime: null
      }
      myOrders.unshift(order)
      data[phone] = myOrders
      saveData(data)
      return ok(res, order)

    } else if (req.method === 'PUT' && id && url.includes('cancel')) {
      const idx = myOrders.findIndex(o => o.id === id)
      if (idx === -1) return fail(res, 404, '订单不存在')
      if (myOrders[idx].status !== 'pending') {
        return fail(res, 400, '只能取消待付款订单')
      }
      myOrders[idx].status = 'cancelled'
      data[phone] = myOrders
      saveData(data)
      return ok(res, myOrders[idx])

    } else {
      return fail(res, 405, '不支持')
    }
  } catch (err) {
    console.error('orders error:', err)
    return fail(res, 500, '服务器错误')
  }
}
