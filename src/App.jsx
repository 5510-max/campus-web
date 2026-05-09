import { useState } from "react";

// 核心功能
const mainFeatures = [
  { id: "confess", name: "表白墙", icon: "💕", desc: "匿名表白，传递心意", color: "#FF6B8A" },
  { id: "friends", name: "扩列交友", icon: "👋", desc: "认识新朋友，找搭子", color: "#5B8DEF" },
  { id: "study", name: "学习搭子", icon: "📚", desc: "一起学习，互相监督", color: "#4CAF50" },
];

// 用户建议列表
const initSuggestions = [
  { id: 1, title: "增加「二手交易」功能", votes: 328, voted: false },
  { id: 2, title: "增加「失物招领」功能", votes: 256, voted: false },
  { id: 3, title: "增加「兼职信息」功能", votes: 198, voted: false },
  { id: 4, title: "增加「代取快递」功能", votes: 145, voted: false },
  { id: 5, title: "增加「租房信息」功能", votes: 89, voted: false },
];

// 表白墙数据
const confessPosts = [
  { id: 1, content: "图书馆三楼靠窗的女生，你每天都在看法语书，想认识你 🌸", time: "3分钟前", likes: 234 },
  { id: 2, content: "食堂打饭的小哥哥，每次都给我多盛一点，谢谢你呀～", time: "15分钟前", likes: 156 },
  { id: 3, content: "操场跑步的白衣男生，每天晚上都能看到你，加油！", time: "32分钟前", likes: 89 },
];

// 扩列数据
const friendPosts = [
  { id: 1, name: "小王同学", avatar: "😊", tags: ["大三", "计算机", "爱打篮球"], desc: "想找一起打球的兄弟，周末约起！" },
  { id: 2, name: "匿名用户", avatar: "🤗", tags: ["大二", "女生", "爱追剧"], desc: "有没有一起追剧的小伙伴呀" },
  { id: 3, name: "学习小达人", avatar: "😎", tags: ["研一", "图书馆常驻", "爱学习"], desc: "找学习搭子，一起自习打卡" },
];

// 学习搭子数据
const studyPosts = [
  { id: 1, title: "早起打卡群", desc: "每天早上7点起床打卡，坚持21天", members: 23, avatar: "🌅" },
  { id: 2, title: "考研互助组", desc: "2025考研党集合，一起刷题", members: 56, avatar: "📖" },
  { id: 3, title: "英语角", desc: "每周三晚上练口语，欢迎加入", members: 18, avatar: "🗣️" },
];

export default function CampusApp() {
  const [page, setPage] = useState("home");
  const [school, setSchool] = useState("");
  const [suggestions, setSuggestions] = useState(initSuggestions);
  const [newSuggestion, setNewSuggestion] = useState("");

  // 投票
  const vote = (id) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, votes: s.voted ? s.votes - 1 : s.votes + 1, voted: !s.voted } : s
    ));
  };

  // 提交建议
  const submitSuggestion = () => {
    if (!newSuggestion.trim()) return;
    setSuggestions([
      { id: Date.now(), title: newSuggestion, votes: 1, voted: true },
      ...suggestions
    ]);
    setNewSuggestion("");
  };

  // 首页
  if (page === "home") {
    return (
      <div style={styles.container}>
        {/* 顶部 */}
        <div style={styles.header}>
          <div style={styles.logo}>🎓 校园通</div>
          <input
            type="text"
            placeholder="输入你的学校"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            style={styles.schoolInput}
          />
        </div>

        {/* 欢迎语 */}
        <div style={styles.welcome}>
          <div style={styles.welcomeTitle}>你好，同学 👋</div>
          <div style={styles.welcomeSub}>今天想做什么？</div>
        </div>

        {/* 核心功能 */}
        <div style={styles.features}>
          {mainFeatures.map((f) => (
            <div 
              key={f.id} 
              style={{...styles.featureCard, borderLeft: `4px solid ${f.color}`}}
              onClick={() => setPage(f.id)}
            >
              <div style={styles.featureIcon}>{f.icon}</div>
              <div style={styles.featureInfo}>
                <div style={styles.featureName}>{f.name}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 功能建议 */}
        <div style={styles.suggestSection}>
          <div style={styles.sectionTitle}>
            💡 你想要什么功能？
            <span style={styles.sectionSub}>投票决定新功能</span>
          </div>
          {suggestions.slice(0, 3).map((s) => (
            <div key={s.id} style={styles.suggestItem}>
              <div style={styles.suggestTitle}>{s.title}</div>
              <button 
                style={{
                  ...styles.voteBtn,
                  background: s.voted ? "#5B8DEF" : "#f0f0f0",
                  color: s.voted ? "#fff" : "#666"
                }}
                onClick={() => vote(s.id)}
              >
                👍 {s.votes}
              </button>
            </div>
          ))}
          <button style={styles.moreBtn} onClick={() => setPage("suggest")}>
            查看更多 →
          </button>
        </div>

        {/* 底部导航 */}
        <div style={styles.bottomNav}>
          <div style={{...styles.navItem, color: "#5B8DEF"}}>首页</div>
          <div style={styles.navItem} onClick={() => setPage("suggest")}>建议</div>
          <div style={styles.navItem}>我的</div>
        </div>
      </div>
    );
  }

  // 表白墙
  if (page === "confess") {
    return (
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← 返回</button>
          <div style={styles.pageTitle}>💕 表白墙</div>
        </div>
        <div style={styles.postList}>
          {confessPosts.map((p) => (
            <div key={p.id} style={styles.postCard}>
              <div style={styles.postContent}>{p.content}</div>
              <div style={styles.postFooter}>
                <span style={styles.postTime}>{p.time}</span>
                <span>❤️ {p.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <button style={styles.publishBtn}>发布表白</button>
      </div>
    );
  }

  // 扩列交友
  if (page === "friends") {
    return (
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← 返回</button>
          <div style={styles.pageTitle}>👋 扩列交友</div>
        </div>
        <div style={styles.postList}>
          {friendPosts.map((p) => (
            <div key={p.id} style={styles.friendCard}>
              <div style={styles.friendHeader}>
                <span style={styles.friendAvatar}>{p.avatar}</span>
                <span style={styles.friendName}>{p.name}</span>
              </div>
              <div style={styles.friendTags}>
                {p.tags.map((t, i) => (
                  <span key={i} style={styles.tag}>{t}</span>
                ))}
              </div>
              <div style={styles.friendDesc}>{p.desc}</div>
              <button style={styles.connectBtn}>+ 添加好友</button>
            </div>
          ))}
        </div>
        <button style={styles.publishBtn}>发布扩列</button>
      </div>
    );
  }

  // 学习搭子
  if (page === "study") {
    return (
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← 返回</button>
          <div style={styles.pageTitle}>📚 学习搭子</div>
        </div>
        <div style={styles.postList}>
          {studyPosts.map((p) => (
            <div key={p.id} style={styles.studyCard}>
              <div style={styles.studyHeader}>
                <span style={styles.studyAvatar}>{p.avatar}</span>
                <div style={styles.studyInfo}>
                  <div style={styles.studyTitle}>{p.title}</div>
                  <div style={styles.studyMembers}>{p.members}人已加入</div>
                </div>
              </div>
              <div style={styles.studyDesc}>{p.desc}</div>
              <button style={styles.joinBtn}>加入小组</button>
            </div>
          ))}
        </div>
        <button style={styles.publishBtn}>创建小组</button>
      </div>
    );
  }

  // 功能建议页
  if (page === "suggest") {
    return (
      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← 返回</button>
          <div style={styles.pageTitle}>💡 功能建议</div>
        </div>
        
        {/* 提交建议 */}
        <div style={styles.submitBox}>
          <input
            type="text"
            placeholder="你想要什么功能？"
            value={newSuggestion}
            onChange={(e) => setNewSuggestion(e.target.value)}
            style={styles.input}
          />
          <button style={styles.submitBtn} onClick={submitSuggestion}>提交</button>
        </div>

        {/* 建议列表 */}
        <div style={styles.suggestList}>
          {suggestions.sort((a, b) => b.votes - a.votes).map((s, i) => (
            <div key={s.id} style={styles.suggestCard}>
              <div style={styles.rank}>#{i + 1}</div>
              <div style={styles.suggestContent}>
                <div style={styles.suggestTitle}>{s.title}</div>
                <div style={styles.suggestVotes}>
                  <button 
                    style={{
                      ...styles.voteBtnLarge,
                      background: s.voted ? "#5B8DEF" : "#f0f0f0",
                      color: s.voted ? "#fff" : "#666"
                    }}
                    onClick={() => vote(s.id)}
                  >
                    👍 {s.votes} 票
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

// 样式
const styles = {
  container: {
    maxWidth: "480px",
    margin: "0 auto",
    minHeight: "100vh",
    background: "#f8f9fa",
    paddingBottom: "80px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  header: {
    background: "#fff",
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  schoolInput: {
    border: "1px solid #ddd",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "14px",
    width: "140px",
    outline: "none",
  },
  welcome: {
    padding: "30px 20px 20px",
  },
  welcomeTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "8px",
  },
  welcomeSub: {
    fontSize: "16px",
    color: "#888",
  },
  features: {
    padding: "0 20px",
  },
  featureCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    cursor: "pointer",
  },
  featureIcon: {
    fontSize: "32px",
    marginRight: "16px",
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "4px",
  },
  featureDesc: {
    fontSize: "14px",
    color: "#888",
  },
  suggestSection: {
    padding: "20px",
    marginTop: "10px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  },
  sectionSub: {
    fontSize: "14px",
    color: "#888",
    fontWeight: "normal",
    marginLeft: "8px",
  },
  suggestItem: {
    background: "#fff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  suggestTitle: {
    fontSize: "15px",
    color: "#333",
  },
  voteBtn: {
    border: "none",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "14px",
    cursor: "pointer",
  },
  moreBtn: {
    width: "100%",
    padding: "12px",
    background: "none",
    border: "1px solid #ddd",
    borderRadius: "10px",
    color: "#666",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "10px",
  },
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#fff",
    display: "flex",
    justifyContent: "space-around",
    padding: "16px 0",
    borderTop: "1px solid #eee",
    maxWidth: "480px",
    margin: "0 auto",
  },
  navItem: {
    fontSize: "14px",
    color: "#888",
    cursor: "pointer",
  },
  // 页面头部
  pageHeader: {
    background: "#fff",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#5B8DEF",
    cursor: "pointer",
    padding: 0,
  },
  pageTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "16px",
  },
  postList: {
    padding: "16px 20px",
  },
  postCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  postContent: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
    marginBottom: "12px",
  },
  postFooter: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#888",
  },
  postTime: {
    color: "#aaa",
  },
  publishBtn: {
    position: "fixed",
    bottom: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#5B8DEF",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    padding: "14px 40px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(91,141,239,0.3)",
  },
  // 好友卡片
  friendCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  friendHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  friendAvatar: {
    fontSize: "32px",
    marginRight: "12px",
  },
  friendName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
  friendTags: {
    marginBottom: "12px",
  },
  tag: {
    display: "inline-block",
    background: "#f0f0f0",
    borderRadius: "4px",
    padding: "4px 10px",
    fontSize: "12px",
    color: "#666",
    marginRight: "8px",
  },
  friendDesc: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "12px",
  },
  connectBtn: {
    background: "#5B8DEF",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  // 学习卡片
  studyCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  studyHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },
  studyAvatar: {
    fontSize: "36px",
    marginRight: "16px",
  },
  studyInfo: {
    flex: 1,
  },
  studyTitle: {
    fontSize: "17px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "4px",
  },
  studyMembers: {
    fontSize: "13px",
    color: "#888",
  },
  studyDesc: {
    fontSize: "15px",
    color: "#555",
    marginBottom: "12px",
  },
  joinBtn: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    cursor: "pointer",
  },
  // 建议页
  submitBox: {
    padding: "16px 20px",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "15px",
    outline: "none",
  },
  submitBtn: {
    background: "#5B8DEF",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 24px",
    fontSize: "15px",
    cursor: "pointer",
  },
  suggestList: {
    padding: "0 20px",
  },
  suggestCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  rank: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#5B8DEF",
    marginRight: "16px",
    width: "30px",
  },
  suggestContent: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  suggestVotes: {
    display: "flex",
    alignItems: "center",
  },
  voteBtnLarge: {
    border: "none",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
  },
};