const WxPay = require('wechatpay-node-v3');

/**
 * 创建微信支付预支付订单（JSAPI 小程序支付）
 * POST /api/create-order
 * Body: { description, amount, code, outTradeNo }
 *
 * 小程序传入 login code，后端用 AppID + AppSecret 换取 openid
 */
module.exports = async (req, res) => {
  // 仅允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ code: -1, message: 'Method Not Allowed' });
  }

  try {
    const { description, amount, code, outTradeNo } = req.body || {};

    // 参数校验
    if (!description || !amount || !code || !outTradeNo) {
      return res.status(400).json({
        code: -1,
        message: '缺少必要参数：description, amount, code, outTradeNo',
      });
    }

    // amount 单位：分
    const totalFee = Math.round(Number(amount));
    if (totalFee <= 0) {
      return res.status(400).json({ code: -1, message: '金额必须大于0' });
    }

    // 1. 用 code 换取 openid
    let openid;
    try {
      const tokenUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WECHAT_APPID}&secret=${process.env.WECHAT_SECRET}&js_code=${code}&grant_type=authorization_code`;
      const tokenRes = await fetch(tokenUrl);
      const tokenData = await tokenRes.json();

      if (tokenData.errcode) {
        return res.status(400).json({
          code: -1,
          message: `获取 openid 失败: ${tokenData.errmsg}`,
        });
      }
      openid = tokenData.openid;
    } catch (e) {
      console.error('jscode2session error:', e);
      return res.status(500).json({
        code: -1,
        message: '获取用户身份失败',
      });
    }

    // 2. 创建微信支付实例
    const pay = new WxPay({
      appid: process.env.WECHAT_APPID,
      mchid: process.env.WECHAT_MCH_ID,
      publicKey: process.env.WECHAT_PUBLIC_KEY || '',
      privateKey: process.env.WECHAT_PRIVATE_KEY,
      key: process.env.WECHAT_API_V3_KEY,
    });

    const notifyUrl = process.env.NOTIFY_URL || 'https://new.ylfmt.com/api/order-notify';

    // 3. 调用 JSAPI 下单
    const result = await pay.transactions_jsapi({
      description,
      out_trade_no: outTradeNo,
      notify_url: notifyUrl,
      amount: {
        total: totalFee,
        currency: 'CNY',
      },
      payer: {
        openid,
      },
    });

    // 4. 返回小程序调起支付所需的参数
    res.status(200).json({
      code: 0,
      message: 'ok',
      data: result,
    });
  } catch (err) {
    console.error('create-order error:', err);
    res.status(500).json({
      code: -1,
      message: err.message || '创建订单失败',
    });
  }
};
