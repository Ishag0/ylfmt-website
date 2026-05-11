/**
 * 首页内容 API（统计数据、优势、合作伙伴等）
 * GET /api/content/homepage
 */
const data = require('../../../lib/content-data')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
  res.json({
    code: 0,
    data: {
      services: data.services,
      stats: data.stats,
      advantages: data.advantages,
      techPlatforms: data.techPlatforms,
      diseases: data.diseases,
      timeline: data.timeline,
      partners: data.partners,
      contactInfo: data.contactInfo,
      hmtSteps: data.hmtSteps,
      hmtAdvantages: data.hmtAdvantages
    }
  })
}
