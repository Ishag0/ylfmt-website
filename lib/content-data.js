/**
 * 内容数据模块 - 官网 & 小程序共享数据源
 * 所有内容数据统一管理，官网和小程序通过 API 获取
 *
 * 修改数据后，官网和小程序将立即同步获取最新内容
 */

// ===== 服务数据 =====
exports.services = [
  {
    id: 1,
    name: '肠道菌群16S基因检测',
    description: '通过16S rRNA高通量测序技术，精准分析肠道菌群多样性，生成个性化肠道健康报告',
    price: 1980,
    category: '检测服务',
    image: '/static/images/dna-test.jpg'
  },
  {
    id: 2,
    name: '深圳肠道菌群精准移植',
    description: '基于AI配方筛选，匹配个性化菌群供体，多途径规范化移植，重建健康肠道微生态',
    price: 8800,
    category: '移植治疗',
    image: '/static/images/transplant.jpg'
  },
  {
    id: 3,
    name: '复合益生元（1个月装）',
    description: '根据肠道检测结果，搭配个性化复合益生元组合，定向促进有益菌增殖',
    price: 680,
    category: '健康管理',
    image: '/static/images/prebiotics.jpg'
  },
  {
    id: 4,
    name: '特色精密体检',
    description: '针对肠道健康定制的深度体检套餐，涵盖菌群检测、代谢评估、免疫功能等',
    price: 2980,
    category: '检测服务',
    image: '/static/images/checkup.jpg'
  },
  {
    id: 5,
    name: '细胞免疫功能评估',
    description: '深度免疫细胞功能检测，评估肠道相关淋巴组织健康状态',
    price: 1280,
    category: '检测服务',
    image: '/static/images/immune.jpg'
  },
  {
    id: 6,
    name: '肠道健康管理方案',
    description: '专业医生+营养师团队全程管理，定期跟踪评估，个性化肠道健康改善方案',
    price: 3680,
    category: '健康管理',
    image: '/static/images/management.jpg'
  }
]

exports.categories = ['全部', '检测服务', '移植治疗', '健康管理']

// ===== 统计数据 =====
exports.stats = [
  { number: '500+', label: '临床合作机构' },
  { number: '2000+', label: '成功治疗案例' },
  { number: '20+', label: '核心专利技术' },
  { number: '6', label: '核心技术平台' }
]

// ===== 核心优势 =====
exports.advantages = [
  { icon: 'staff', iconBg: '#EFF6FF', iconColor: '#3B82F6', title: 'P2级实验室', desc: '符合国家生物安全等级标准' },
  { icon: 'color', iconBg: '#F0FDF4', iconColor: '#22C55E', title: 'AI精准配型', desc: '机器学习算法智能匹配最优菌群配方' },
  { icon: 'database', iconBg: '#FEF3C7', iconColor: '#D97706', title: '亚洲超规模化供体库', desc: '严格筛选与动态监测的健康肠菌供体' }
]

// ===== 技术平台 =====
exports.techPlatforms = [
  '生物信息平台',
  '微生物供体库',
  'AI配方筛选平台',
  '制剂研发平台',
  'GMP生产平台',
  '临床转化平台'
]

// ===== 疾病覆盖 =====
exports.diseases = [
  '炎症性肠病',
  '艰难梭菌感染',
  '神经精神系统',
  '代谢性疾病',
  '肿瘤免疫',
  '自身免疫',
  '呼吸道疾病',
  '心脑血管'
]

// ===== 发展历程 =====
exports.timeline = [
  { year: '2018', event: '源龄生命成立，启动肠道菌群移植技术研发布局' },
  { year: '2019', event: 'P2级微生物实验室落成，肠菌供体库初步建立' },
  { year: '2020', event: 'HMT 2.0体系发布，与首批三甲医院开展临床合作' },
  { year: '2022', event: 'AI配方筛选平台上线，临床合作机构突破200家' },
  { year: '2024', event: 'HMT 4.0精准移植体系发布，成功案例突破2000例' }
]

// ===== 合作伙伴 =====
exports.partners = [
  { name: '深圳大学医学部', icon: 'flag' },
  { name: '清华大学深圳研究生院', icon: 'flag' },
  { name: '香港中文大学（深圳）', icon: 'flag' },
  { name: '深圳市第三人民医院', icon: 'hospital' },
  { name: '中山大学附属第七医院', icon: 'hospital' },
  { name: '深圳市儿童医院', icon: 'hospital' },
  { name: '深圳市第二人民医院', icon: 'hospital' },
  { name: '华大基因（BGI）', icon: 'medal' }
]

// ===== 新闻资讯 =====
exports.news = [
  {
    id: 1,
    title: '柳叶刀预警：90后的肠道正在经历癌变',
    date: '2026-04-27',
    summary: '年轻人结直肠癌发病率急剧上升，《柳叶刀》数据震惊医学界，肠道菌群失衡是核心诱因之一。',
    content: '《柳叶刀》最新研究显示，1990年后出生人群的结直肠癌发病率较此前世代上升了50%以上。研究人员指出，肠道菌群多样性下降、特定致病菌增多与年轻人群肠道癌变密切相关。\n\n源龄生命提醒：定期肠道菌群检测，早发现、早干预，是预防肠道肿瘤的重要手段。HMT 4.0精准移植技术可有效重建健康菌群，降低肠道疾病风险。',
    cover: ''
  },
  {
    id: 2,
    title: '一次抗生素，肠道伤8年？',
    date: '2026-04-27',
    summary: '研究证实一次抗生素治疗可导致肠道菌群多样性下降长达8年。HMT 是抗生素后菌群重建的有效手段。',
    content: '最新发表在《自然》子刊的研究显示，单次抗生素治疗可对肠道菌群造成长期影响，部分人群的菌群多样性在8年后仍未完全恢复。\n\n对于反复使用抗生素的患者，HMT 肠道菌群移植可快速重建受损的肠道微生态，恢复菌群多样性，降低继发感染和代谢疾病风险。',
    cover: ''
  },
  {
    id: 3,
    title: '光脚走路、冰地睡觉，自闭孩子喜冷背后真相',
    date: '2026-04-27',
    summary: '自闭症儿童的感觉异常行为与肠道菌群紊乱密切相关，肠脑轴研究揭示了行为背后的生物学机制。',
    content: '研究发现，超过70%的自闭症儿童伴有胃肠道症状，感觉异常（如喜冷、触觉敏感）与特定菌群失衡高度相关。肠脑轴机制研究表明，菌群代谢产物可直接影响大脑发育和行为表现。\n\n源龄生命 HMT 治疗儿童自闭症临床研究显示，移植后患儿肠道症状显著改善，同时行为评分明显提升。',
    cover: ''
  },
  {
    id: 4,
    title: '老祖宗没骗你！中医脾虚湿气重的千古悬案',
    date: '2026-04-27',
    summary: '现代肠道菌群研究破译中医"脾虚湿气"的科学本质，特定菌群失衡正是湿邪困脾的微生物学解释。',
    content: '"脾虚湿盛"是中医经典理论，但长期以来缺乏现代科学解释。最新研究证实，脾虚人群普遍存在肠道菌群紊乱——双歧杆菌、乳酸杆菌等有益菌减少，条件致病菌增多，导致营养吸收障碍和代谢废物堆积（即"湿"）。\n\nHMT 移植通过重建健康菌群，从微生态层面改善"脾虚湿盛"状态，为中西医结合治疗提供了新思路。',
    cover: ''
  },
  {
    id: 5,
    title: '癫痫家长必看',
    date: '2026-04-27',
    summary: '肠道菌群与癫痫发作频率存在显著关联，临床研究表明 HMT 干预可使部分难治性癫痫患者发作减少。',
    content: '研究显示，癫痫患者肠道菌群多样性显著低于健康人群，特定菌群代谢产物可影响神经元兴奋性。临床研究表明，部分难治性癫痫患者在接受 HMT 治疗后，发作频率下降超过50%，且未出现明显不良反应。\n\n源龄生命正在开展 HMT 辅助治疗癫痫的临床观察项目，为癫痫患者提供新的干预思路。',
    cover: ''
  },
  {
    id: 6,
    title: '肝脏的"救命稻草"找到了！',
    date: '2026-04-27',
    summary: '最新研究发现，特定肠道菌群产生的短链脂肪酸是保护肝细胞的关键信号分子。',
    content: '肝脏与肠道通过"肝肠循环"密切相连，肠道菌群代谢产物（尤其是短链脂肪酸）可直接调节肝细胞功能，减轻炎症反应和纤维化进程。\n\n临床研究显示，HMT 移植可改善非酒精性脂肪肝（NAFLD）患者的肝功能指标，降低肝酶水平，为肝病辅助治疗提供了新选择。',
    cover: ''
  },
  {
    id: 7,
    title: '消除身体慢性炎症只需3步',
    date: '2026-04-27',
    summary: '通过调整饮食结构、优化菌群组成、靶向干预炎症通路，三步重建免疫平衡。',
    content: '慢性低度炎症是多种疾病的共同土壤——糖尿病、心血管病、肿瘤、神经退行性疾病均与长期炎症有关。\n\n源龄生命提出三步方案：① 个性化饮食调整（基于菌群检测报告）；② HMT 精准菌群移植；③ 复合益生元维持。临床数据显示，该方案可使炎症因子（IL-6、TNF-α）水平下降40%以上。',
    cover: ''
  },
  {
    id: 8,
    title: '这种"长毛"食物，竟是肠道的顶级救星？',
    date: '2026-04-27',
    summary: '发酵食品中的益生菌和益生元协同作用，被证实能显著提升肠道菌群多样性。',
    content: '发酵食品（酸奶、纳豆、泡菜、康普茶等）富含活性益生菌和微生物代谢产物，被证实能快速提升肠道菌群多样性。研究显示，每日摄入发酵食品的人群，肠道有益菌丰度高出非摄入人群35%。\n\n但需注意：发酵食品不能替代标准治疗。对于菌群严重失衡人群，HMT 精准移植仍是最高效的干预手段。',
    cover: ''
  },
  {
    id: 9,
    title: '练肌肉逆转脑龄？62岁开始也能让大脑年轻！',
    date: '2026-04-27',
    summary: '规律力量训练可通过肠-脑轴改善认知功能，激活神经可塑性，有效逆转大脑老化进程。',
    content: '最新发表在《自然·衰老》的研究显示，规律力量训练可通过肠-脑轴改善认知功能。运动后，骨骼肌释放的肌动蛋白和肠道菌群代谢产物协同作用，促进海马体神经发生，提升记忆力和学习能力。\n\n研究同时发现，结合 HMT 菌群移植，可进一步增强运动对大脑的获益——菌群代谢产物（如丁酸盐）是运动-大脑获益的关键介质。',
    cover: ''
  }
]

// ===== 临床案例 =====
exports.cases = [
  {
    id: 1,
    disease: '溃疡性结肠炎',
    patient: '45岁，男性，病程8年',
    icon: 'person',
    summary: '腹痛、腹泻症状显著改善，黏膜愈合率达78%，激素用量减少90%',
    detail: {
      background: '患者确诊溃疡性结肠炎8年，长期依赖激素和免疫抑制剂治疗，症状反复，严重影响生活质量。',
      treatment: '接受3个疗程 HMT 精准菌群移植治疗，配合个性化饮食管理方案。',
      result: '腹痛、腹泻症状显著改善，肠镜复查显示黏膜愈合率达78%。激素用量减少90%，免疫指标恢复正常。随访12个月病情稳定。',
      duration: '治疗周期：3个月（3个疗程）',
      improvement: '黏膜愈合率78%，激素减量90%'
    }
  },
  {
    id: 2,
    disease: '儿童自闭症',
    patient: '6岁，男性',
    icon: 'person',
    summary: '胃肠道症状明显缓解，ABC量表评分改善23%，睡眠质量提升',
    detail: {
      background: '患儿确诊孤独症谱系障碍（ASD），伴有严重胃肠道症状（便秘、腹胀、食物不耐受），行为问题突出。',
      treatment: 'HMT 肠道菌群移植治疗，同步进行饮食干预和肠道菌群检测跟踪。',
      result: '治疗8周后，胃肠道症状明显缓解，便秘消失。ABC（孤独症行为量表）评分改善23%，睡眠质量和情绪稳定性显著提升，社交反应能力有所改善。',
      duration: '治疗周期：8周',
      improvement: 'ABC评分改善23%，胃肠症状缓解'
    }
  },
  {
    id: 3,
    disease: '艰难梭菌感染',
    patient: '62岁，女性',
    icon: 'person',
    summary: '感染完全清除，随访6个月无复发（方案被纳入国家医保指南）',
    detail: {
      background: '患者反复发生艰难梭菌感染（rCDI），经多轮抗生素治疗无效，严重腹泻导致脱水和营养不良。',
      treatment: 'HMT 单次菌群移植治疗。',
      result: '治疗后腹泻症状迅速缓解，复查艰难梭菌毒素阴性。随访6个月无复发。该治疗方案已被纳入国家医保指南推荐。',
      duration: '治疗周期：单次移植',
      improvement: '感染完全清除，6个月无复发'
    }
  },
  {
    id: 4,
    disease: '2型糖尿病合并肥胖',
    patient: '51岁，男性，BMI 31.2',
    icon: 'person',
    summary: '空腹血糖下降31%，体重减轻8.5kg，HbA1c由8.9%降至7.1%',
    detail: {
      background: '患者确诊2型糖尿病5年，口服降糖药控制不佳，BMI 31.2，伴有代谢综合征。',
      treatment: 'HMT 联合复合益生元治疗方案，持续12周，配合饮食和运动干预。',
      result: '空腹血糖由9.8 mmol/L 降至6.8 mmol/L（下降31%），体重减轻8.5kg，HbA1c 由8.9% 降至7.1%。胰岛素敏感性显著提升。',
      duration: '治疗周期：12周',
      improvement: '空腹血糖降31%，体重减8.5kg'
    }
  },
  {
    id: 5,
    disease: '帕金森症伴严重便秘',
    patient: '68岁，男性，病程5年',
    icon: 'person',
    summary: '便秘症状显著改善，运动症状（静止性震颤、行动迟缓）也有缓解',
    detail: {
      background: '患者确诊帕金森病5年，长期便秘（每周排便<2次），静止性震颤和行动迟缓逐渐加重，口服美多芭控制。',
      treatment: 'HMT 肠道菌群移植治疗，评估肠-脑轴功能改善情况。',
      result: '治疗4周后，便秘症状显著改善（每周排便4-5次）。随访3个月，运动症状（静止性震颤、行动迟缓）也有一定程度缓解，生活质量评分提高。',
      duration: '治疗周期：4周',
      improvement: '便秘改善，运动症状缓解'
    }
  },
  {
    id: 6,
    disease: '肿瘤免疫联合治疗',
    patient: '52岁，男性，晚期非小细胞肺癌',
    icon: 'person',
    summary: '免疫治疗客观缓解率（ORR）从28%提升至52%，无进展生存期（PFS）延长',
    detail: {
      background: '患者晚期非小细胞肺癌，接受 PD-1 单抗免疫治疗，但疗效不佳（原发性耐药）。',
      treatment: 'PD-1 单抗联合 HMT 肠道菌群移植治疗，改善肿瘤免疫微环境。',
      result: '联合治疗后，免疫治疗客观缓解率（ORR）从单用 PD-1 的28% 提升至52%。患者无进展生存期（PFS）显著延长，生活质量改善。该方向为肿瘤免疫治疗提供了新的联合策略。',
      duration: '治疗周期：8周（联合治疗）',
      improvement: 'ORR 从28%提升至52%'
    }
  }
]

exports.caseCategories = ['全部', '炎症性肠病', '自闭症', '感染性疾病', '代谢性疾病', '神经精神系统', '肿瘤免疫']

// ===== 权威共识 =====
exports.consensusCategories = [
  { label: '全部', value: 'all' },
  { label: '指南共识', value: '指南共识' },
  { label: '孤独症', value: '孤独症' },
  { label: '炎症性肠病', value: '炎症性肠病' },
  { label: '肠脑轴', value: '肠脑轴' },
  { label: '市场报告', value: '市场报告' },
  { label: '国际研究', value: '国际研究' }
]

exports.consensusList = [
  {
    id: 1,
    title: '肠道菌群移植临床应用管理中国专家共识（2022版）',
    desc: '国家卫生系统权威发布，规范FMT临床操作流程、适应症筛选、供体管理及安全评估标准，是国内FMT领域最高指导依据。',
    tags: ['指南共识', '中国'],
    tagColors: ['#0891B2', '#64748B'],
    author: '中国专家委员会',
    year: '2022',
    icon: 'staff',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6'
  },
  {
    id: 2,
    title: '《洗涤粪菌质量控制和粪菌样本分级》GB/T 41910-2022',
    desc: '国家推荐性标准，首次从国家层面规范洗涤粪菌制备的质控流程和样本分级体系，是菌群制备合规化的重要里程碑。',
    tags: ['国家标准', '质控'],
    tagColors: ['#22C55E', '#64748B'],
    author: '国家标准化管理委员会',
    year: '2022',
    icon: 'shield',
    iconBg: '#F0FDF4',
    iconColor: '#22C55E'
  },
  {
    id: 3,
    title: '肠菌移植治疗儿童孤独症谱系障碍中国专家共识（2024）',
    desc: '国内首部针对儿童ASD菌群移植治疗的专家共识，明确适应症、剂量、疗程及疗效评估标准，为ASD家庭提供循证依据。',
    tags: ['孤独症', '2024'],
    tagColors: ['#8B5CF6', '#64748B'],
    author: '中国专家委员会',
    year: '2024',
    icon: 'heart',
    iconBg: '#FDF4FF',
    iconColor: '#8B5CF6',
    category: '孤独症'
  },
  {
    id: 4,
    title: '肠菌移植治疗炎症性肠病专家共识（2025版）',
    desc: '最新2025年版IBD菌群移植治疗共识，涵盖克罗恩病、溃疡性结肠炎的移植方案、维持治疗及复发处理策略。',
    tags: ['炎症性肠病', '2025'],
    tagColors: ['#F97316', '#64748B'],
    author: '中华医学会',
    year: '2025',
    icon: 'medal',
    iconBg: '#FFF7ED',
    iconColor: '#F97316',
    category: '炎症性肠病'
  },
  {
    id: 5,
    title: '肝硬化患者粪菌移植治疗指南',
    desc: '针对肝硬化肝性脑病、自发性腹膜炎等并发症，系统阐述FMT干预时机、路径选择及安全性监测的临床指南。',
    tags: ['肝病', '指南'],
    tagColors: ['#EF4444', '#64748B'],
    author: '肝病学会',
    year: '2024',
    icon: 'heart-filled',
    iconBg: '#FFF1F2',
    iconColor: '#EF4444'
  },
  {
    id: 6,
    title: '孤独症谱系障碍儿童健康管理专家共识',
    desc: '系统性覆盖ASD儿童膳食营养、行为干预、肠道管理等健康管理全流程，为综合干预提供权威参考框架。',
    tags: ['孤独症', '健康管理'],
    tagColors: ['#22C55E', '#64748B'],
    author: '儿童健康专家组',
    year: '2024',
    icon: 'person',
    iconBg: '#ECFDF5',
    iconColor: '#22C55E',
    category: '孤独症'
  },
  {
    id: 7,
    title: '粪菌移植治疗儿童孤独症谱系障碍的研究进展',
    desc: '系统综述FMT干预ASD儿童的国内外临床研究数据，汇总肠道菌群改善与行为症状改善的相关性证据。',
    tags: ['孤独症', '研究进展'],
    tagColors: ['#0891B2', '#64748B'],
    author: '王丽红 等',
    year: '2024',
    icon: 'compose',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    category: '孤独症'
  },
  {
    id: 8,
    title: '孤独症谱系障碍儿童食物不耐受结果的分布特征',
    desc: '揭示ASD儿童食物不耐受的菌群机制，分析小麦、牛奶等常见过敏原与肠道菌群失调的关联规律。',
    tags: ['孤独症', '食物不耐受'],
    tagColors: ['#EAB308', '#64748B'],
    author: '张晓双 等',
    year: '2024',
    icon: 'star',
    iconBg: '#FFFBEB',
    iconColor: '#D97706',
    category: '孤独症'
  },
  {
    id: 9,
    title: '孤独症谱系障碍患儿常见共患问题的识别与处理原则',
    desc: '针对ASD儿童便秘、腹泻、睡眠障碍等高发共患问题，提供规范化识别标准和肠道干预处理方案。',
    tags: ['孤独症', '共患病'],
    tagColors: ['#8B5CF6', '#64748B'],
    author: '专家共识组',
    year: '2024',
    icon: 'help',
    iconBg: '#FDF4FF',
    iconColor: '#8B5CF6',
    category: '孤独症'
  },
  {
    id: 10,
    title: '脑科学视角下的儿童早期发展',
    desc: '从神经科学与肠脑轴双重视角阐释早期肠道菌群定植对大脑发育的关键影响，揭示菌群干预的最佳时间窗口。',
    tags: ['肠脑轴', '儿童发展'],
    tagColors: ['#0891B2', '#64748B'],
    author: '儿童发展研究院',
    year: '2024',
    icon: 'eye',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    category: '肠脑轴'
  },
  {
    id: 11,
    title: '植物乳杆菌PS128在精神、心理疾病的应用',
    desc: '系统综述植物乳杆菌PS128（情绪益生菌）通过肠脑轴干预焦虑、抑郁、ASD等精神心理疾病的临床证据。',
    tags: ['益生菌', '肠脑轴'],
    tagColors: ['#22C55E', '#64748B'],
    author: '2024年最新综述',
    year: '2024',
    icon: 'leaf',
    iconBg: '#F0FDF4',
    iconColor: '#22C55E',
    category: '肠脑轴'
  },
  {
    id: 12,
    title: '乳糖在肠道的代谢与乳糖不耐受症',
    desc: '深入解析乳糖不耐受的菌群机制，说明肠道菌群组成如何决定个体乳糖代谢能力，为饮食干预提供科学依据。',
    tags: ['营养代谢', '肠道'],
    tagColors: ['#F97316', '#64748B'],
    author: '消化营养学研究',
    year: '2024',
    icon: 'gift',
    iconBg: '#FFF7ED',
    iconColor: '#F97316',
    category: '肠脑轴'
  },
  {
    id: 13,
    title: '维生素D调节肠道菌群改善ASD儿童临床症状',
    desc: '临床研究证实维生素D通过调节肠道菌群组成，显著改善ASD儿童的社交障碍、刻板行为等核心症状。',
    tags: ['维生素D', '孤独症'],
    tagColors: ['#EF4444', '#64748B'],
    author: '任姣姣 等',
    year: '2024',
    icon: 'sunny',
    iconBg: '#FFF1F2',
    iconColor: '#EF4444',
    category: '孤独症'
  },
  {
    id: 14,
    title: '2024肠道微生物组研究白皮书',
    desc: '全面梳理全球肠道微生物组研究现状、技术突破与市场规模，预测未来5年肠道健康产业的核心发展趋势。',
    tags: ['市场报告', '行业'],
    tagColors: ['#22C55E', '#64748B'],
    author: '行业研究机构',
    year: '2024',
    icon: 'chartbar',
    iconBg: '#ECFDF5',
    iconColor: '#22C55E',
    category: '市场报告'
  },
  {
    id: 15,
    title: '菌群移植的市场前景分析',
    desc: '深度分析菌群移植赛道的市场规模、竞争格局和政策红利，揭示FMT/HMT商业化进程的核心驱动力与投资逻辑。',
    tags: ['市场分析', '前景'],
    tagColors: ['#0891B2', '#64748B'],
    author: '产业研究报告',
    year: '2024',
    icon: 'trendcharts',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    category: '市场报告'
  },
  {
    id: 16,
    title: '上海市卫生健康委菌群移植管理规范',
    desc: '上海率先出台地方性菌群移植管理规范，从机构资质、操作规程到患者保护全流程立规，具有重要示范意义。',
    tags: ['地方政策', '上海'],
    tagColors: ['#8B5CF6', '#64748B'],
    author: '上海市卫健委',
    year: '2024',
    icon: 'flag',
    iconBg: '#FDF4FF',
    iconColor: '#8B5CF6'
  },
  {
    id: 17,
    title: '肠炎治疗用嗜黏蛋白阿克曼氏菌（Akk）技术规范',
    desc: '立项调研通知，启动Akk菌相关五项团体标准制定工作，推动下一代益生菌的标准化与产业化进程。',
    tags: ['团体标准', 'Akk菌'],
    tagColors: ['#F97316', '#64748B'],
    author: '团体标准委员会',
    year: '2024',
    icon: 'compose',
    iconBg: '#FFF7ED',
    iconColor: '#F97316'
  }
]

// ===== 商务合作 =====
exports.cooperationModels = [
  {
    id: 1,
    title: 'OEM 定制合作',
    icon: 'cog',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6',
    subtitle: '为医疗机构、科研单位提供 HMT 产品 OEM 定制服务',
    desc: '快速建立自有品牌肠道菌群移植解决方案，无需从零搭建实验室和技术团队。源龄生命提供从配方设计、制剂生产到技术培训的完整 OEM 服务。',
    advantages: [
      'P2 级实验室资质共享，快速合规',
      '亚洲超规模化肠菌供体库支持',
      'HMT 4.0 精准移植体系完整授权',
      '从生产到培训的一站式交付'
    ],
    suitable: '医疗机构、健康管理中心、科研单位'
  },
  {
    id: 2,
    title: '区域代理加盟',
    icon: 'handshake',
    iconBg: '#F0FDF4',
    iconColor: '#22C55E',
    subtitle: '成为源龄生命区域合作伙伴，共享品牌与技术资源',
    desc: '独享区域市场保护政策，共享品牌、技术、产品、运营全维度支持。源龄生命为合作伙伴提供完整的培训体系和市场推广支持，共同开拓肠道健康市场。',
    advantages: [
      '区域独家保护，避免同质化竞争',
      '完整培训体系：技术 + 运营 + 销售',
      '统一品牌支持与市场推广资源',
      '持续产品迭代与技术升级共享'
    ],
    suitable: '有医疗健康行业资源的个人或机构'
  },
  {
    id: 3,
    title: '科研合作项目',
    icon: 'color',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6',
    subtitle: '与高校、科研机构共建联合实验室，开展肠道微生态前沿研究',
    desc: '源龄生命开放 P2 级实验室平台和亚洲超规模化肠菌供体库，与高校、科研院所共建联合实验室，共同申报科研课题与专利成果，推动肠道微生态领域的技术突破。',
    advantages: [
      'P2 级实验室 + 千万级科研设备开放共享',
      '亚洲最大肠菌供体库，样本量超 5000 例',
      '共同申报国家级课题与发明专利',
      '高水平论文联合发表，学术影响力共享'
    ],
    suitable: '高校、科研院所、医院科研中心'
  }
]

exports.contactInfo = {
  wechat: 'ylfmt2050',
  phone: '0755-88888888',
  address: '深圳市南山区源兴科技大厦1-3层',
  hours: '周一至周日 9:00 - 22:00',
  email: 'contact@ylfmt.com',
  icp: '粤ICP备2020141030号-1'
}

// ===== HMT 4.0 流程 =====
exports.hmtSteps = [
  {
    step: '01',
    title: '肠道检测',
    subtitle: '16S rRNA 基因测序',
    desc: '通过高精度 16S rRNA 测序技术，全面解析肠道菌群多样性、丰度及功能特征，生成个性化肠道健康评估报告。',
    icon: 'color',
    iconBg: '#EFF6FF',
    iconColor: '#3B82F6'
  },
  {
    step: '02',
    title: 'AI 分析',
    subtitle: '菌群特征深度解析',
    desc: '基于机器学习算法，将患者菌群数据与百万级健康人群数据库对比，精准识别菌群失衡模式与疾病风险关联。',
    icon: 'compose',
    iconBg: '#F0FDF4',
    iconColor: '#22C55E'
  },
  {
    step: '03',
    title: '配方筛选',
    subtitle: '个性化精准匹配',
    desc: 'AI 智能匹配最优肠菌配方，结合患者疾病类型、代谢特征、免疫状态，生成个性化 HMT 精准移植方案。',
    icon: 'settings',
    iconBg: '#FEF3C7',
    iconColor: '#D97706'
  },
  {
    step: '04',
    title: '供体选取',
    subtitle: '亚洲超规模化供体库',
    desc: '从严格筛选的健康供体库中，匹配最佳肠菌供体。所有供体经过多重检测与动态健康监测，确保菌群制剂安全有效。',
    icon: 'wallet',
    iconBg: '#F5F3FF',
    iconColor: '#8B5CF6'
  },
  {
    step: '05',
    title: '精准移植',
    subtitle: '多途径规范化操作',
    desc: '在医生指导下，通过鼻肠管、灌肠或口服胶囊等多途径完成菌群移植，全程标准化操作，确保移植效率与安全性。',
    icon: 'medal',
    iconBg: '#FEE2E2',
    iconColor: '#EF4444'
  },
  {
    step: '06',
    title: '效果追踪',
    subtitle: '持续管理与评估',
    desc: '移植后定期随访，动态监测肠道菌群重建情况，结合症状改善数据持续优化管理方案，实现长期健康获益。',
    icon: 'chartbar',
    iconBg: '#ECFEFF',
    iconColor: '#06B6D4'
  }
]

exports.hmtAdvantages = [
  { icon: 'aim', iconBg: '#FEE2E2', iconColor: '#EF4444', title: '精准配型', desc: 'AI 驱动，匹配精度提升 40%' },
  { icon: 'cog', iconBg: '#EFF6FF', iconColor: '#3B82F6', title: 'P2 级实验室', desc: '符合国家标准，确保安全可靠' },
  { icon: 'trendingup', iconBg: '#F0FDF4', iconColor: '#22C55E', title: '临床验证', desc: '2000+ 成功案例，疗效显著' },
  { icon: 'loop', iconBg: '#FEF3C7', iconColor: '#D97706', title: '全程管理', desc: '术前评估 → 移植 → 术后随访闭环' }
]

// ===== 常见问题 FAQ =====
exports.faqList = [
  {
    id: 1,
    category: '检测服务',
    question: '什么是肠道菌群 16S 基因检测？',
    answer: '16S rRNA 基因测序是一种高通量测序技术，可精准分析肠道菌群的多样性、丰度及功能特征。通过检测粪便样本中的细菌 DNA，生成个性化肠道健康评估报告，帮助了解肠道微生态状态，为后续干预提供科学依据。'
  },
  {
    id: 2,
    category: '检测服务',
    question: '肠道菌群检测需要多久出结果？',
    answer: '一般情况下，样本送检后 7-10 个工作日可出具检测报告。报告包含菌群多样性分析、有益菌/有害菌评估、疾病风险关联分析，以及个性化干预建议。'
  },
  {
    id: 3,
    category: '检测服务',
    question: '检测前需要做什么准备？',
    answer: '检测前 2 周内尽量避免使用抗生素；检测前 1 天避免大量饮酒和高脂饮食；按采样盒说明正确采集粪便样本，尽快寄回实验室。'
  },
  {
    id: 4,
    category: '移植治疗',
    question: '什么是 HMT 精准菌群移植？',
    answer: 'HMT（Human Microbiota Transplantation）是源龄生命在传统 FMT 基础上研发的精准移植体系（HMT 4.0）。通过 16S 检测 + AI 配方筛选，匹配个性化肠菌供体，实现精准化、个体化的菌群移植治疗。'
  },
  {
    id: 5,
    category: '移植治疗',
    question: 'HMT 治疗过程痛苦吗？',
    answer: 'HMT 治疗根据患者情况可选择多种途径：鼻肠管（轻度不适）、灌肠（无痛）、口服胶囊（最便捷）。整个操作过程在医生监护下进行，安全性高，大多数患者耐受良好。'
  },
  {
    id: 6,
    category: '移植治疗',
    question: 'HMT 治疗效果能维持多久？',
    answer: '多数患者在移植后 2-4 周开始感受到症状改善。效果维持时间因疾病类型和个体差异而异，一般通过 1-3 个疗程可达到较长期稳定效果。配合饮食管理和益生元维持，效果可持续 1 年以上。'
  },
  {
    id: 7,
    category: '移植治疗',
    question: 'HMT 治疗有副作用吗？',
    answer: 'HMT 是安全性较高的生物治疗技术。少数患者可能出现短暂腹胀、腹泻等轻微不适，一般 1-3 天内自行缓解。源龄生命所有供体均经过严格筛查，移植操作符合 GMP 标准，最大限度保障安全。'
  },
  {
    id: 8,
    category: '支付相关',
    question: '服务费用可以医保报销吗？',
    answer: '目前肠道菌群检测和部分 HMT 治疗项目已在部分地区纳入医保报销范围（以当地医保政策为准）。源龄生命正在积极推动更多项目进入医保目录，具体报销比例可咨询客服。'
  },
  {
    id: 9,
    category: '支付相关',
    question: '可以使用优惠券吗？',
    answer: '可以！源龄生命会不定期发放各类优惠券（满减券、折扣券等），在结算页面选择可用优惠券即可自动抵扣。优惠券有使用期限和适用范围，请以券面说明为准。'
  },
  {
    id: 10,
    category: '其他',
    question: '儿童可以做 HMT 治疗吗？',
    answer: '可以。临床研究表明，HMT 治疗儿童自闭症谱系障碍（ASD）、过敏性肠病等疾病效果显著。所有儿童患者治疗前需经过专业医生评估，制定个性化方案，治疗过程有儿科专家全程监护。'
  }
]

exports.faqCategories = ['全部', '检测服务', '移植治疗', '支付相关', '其他']

// ===== 积分商城商品 =====
exports.pointsGoods = [
  { id: 'pg_001', name: '16S基因检测', icon: 'search', iconBg: '#EFF6FF', iconColor: '#3B82F6', category: 'health', categoryLabel: '健康服务', points: 200, stock: 50, description: '免费进行一次16S肠道菌群基因检测，获取个性化肠道健康评估报告' },
  { id: 'pg_002', name: '体检折扣券', icon: 'ticket', iconBg: '#F0FDF4', iconColor: '#22C55E', category: 'health', categoryLabel: '健康服务', points: 150, stock: 30, description: '兑换后享受一次全面健康体检8折优惠，含基础体检+肠道专项' },
  { id: 'pg_003', name: '营养咨询服务', icon: 'chat', iconBg: '#FEFCE8', iconColor: '#EAB308', category: 'health', categoryLabel: '健康服务', points: 100, stock: 100, description: '一对一营养师在线咨询，定制个性化肠道健康饮食方案' },
  { id: 'pg_004', name: '咖啡兑换券', icon: 'wallet', iconBg: '#FFF7ED', iconColor: '#F97316', category: 'life', categoryLabel: '生活福利', points: 80, stock: 200, description: '兑换任意品牌咖啡一杯，支持全国3000+门店使用' },
  { id: 'pg_005', name: '电影观影券', icon: 'videocam', iconBg: '#F5F3FF', iconColor: '#8B5CF6', category: 'life', categoryLabel: '生活福利', points: 150, stock: 80, description: '全国主流影院通用电影票一张，2D/3D均可兑换' },
  { id: 'pg_006', name: '健身周卡', icon: 'flag', iconBg: '#ECFEFF', iconColor: '#06B6D4', category: 'life', categoryLabel: '生活福利', points: 300, stock: 40, description: '合作健身房7天通行卡，支持全国500+门店' },
  { id: 'pg_007', name: '精油礼盒', icon: 'gift', iconBg: '#FEF2F2', iconColor: '#EF4444', category: 'life', categoryLabel: '生活福利', points: 400, stock: 20, description: '精选植物精油礼盒套装，含薰衣草、茶树、薄荷各一瓶' },
  { id: 'pg_008', name: '供体优先匹配', icon: 'star', iconBg: '#FEFCE8', iconColor: '#EAB308', category: 'exclusive', categoryLabel: '专属权益', points: 1000, stock: 10, description: 'HMT移植时享受供体优先匹配权益，缩短等待时间' },
  { id: 'pg_009', name: '专家预约特权', icon: 'staff', iconBg: '#EFF6FF', iconColor: '#3B82F6', category: 'exclusive', categoryLabel: '专属权益', points: 600, stock: 25, description: '优先预约源龄生命专家号，免去排队等待' },
  { id: 'pg_010', name: '年度健康报告', icon: 'medal', iconBg: '#F5F3FF', iconColor: '#8B5CF6', category: 'exclusive', categoryLabel: '专属权益', points: 350, stock: 60, description: '定制化年度肠道健康分析报告，含趋势分析和专家建议' }
]

exports.goodsCategories = [
  { key: 'all', label: '全部' },
  { key: 'health', label: '健康服务' },
  { key: 'life', label: '生活福利' },
  { key: 'exclusive', label: '专属权益' }
]

/**
 * 获取所有内容（聚合接口）
 */
exports.getAll = function () {
  return {
    services: exports.services,
    categories: exports.categories,
    stats: exports.stats,
    advantages: exports.advantages,
    techPlatforms: exports.techPlatforms,
    diseases: exports.diseases,
    timeline: exports.timeline,
    partners: exports.partners,
    news: exports.news,
    cases: exports.cases,
    caseCategories: exports.caseCategories,
    consensusCategories: exports.consensusCategories,
    consensusList: exports.consensusList,
    cooperationModels: exports.cooperationModels,
    contactInfo: exports.contactInfo,
    hmtSteps: exports.hmtSteps,
    hmtAdvantages: exports.hmtAdvantages,
    faqList: exports.faqList,
    faqCategories: exports.faqCategories,
    pointsGoods: exports.pointsGoods,
    goodsCategories: exports.goodsCategories
  }
}
