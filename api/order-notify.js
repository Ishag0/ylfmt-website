// 微信支付配置（优先读取环境变量，fallback 使用硬编码值）
const WECHAT_APPID = process.env.WECHAT_APPID || 'wx751372bd77820f51';
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
      appid: WECHAT_APPID,
      mchid: WECHAT_MCH_ID,
      publicKey: process.env.WECHAT_PUBLIC_KEY || '',
      privateKey: WECHAT_PRIVATE_KEY,
      key: WECHAT_API_V3_KEY,
    });

    // 解密通知内容（AES-256-GCM，密钥为 APIv3 Key）
    let decryptedData;
    try {
      decryptedData = pay.decipher_gcm(
        resource.ciphertext,
        resource.associated_data,
        resource.nonce,
        WECHAT_API_V3_KEY
      );
    } catch (e) {
      console.error('decrypt error:', e);
      return res.status(400).json({ code: 'FAIL', message: 'Decrypt failed' });
    }

    const data = typeof decryptedData === 'string' ? JSON.parse(decryptedData) : decryptedData;
    console.log('Payment notification:', JSON.stringify(data));

    // 验证 appid
    if (data.appid !== WECHAT_APPID) {
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
