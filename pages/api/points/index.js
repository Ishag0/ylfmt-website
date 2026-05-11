/**
 * 积分 API（余额 + 历史）
 * GET /api/points/balance  - 获取积分余额
 * GET /api/points/history  - 获取积分明细
 * POST /api/points/earn    - 赚积分
 * POST /api/points/redeem  - 积分兑换
 *
 * Header: Authorization: Bearer <token>
 */
const fs = require('fs')

const DATA_FILE = '/tmp/points.json'

const DEFAULT_DATA = {
  balance: 320,
  history: [
    { id: 'p_001', title: '每日签到', icon: 'calendar', amount: 10, time: '2026-05-06 08:30' },
    { id: 'p_002', title: '完善个人信息', icon: 'person', amount: 30, time: '2026-05-05 14:20' },
    { id: 'p_003', title: '积分兑换', icon: 'gift', amount: -50, time: '2026-05-04 10:05' },
    { id: 'p_004', title: '注册账号', icon: 'flag', amount: 50, time: '2026-05-01 09:00' },
    { id: 'p_005', title: '完成HMT服务', icon: 'checkbox', amount: 200, time: '2026-04-28 16:30' }
  ]
}

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
    }
  } catch (e) { return {} }
}

function saveData(d) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(d, null, 2)) } catch (e) { console.error(e) }
}

function getPhone(req) {
  const auth = (req.headers.authorization || '').replace('Bearer ', '')
  if (/^1\d{10}$/.test(auth)) return auth
  return null
}

function ok(res, data) { res.status(200).json({ code: 0, data }) }
function fail(res, s, msg) { res.status(s).json({ code: -1, message: msg }) }

// 余额计算
function calcBalance(history) {
  return history.reduce((s, h) => s + h.amount, 0)
}

module.exports = async (req, res) => {
  const phone = getPhone(req)
  if (!phone) return fail(res, 401, '未授权')

  const url = req.url || ''
  const data = loadData()

  // 初始化
  if (!data[phone]) {
    data[phone] = { ...DEFAULT_DATA }
    saveData(data)
  }

  const my = data[phone]

  try {
    if (req.method === 'GET' && url === '/api/points/balance') {
      return ok(res, { balance: my.balance || calcBalance(my.history) })

    } else if (req.method === 'GET' && url === '/api/points/history') {
      return ok(res, my.history || [])

    } else if (req.method === 'POST' && url.includes('earn')) {
      const { description, amount } = req.body || {}
      if (!description || !amount || amount <= 0) return fail(res, 400, '参数错误')
      const rec = { id: 'p_' + Date.now(), title: description, icon: 'star', amount: Number(amount), time: new Date().toISOString().replace('T', ' ').substring(0, 19) }
      my.history.unshift(rec)
      my.balance = calcBalance(my.history)
      data[phone] = my
      saveData(data)
      return ok(res, { balance: my.balance })

    } else if (req.method === 'POST' && url.includes('redeem')) {
      const { productId, name, points } = req.body || {}
      if (!productId || !points || points <= 0) return fail(res, 400, '参数错误')
      const bal = my.balance || calcBalance(my.history)
      if (bal < points) return fail(res, 400, '积分不足')
      const rec = { id: 'p_' + Date.now(), title: '兑换 - ' + (name || '商品'), icon: 'gift', amount: -Number(points), time: new Date().toISOString().replace('T', ' ').substring(0, 19) }
      my.history.unshift(rec)
      my.balance = calcBalance(my.history)
      data[phone] = my
      saveData(data)
      return ok(res, { balance: my.balance })

    } else {
      return fail(res, 405, '不支持')
    }
  } catch (err) {
    console.error('points error:', err)
    return fail(res, 500, '服务器错误')
  }
}
