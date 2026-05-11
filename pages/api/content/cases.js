/**
 * 临床案例 API
 * GET /api/content/cases
 */
const data = require('../../../lib/content-data')

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ code: -1, message: 'Method Not Allowed' })
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
  res.json({ code: 0, data: { cases: data.cases, categories: data.caseCategories } })
}
