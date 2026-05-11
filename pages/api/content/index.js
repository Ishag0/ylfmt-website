/**
 * 内容聚合 API - 返回所有内容数据
 * GET /api/content
 */
const data = require('../../../lib/content-data')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ code: -1, message: 'Method Not Allowed' })

  try {
    const all = data.getAll()
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.json({ code: 0, data: all })
  } catch (err) {
    res.status(500).json({ code: -1, message: err.message })
  }
}
