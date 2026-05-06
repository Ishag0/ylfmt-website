const WxPay = require('wechatpay-node-v3');

/**
 * 微信支付回调通知
 * POST /api/order-notify
 */
module.exports = async (req, res) => {
  // 仅允许 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ code: 'FAIL', message: 'Method Not Allowed' });
  }

  try {
    const { resource } = req.body || {};

    if (!resource) {
      return res.status(400).json({ code: 'FAIL', message: 'Missing resource' });
    }

    const pay = new WxPay({
      appid: process.env.WECHAT_APPID,
      mchid: process.env.WECHAT_MCH_ID,
      publicKey: process.env.WECHAT_PUBLIC_KEY || '',
      privateKey: process.env.WECHAT_PRIVATE_KEY,
      key: process.env.WECHAT_API_V3_KEY,
    });

    // 解密通知内容（AES-256-GCM，密钥为 APIv3 Key）
    let decryptedData;
    try {
      decryptedData = pay.decipher_gcm(
        resource.ciphertext,
        resource.associated_data,
        resource.nonce,
        process.env.WECHAT_API_V3_KEY
      );
    } catch (e) {
      console.error('decrypt error:', e);
      return res.status(400).json({ code: 'FAIL', message: 'Decrypt failed' });
    }

    const data = typeof decryptedData === 'string' ? JSON.parse(decryptedData) : decryptedData;
    console.log('Payment notification:', JSON.stringify(data));

    // 验证 appid
    if (data.appid !== process.env.WECHAT_APPID) {
      console.error('appid mismatch:', data.appid);
      return res.status(400).json({ code: 'FAIL', message: 'AppID mismatch' });
    }

    const { out_trade_no, trade_state, transaction_id, amount } = data;

    if (trade_state === 'SUCCESS') {
      console.log(`Payment SUCCESS: order=${out_trade_no}, tx=${transaction_id}, amount=${amount?.total}`);
      // TODO: 在这里处理支付成功逻辑
      // 例如：更新数据库订单状态、发送通知等
      // 当前为纯静态站无数据库，仅打印日志
    }

    // 按微信文档要求返回成功
    res.status(200).json({ code: 'SUCCESS', message: 'OK' });
  } catch (err) {
    console.error('order-notify error:', err);
    res.status(500).json({ code: 'FAIL', message: err.message || 'Internal error' });
  }
};
