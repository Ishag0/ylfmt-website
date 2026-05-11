/**
 * 优惠券 API
 * GET    /api/coupons           - 获取优惠券列表
 * POST   /api/coupons/redeem    - 兑换优惠券（凭兑换码）
 *
 * Header: Authorization: Bearer <token>
 */
const fs = require('fs')

const DATA_FILE = '/tmp/coupons.json'

// 默认优惠券种子
const SEED_COUPONS = [
  { id: 'CPN001', name: '新用户专享', type: 'fixed', value: 500, minAmount: 3000, description: '满3000元立减500元', status: 'available', expireDate: '2026-12-31', scene: '全部服务通用' },
  { id: 'CPN002', name: '菌群检测优惠', type: 'percent', value: 15, minAmount: 0, description: '检测服务85折', status: 'available', expireDate: '2026-06-30', scene: '检测服务专用' },
  { id: 'CPN003', name: 'HMT移植立减', type: 'fixed', value: 1000, minAmount: 8000, description: '满8000元立减1000元', status: 'available', expireDate: '2026-07-31', scene: '移植治疗专用' }
]

function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const d = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      // 初始化空用户
      return d
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

module.exports = async (req, res) => {
  const phone = getPhone(req)
  if (!phone) return fail(res, 401, '未授权')

  const url = req.url || ''
  const data = loadData()

  try {
    if (req.method === 'GET' && url === '/api/coupons') {
      // 获取用户优惠券列表（含种子）
      if (!data[phone]) {
        // 首次：发种子优惠券
        data[phone] = SEED_COUPONS.map(c => ({ ...c }))
        saveData(data)
      }
      // 过滤过期
      const now = new Date().toISOString().substring(0, 10)
      const list = (data[phone] || []).map(c => {
        if (c.status === 'available' && c.expireDate < now) {
          c.status = 'expired'
        }
        return c
      })
      return ok(res, list)

    } else if (req.method === 'POST' && url.includes('redeem')) {
      // 兑换优惠券（开发阶段：接受固定兑换码）
      const { code } = req.body || {}
      const CODES = { 'YLFMT888': { id: 'CPN_PROMO', name: '源龄特惠券', type: 'fixed', value: 200, minAmount: 1000, description: '兑换专享200元券', expireDate: '2026-12-31', scene: '全部服务通用' } }
      const promo = CODES[code?.toUpperCase()]
      if (!promo) return fail(res, 400, '兑换码无效')

      if (!data[phone]) data[phone] = [...SEED_COUPONS]
      const exists = data[phone].find(c => c.id === promo.id)
      if (exists) return fail(res, 400, '该优惠券已领取')

      data[phone].push({ ...promo, status: 'available' })
      saveData(data)
      return ok(res, promo)

    } else {
      return fail(res, 405, '不支持')
    }
  } catch (err) {
    console.error('coupons error:', err)
    return fail(res, 500, '服务器错误')
  }
}
