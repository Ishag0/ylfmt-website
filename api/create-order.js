// 微信支付配置（优先读取环境变量，fallback 使用硬编码值）
const WECHAT_APPID = process.env.WECHAT_APPID || 'wx751372bd77820f51';
const WECHAT_SECRET = process.env.WECHAT_SECRET || 'b694128a33b804d2260b2afe0caf77b5';
const WECHAT_MCH_ID = process.env.WECHAT_MCH_ID || '1673286266';
const WECHAT_PRIVATE_KEY = process.env.WECHAT_PRIVATE_KEY || `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfSxB4WtwKhovR
knwg6Hc03/l/ZeBpWypb1tf7WNrKmzwiDnUkF4bCFCuQ/cqB9JgBCtAu6GfQVo0t
J6bYdeq2FfIBxuxplA8X50DE3ofUKJiJP3zM2/X8/ZiRLx8+7JLLUIVcUr2BgpaR
a/lX5OgI7WxxxVyFaxkyFyFhkKJzzQPmBXM4nkf6aMMmyNC2drh74q1z4MPxFSNB
NDoXWQTUYvj5Z3iG6WsSa4aBmKe2dKpPFPOYFao34z0EUZuOJg0vcTDZLJyhdHQf
hnAYMUuTezRhOlukCVAuiq2Etr/oIhnfssQzULb07LlzMfhpdXNW0vWV31AWbTK6
THZmCOQXAgMBAAECggEAGeapKGzRrV7iBRNK1r5gZX+9fyugFlh+11xafUtXRb0w
AntO1zrrZMPWMeFehiiLIUPR1j8bG62OfrhkwCMdcLWm9tHORojoH0ux1aRCeTek
SfdVUKYLKKd59Q1UQIZMmMzkS0tFtCojsQanS6y/xZlUxPWxv8Amkgrg0mJmlavw
zPO2R8aBD/RNP8dBePx/Hra8HYn4BfiOJca8BhumM/5nLu4okWhSfR+fJvp3DFE6
zxCQcw4/lvMmEiZxkXuJBJomtEL2GPbGva+OG1gQjvnPzzd11CT/72tnQlNs91Xp
f6/2jv6SoCcY2yvNXKshS8IofhSY+XSk+3hF+YutYQKBgQD5qJULjZC3NdrT/Jt9
TvqvMp6/LixpaIkhh5VG7B2AY2rvzuGAJPoL6pAsgotWBv1+30VnLuHTJPf2K/qb
M+/JOPKzxh2nkex/x2WZRjT8M9FexlcHZtip5qBRYxEWV688M5vw8s0Ll1d2Qumm
zH99JtO3wPzJ1A2pJBlzggeQ/wKBgQDk9wpTv+fA6HlIzksv+DjiURU6kkeHl9Dn
CwSn+iUUPz5grVctq+xpaWKmWg5C14eh9s16Grcm+pShHl4D7Kme0HgL2BILFjyZ
VoB77xNHqSFsO+F5swaeuTi7thCjnJwOcpb8PICmwuNJtmxEIIwnqQtsbiNqPVWw
gvZHmC4U6QKBgQCLR8Ou6FF+BKuKbHkKlY9BQopRuh7Ix6sJa6yaHovu3ogANXiU
lwxwrXG1gzbczZWKvGDpybvuocc8LRjokTcLGZw9Mx/EJqK8Pq+trP9OXFJH/3r6
BCSH1MRH427a+hwnB9vNtocyGkKPFZFontnZJlojP6VHq+fbHuqcCETUXQKBgQCn
wXy2iedyRqH+Pu+FsPd0kfXc2SpBZXEwprj9neAm6oN4b+hs1Qc84HLf8SF7xdBh
UaOQ8Bv7GiNlvQsjEvXgH1ulSeVGbD9wFZnDtBHLMlcDpwf3k7yo9IplteqRBYCt
cTXAj0+vXyEKc/b1H2ew80Eka7nU8CVlUz7Ai/ZPaQKBgFRa9kyhYFILf45ybwrQ
hyBpPwv8WrWw5MQhawOucP1pYTC4Hd9uS+4VHNacBUmK4naV4buBmfBlYwj/BLkO
7kXV6mLX/wYcjMuS1W1S+7lwHe4l9Xrol2m5CRt2w6WAAoyrbB3fBDXZQFZ7qCbd
TZGWbCy4M4vi6KQrauKRp7a8
-----END PRIVATE KEY-----`;
// ⚠️ APIv3 Key 必须在 Vercel 环境变量中配置 WECHAT_API_V3_KEY
const WECHAT_API_V3_KEY = process.env.WECHAT_API_V3_KEY || '';

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
      const tokenUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPID}&secret=${WECHAT_SECRET}&js_code=${code}&grant_type=authorization_code`;
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
      appid: WECHAT_APPID,
      mchid: WECHAT_MCH_ID,
      publicKey: process.env.WECHAT_PUBLIC_KEY || '',
      privateKey: WECHAT_PRIVATE_KEY,
      key: WECHAT_API_V3_KEY,
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

    // 4. 检查下单结果并返回小程序调起支付所需的参数
    if (result.status !== 200 || !result.data) {
      console.error('transactions_jsapi failed:', result);
      return res.status(500).json({
        code: -1,
        message: result.error || '微信支付下单失败',
      });
    }

    // result.data 已由 wechatpay-node-v3 自动签名为：
    // { appId, timeStamp, nonceStr, package, signType, paySign }
    res.status(200).json({
      code: 0,
      message: 'ok',
      data: result.data,
    });
  } catch (err) {
    console.error('create-order error:', err);
    res.status(500).json({
      code: -1,
      message: err.message || '创建订单失败',
    });
  }
};
