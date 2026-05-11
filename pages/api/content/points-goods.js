/**
 * 积分商城商品 API
 * GET /api/content/points-goods
 */
const data = require('../../../lib/content-data')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
  res.json({ code: 0, data: { goods: data.pointsGoods, categories: data.goodsCategories } })
}
