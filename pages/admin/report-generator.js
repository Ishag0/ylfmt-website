import { useState } from 'react';

/**
 * 管理端 - AI 报告生成
 * 路径: /admin/report-generator
 * 用于管理端触发 HMT 肠道菌群报告的 AI 生成
 */
export default function ReportGenerator() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  // 患者信息表单
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '男',
    symptoms: '',
  });

  // 检测数据表单
  const [testData, setTestData] = useState({
    summary: '',
    diversity: '',
    pathogens: '',
    beneficial: '',
    recommendations: '',
  });

  const handlePatientChange = (field, value) => {
    setPatient((prev) => ({ ...prev, [field]: value }));
  };

  const handleTestChange = (field, value) => {
    setTestData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!patient.name || !patient.age) {
      setError('请填写患者姓名和年龄');
      return;
    }

    setLoading(true);
    setError('');
    setReport('');

    try {
      const res = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo: {
            ...patient,
            age: Number(patient.age),
          },
          testResult: testData,
        }),
      });

      const data = await res.json();

      if (data.code !== 0) {
        setError(data.message || '生成失败');
        return;
      }

      setReport(data.data.reportContent);
    } catch (err) {
      setError('网络错误：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      alert('报告已复制到剪贴板');
    }
  };

  return (
    <div style={styles.page}>
      {/* 顶部栏 */}
      <div style={styles.header}>
        <h1 style={styles.title}>AI 报告生成器</h1>
        <p style={styles.subtitle}>HMT 肠道菌群检测报告 · 管理端</p>
      </div>

      <div style={styles.main}>
        {/* 左栏：表单 */}
        <div style={styles.formPanel}>
          {/* 患者信息 */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>患者信息</h2>
            <div style={styles.formGrid}>
              <div style={styles.field}>
                <label style={styles.label}>姓名 *</label>
                <input
                  style={styles.input}
                  value={patient.name}
                  onChange={(e) => handlePatientChange('name', e.target.value)}
                  placeholder="患者姓名"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>年龄 *</label>
                <input
                  style={styles.input}
                  type="number"
                  value={patient.age}
                  onChange={(e) => handlePatientChange('age', e.target.value)}
                  placeholder="岁"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>性别</label>
                <select
                  style={styles.input}
                  value={patient.gender}
                  onChange={(e) => handlePatientChange('gender', e.target.value)}
                >
                  <option value="男">男</option>
                  <option value="女">女</option>
                </select>
              </div>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>主诉症状</label>
                <textarea
                  style={{ ...styles.input, minHeight: 60 }}
                  value={patient.symptoms}
                  onChange={(e) => handlePatientChange('symptoms', e.target.value)}
                  placeholder="如：腹泻、腹胀2个月，伴有皮肤湿疹..."
                />
              </div>
            </div>
          </section>

          {/* 检测数据 */}
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>检测数据</h2>
            <p style={styles.hint}>以下字段可选，留空时 AI 会根据上下文推断</p>
            <div style={styles.formGrid}>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>菌群总体评估</label>
                <textarea
                  style={{ ...styles.input, minHeight: 50 }}
                  value={testData.summary}
                  onChange={(e) => handleTestChange('summary', e.target.value)}
                  placeholder="如：菌群多样性偏低，有益菌不足..."
                />
              </div>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>菌群多样性指数</label>
                <input
                  style={styles.input}
                  value={testData.diversity}
                  onChange={(e) => handleTestChange('diversity', e.target.value)}
                  placeholder="如：Shannon指数 2.1"
                />
              </div>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>检出有害菌</label>
                <textarea
                  style={{ ...styles.input, minHeight: 50 }}
                  value={testData.pathogens}
                  onChange={(e) => handleTestChange('pathogens', e.target.value)}
                  placeholder="如：大肠杆菌丰度偏高，幽门螺杆菌检出..."
                />
              </div>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>有益菌丰度</label>
                <textarea
                  style={{ ...styles.input, minHeight: 50 }}
                  value={testData.beneficial}
                  onChange={(e) => handleTestChange('beneficial', e.target.value)}
                  placeholder="如：双歧杆菌偏低，乳酸杆菌正常..."
                />
              </div>
              <div style={{ ...styles.field, gridColumn: '1 / -1' }}>
                <label style={styles.label}>初步建议</label>
                <textarea
                  style={{ ...styles.input, minHeight: 50 }}
                  value={testData.recommendations}
                  onChange={(e) => handleTestChange('recommendations', e.target.value)}
                  placeholder="如：建议补充益生菌，考虑HMT移植..."
                />
              </div>
            </div>
          </section>

          {/* 生成按钮 */}
          <button
            style={{
              ...styles.btn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'AI 正在生成报告...' : '生成 HMT 报告'}
          </button>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {/* 右栏：报告预览 */}
        <div style={styles.reportPanel}>
          <div style={styles.reportHeader}>
            <h2 style={styles.sectionTitle}>报告预览</h2>
            {report && (
              <button style={styles.copyBtn} onClick={handleCopy}>
                复制
              </button>
            )}
          </div>
          <div style={styles.reportContent}>
            {report ? (
              <pre style={styles.reportText}>{report}</pre>
            ) : (
              <div style={styles.placeholder}>
                <div style={styles.placeholderIcon}>📋</div>
                <p>填写左侧信息后点击"生成 HMT 报告"</p>
                <p style={{ fontSize: 13, color: '#94a3b8' }}>
                  AI 将根据检测数据自动生成专业报告
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily:
      "'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #1B4D89 0%, #0891B2 100%)',
    color: '#fff',
    padding: '32px 32px 28px',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    margin: 0,
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.85,
    marginTop: 6,
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    maxWidth: 1200,
    margin: '24px auto',
    padding: '0 24px 48px',
  },
  formPanel: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
  },
  reportPanel: {
    background: '#fff',
    borderRadius: 16,
    padding: 24,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hint: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: -8,
    marginBottom: 12,
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#475569',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    fontSize: 14,
    color: '#0f172a',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  btn: {
    width: '100%',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #1B4D89 0%, #0891B2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.02em',
    marginTop: 8,
  },
  error: {
    color: '#ef4444',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },
  reportHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copyBtn: {
    padding: '4px 14px',
    background: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: 6,
    fontSize: 13,
    cursor: 'pointer',
  },
  reportContent: {
    flex: 1,
    marginTop: 12,
    borderRadius: 8,
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: 16,
    overflow: 'auto',
    maxHeight: '70vh',
  },
  reportText: {
    fontSize: 13,
    lineHeight: 1.8,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#334155',
    fontFamily: 'inherit',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    color: '#94a3b8',
    textAlign: 'center',
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
};
