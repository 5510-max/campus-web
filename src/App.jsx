import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const menus = [
  { name: "二手交易",  color: "from-orange-400 to-yellow-300",  icon: "🛍️" },
  { name: "表白墙",    color: "from-pink-400 to-rose-300",      icon: "💗" },
  { name: "失物招领",  color: "from-blue-400 to-cyan-300",      icon: "🔑" },
  { name: "扩列交友",  color: "from-violet-400 to-purple-300",  icon: "👥" },
  { name: "吃饭搭子",  color: "from-amber-400 to-orange-300",   icon: "🍜" },
  { name: "租房信息",  color: "from-green-400 to-emerald-300",  icon: "🏠" },
  { name: "兼职信息",  color: "from-sky-400 to-blue-300",       icon: "💼" },
  { name: "校内勤工",  color: "from-orange-400 to-red-300",     icon: "🎓" },
  { name: "学习运动",  color: "from-blue-400 to-indigo-300",    icon: "⚽" },
  { name: "资料下载",  color: "from-purple-400 to-fuchsia-300", icon: "📄" },
  { name: "代取快递",  color: "from-yellow-400 to-amber-300",   icon: "📦" },
  { name: "打印跑腿",  color: "from-cyan-400 to-sky-300",       icon: "🖨️" },
  { name: "代买外卖",  color: "from-teal-400 to-green-300",     icon: "🛵" },
  { name: "宿舍用品",  color: "from-emerald-400 to-lime-300",   icon: "🛏️" },
  { name: "课本教材",  color: "from-violet-400 to-purple-300",  icon: "📚" },
  { name: "论坛广场",  color: "from-pink-400 to-purple-300",    icon: "💬" },
];

const hotCards = [
  { title:"表白墙",   subtitle:"今日 520 条新表白", text:"想把你写进诗里，从此全世界都是你。",       button:"去表白",  bg:"bg-pink-50",  color:"text-pink-500"  },
  { title:"失物招领", subtitle:"今日 12 条新消息",  text:"有人在图书馆捡到一串钥匙。",               button:"去看看",  bg:"bg-blue-50",  color:"text-blue-500"  },
  { title:"兼职信息", subtitle:"更新 28 条兼职",    text:"奶茶店兼职 18-22 元/小时。",              button:"立即报名",bg:"bg-green-50", color:"text-green-500" },
];

const hotPosts = [
  { id:1, tag:"表白墙",  avatar:"🐼", user:"匿名熊猫", time:"3分钟前",  content:"图书馆三楼靠窗的女生，你每天都在看法语书，想认识你 🌸", likes:234, comments:56 },
  { id:2, tag:"二手交易",avatar:"🦊", user:"卖书小狐", time:"15分钟前", content:"高数同济版上下册，九成新，50元包邮 📖",                   likes:89,  comments:23 },
  { id:3, tag:"找搭子",  avatar:"🐨", user:"孤独考拉", time:"32分钟前", content:"有没有早上7点一起跑步的？操场打卡21天 💪",                 likes:167, comments:41 },
];

const initSuggestions = [
  { id:1, title:"希望增加「二手拍卖」功能",      desc:"设置倒计时竞拍，价高者得，更公平有趣",     votes:312, category:"功能建议", status:"采纳中", userVoted:false },
  { id:2, title:"表白墙支持语音/视频表白",        desc:"文字太单调了，来点声音和画面更有仪式感",   votes:267, category:"功能建议", status:"评估中", userVoted:false },
  { id:3, title:"增加「组队刷题」房间功能",        desc:"大家一起在线自习打卡，互相监督效率更高",   votes:198, category:"学习",   status:"评估中", userVoted:false },
  { id:4, title:"跑腿接单加入实时位置共享",        desc:"下单后可以看到跑腿小哥的位置，更安心",     votes:145, category:"跑腿",   status:"规划中", userVoted:false },
  { id:5, title:"失物招领加 AI 智能匹配",         desc:"上传图片自动识别物品，推送给可能失主",     votes:128, category:"技术",   status:"规划中", userVoted:false },
];

const statusColor = { "采纳中":"text-emerald-600 bg-emerald-50", "评估中":"text-amber-600 bg-amber-50", "规划中":"text-blue-600 bg-blue-50" };
const categoryColor = { "功能建议":"text-violet-600 bg-violet-50", "学习":"text-sky-600 bg-sky-50", "跑腿":"text-orange-600 bg-orange-50", "技术":"text-pink-600 bg-pink-50" };

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function CampusAppUI() {
  const [tab, setTab]           = useState("home");
  const [school, setSchool]     = useState("");
  const [liked, setLiked]       = useState({});
  const [suggestions, setSuggestions] = useState(initSuggestions);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc,  setNewDesc]  = useState("");
  const [newCat,   setNewCat]   = useState("功能建议");
  const [sortBy,   setSortBy]   = useState("votes");
  const [filterCat,setFilterCat]= useState("全部");
  const [banner, setBanner]     = useState(0);
  const [toast,   setToast]     = useState("");

  const banners = [
    { grad:"from-violet-500 via-pink-400 to-cyan-400", title:"记录校园生活", sub:"分享每一刻的美好", btn:"立即发布" },
    { grad:"from-orange-400 via-pink-400 to-rose-400", title:"二手节特惠来啦", sub:"好物低价等你捡漏", btn:"去逛逛" },
    { grad:"from-teal-400 via-cyan-400 to-blue-400",   title:"全国高校互联", sub:"认识来自不同学校的朋友", btn:"去扩列" },
  ];

  useEffect(() => {
    const t = setInterval(() => setBanner(b => (b+1) % banners.length), 3200);
    return () => clearInterval(t);
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const toggleLike = (id) => setLiked(p => ({ ...p, [id]: !p[id] }));

  const voteUp = (id) => {
    setSuggestions(s => s.map(i => i.id === id
      ? { ...i, votes: i.userVoted ? i.votes-1 : i.votes+1, userVoted: !i.userVoted }
      : i
    ));
    const s = suggestions.find(i => i.id === id);
    if (s && !s.userVoted) showToast("👍 投票成功！");
  };

  const addSuggestion = () => {
    if (!newTitle.trim() || !newDesc.trim()) return showToast("请填写完整信息");
    setSuggestions(s => [{ id: Date.now(), title: newTitle, desc: newDesc, votes: 1, category: newCat, status: "评估中", userVoted: true }, ...s]);
    setNewTitle(""); setNewDesc(""); setShowSuggestForm(false);
    showToast("✅ 建议已提交！");
  };

  const filtered = suggestions
    .filter(i => filterCat === "全部" || i.category === filterCat)
    .sort((a,b) => sortBy === "votes" ? b.votes - a.votes : a.status.localeCompare(b.status));

  // ─── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Toast */}
      {toast && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 animate-pulse">{toast}</div>}

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="font-bold text-lg">校园通</span>
          </div>
          <div className="flex items-center gap-3">
            {/* 自定义学校输入 */}
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="输入你的学校"
              className="text-sm bg-gray-100 px-3 py-1.5 rounded-full w-32 focus:outline-none focus:ring-2 focus:ring-violet-300"
            />
            <span className="text-xl">🔔</span>
          </div>
        </div>
      </header>

      {/* Tab Content */}
      <main className="max-w-lg mx-auto px-4 pt-4">
        {tab === "home" && (
          <>
            {/* Banner */}
            <div className={`h-36 rounded-2xl bg-gradient-to-r ${banners[banner].grad} p-5 text-white relative overflow-hidden mb-5`}>
              <div className="relative z-10">
                <h2 className="text-xl font-bold">{banners[banner].title}</h2>
                <p className="text-sm opacity-90 mt-1">{banners[banner].sub}</p>
                <button className="mt-3 bg-white/20 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium">{banners[banner].btn}</button>
              </div>
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {menus.map((m, i) => (
                <button key={i} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg`}>{m.icon}</span>
                  <span className="text-xs text-gray-700">{m.name}</span>
                </button>
              ))}
            </div>

            {/* Hot Cards */}
            <div className="flex gap-3 overflow-x-auto pb-2 mb-5 scrollbar-hide">
              {hotCards.map((c, i) => (
                <div key={i} className={`flex-shrink-0 w-48 p-4 rounded-xl ${c.bg}`}>
                  <h3 className={`font-bold ${c.color}`}>{c.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.subtitle}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{c.text}</p>
                  <button className={`mt-3 text-sm font-medium ${c.color}`}>{c.button} →</button>
                </div>
              ))}
            </div>

            {/* Hot Posts */}
            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-3">🔥 热门动态</h3>
              {hotPosts.map(p => (
                <div key={p.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{p.avatar}</span>
                    <span className="font-medium text-sm">{p.user}</span>
                    <span className="text-xs text-gray-400">{p.time}</span>
                    <span className="ml-auto text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">{p.tag}</span>
                  </div>
                  <p className="text-sm text-gray-700">{p.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-gray-400 text-sm">
                    <button onClick={() => toggleLike(p.id)} className={`flex items-center gap-1 ${liked[p.id] ? "text-red-500" : ""}`}>
                      {liked[p.id] ? "❤️" : "🤍"} {p.likes + (liked[p.id] ? 1 : 0)}
                    </button>
                    <span>💬 {p.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "suggest" && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">💡 功能建议</h2>
              <button onClick={() => setShowSuggestForm(true)} className="bg-violet-500 text-white px-4 py-1.5 rounded-full text-sm">+ 提建议</button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {["全部","功能建议","学习","跑腿","技术"].map(c => (
                <button key={c} onClick={() => setFilterCat(c)} className={`flex-shrink-0 px-3 py-1 rounded-full text-sm ${filterCat === c ? "bg-violet-500 text-white" : "bg-gray-200 text-gray-600"}`}>{c}</button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex gap-2 mb-4">
              {["votes","status"].map(s => (
                <button key={s} onClick={() => setSortBy(s)} className={`px-3 py-1 rounded-full text-sm ${sortBy === s ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"}`}>
                  {s === "votes" ? "🔥 最热" : "📋 状态"}
                </button>
              ))}
            </div>

            {/* Suggestion List */}
            {filtered.map(s => (
              <div key={s.id} className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{s.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
                    <div className="flex gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${categoryColor[s.category]}`}>{s.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[s.status]}`}>{s.status}</span>
                    </div>
                  </div>
                  <button onClick={() => voteUp(s.id)} className={`flex flex-col items-center px-3 py-1 rounded-lg ${s.userVoted ? "bg-violet-100 text-violet-600" : "bg-gray-100 text-gray-500"}`}>
                    <span className="text-lg">👍</span>
                    <span className="text-xs font-bold">{s.votes}</span>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {tab === "profile" && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👤</div>
            <h2 className="text-xl font-bold text-gray-800">个人中心</h2>
            <p className="text-gray-500 mt-2">登录后查看更多功能</p>
            <button className="mt-6 bg-violet-500 text-white px-8 py-2 rounded-full">登录 / 注册</button>
          </div>
        )}
      </main>

      {/* Suggest Modal */}
      {showSuggestForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">💡 提交建议</h3>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="建议标题" className="w-full border rounded-lg px-3 py-2 mb-3" />
            <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="详细描述" className="w-full border rounded-lg px-3 py-2 mb-3 h-24" />
            <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full border rounded-lg px-3 py-2 mb-4">
              <option>功能建议</option><option>学习</option><option>跑腿</option><option>技术</option>
            </select>
            <div className="flex gap-3">
              <button onClick={() => setShowSuggestForm(false)} className="flex-1 py-2 rounded-lg bg-gray-200">取消</button>
              <button onClick={addSuggestion} className="flex-1 py-2 rounded-lg bg-violet-500 text-white">提交</button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-40">
        {[
          { id:"home", icon:"🏠", label:"首页" },
          { id:"suggest", icon:"💡", label:"建议" },
          { id:"profile", icon:"👤", label:"我的" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex flex-col items-center gap-0.5 ${tab === t.id ? "text-violet-500" : "text-gray-400"}`}>
            <span className="text-xl">{t.icon}</span>
            <span className="text-xs">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}