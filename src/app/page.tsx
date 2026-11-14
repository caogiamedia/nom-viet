
"use client";

import { useEffect, useMemo, useState } from "react";

type Tab = "home" | "learn" | "dictionary" | "practice" | "profile";

type NomEntry = {
  id: number;
  character: string;
  reading: string;
  meaning: string;
  unicode: string;
  strokes: number;
  level: number;
  description: string;
  example: string;
  source: string;
  sourceUrl: string;
};

const entries: NomEntry[] = [
  {
    id: 1,
    character: "𡗶",
    reading: "Trời",
    meaning: "Bầu không gian ở phía trên mặt đất.",
    unicode: "U+215F6",
    strokes: 7,
    level: 2,
    description:
      "Chữ Nôm ghi tiếng Việt 'trời'. Đây là một chữ có tư liệu từ điển và văn bản cổ đối chiếu.",
    example: "Trời cao bể rộng",
    source: "Tự điển Chữ Nôm Dẫn Giải",
    sourceUrl:
      "https://www.nomfoundation.org/nom-tools/Tu-Dien-Chu-Nom-Dan_Giai/Tu-Dien-Chu-Nom-Dan_Giai?nom=%F0%A1%97%B6",
  },
  {
    id: 2,
    character: "𠊛",
    reading: "Người",
    meaning: "Con người, người.",
    unicode: "U+2029B",
    strokes: 10,
    level: 2,
    description:
      "Chữ Nôm dùng để ghi tiếng Việt 'người'. Có thể tìm thấy trong tài nguyên chữ Nôm Chunom.org.",
    example: "Người Việt",
    source: "Chunom.org",
    sourceUrl: "https://chunom.org/chunom/index.html",
  },
];

const lessons = [
  {
    number: "01",
    title: "Làm quen với chữ Nôm",
    subtitle: "Tìm hiểu nguồn gốc và cách hình thành",
    count: "5 bài học",
  },
  {
    number: "02",
    title: "Những chữ Nôm cơ bản",
    subtitle: "Học các chữ thường gặp trong tiếng Việt",
    count: "20 chữ",
  },
  {
    number: "03",
    title: "Đọc và hiểu văn bản",
    subtitle: "Làm quen với ngôn ngữ văn học cổ",
    count: "10 bài học",
  },
];

export default function Home() {
  const [tab, setTab] = useState<Tab>("home");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<NomEntry>(entries[0]);
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [learned, setLearned] = useState(0);
  const [streak, setStreak] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("nomviet-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setLearned(data.learned ?? 0);
      setStreak(data.streak ?? 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "nomviet-progress",
      JSON.stringify({ learned, streak })
    );
  }, [learned, streak]);

  const filteredEntries = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return entries;

    return entries.filter(
      (entry) =>
        entry.reading.toLowerCase().includes(keyword) ||
        entry.meaning.toLowerCase().includes(keyword) ||
        entry.character.includes(search.trim()) ||
        entry.unicode.toLowerCase().includes(keyword)
    );
  }, [search]);

  const [quizIndex, setQuizIndex] = useState(0);

  const quiz = [
    {
      character: "𡗶",
      question: "Chữ Nôm này có âm đọc nào?",
      options: ["Người", "Trời", "Nước", "Đất"],
      correct: "Trời",
    },
    {
      character: "𠊛",
      question: "Chữ Nôm này có âm đọc nào?",
      options: ["Trời", "Hoa", "Người", "Nhà"],
      correct: "Người",
    },
  ];

  const currentQuiz = quiz[quizIndex % quiz.length];

  function markLearned() {
    setLearned((value) => value + 1);
  }

  function nextQuiz() {
    setQuizIndex((value) => value + 1);
    setAnswer("");
    setChecked(false);
  }

  function navigate(next: Tab) {
    setTab(next);
    setSearch("");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-seal">𡨸</div>
          <div>
            <h1>NÔM VIỆT</h1>
            <span>Hồn chữ Việt xưa</span>
          </div>
        </div>

        <div className="side-label">KHÔNG GIAN HỌC TẬP</div>

        <nav>
          {([
            ["home", "⌂", "Trang chủ"],
            ["learn", "▤", "Học chữ Nôm"],
            ["dictionary", "⌕", "Từ điển"],
            ["practice", "✧", "Luyện tập"],
            ["profile", "♙", "Hồ sơ học tập"],
          ] as [Tab, string, string][]).map(([id, icon, label]) => (
            <button
              key={id}
              className={`nav-item ${tab === id ? "active" : ""}`}
              onClick={() => navigate(id)}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="daily-note">
            <span>✦ LỜI NHẮN HÔM NAY</span>
            <p>
              Giữ gìn chữ cũ là giữ gìn ký ức của một dân tộc.
            </p>
          </div>
          <span className="copyright">NÔM VIỆT © 2026</span>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div>
            <span className="breadcrumb">DI SẢN VĂN HÓA /</span>
            <span className="breadcrumb-current">
              {" "}
              {tab === "home" ? "TRANG CHỦ" : tab.toUpperCase()}
            </span>
          </div>
          <div className="topbar-right">
            <span className="streak">✦ {streak} ngày học</span>
            <div className="avatar">N</div>
          </div>
        </header>

        <div className="content">

          {tab === "home" && (
            <>
              <section className="hero">
                <div className="hero-content">
                  <span className="eyebrow">
                    ✦ KHO TÀNG VĂN TỰ VIỆT NAM ✦
                  </span>
                  <h2>
                    Khám phá di sản,
                    <br />
                    <em>học chữ tiền nhân.</em>
                  </h2>
                  <p>
                    Bước vào hành trình tìm hiểu chữ Nôm,
                    khám phá vẻ đẹp ngôn ngữ và văn hóa
                    Việt Nam qua từng con chữ.
                  </p>
                  <button
                    className="primary-button"
                    onClick={() => navigate("learn")}
                  >
                    Bắt đầu học <span>→</span>
                  </button>
                </div>
                <div className="hero-character">
                  <span>𡨸</span>
                  <small>CHỮ NÔM</small>
                </div>
                <div className="hero-stamp">國<br />粹</div>
              </section>

              <section className="stats-grid">
                <div className="stat-card">
                  <span>CHỮ ĐÃ HỌC</span>
                  <strong>{learned}</strong>
                  <small>Tiếp tục hành trình</small>
                </div>
                <div className="stat-card">
                  <span>NGÀY HỌC</span>
                  <strong>{streak}</strong>
                  <small>Duy trì thói quen</small>
                </div>
                <div className="stat-card">
                  <span>BÀI HỌC</span>
                  <strong>03</strong>
                  <small>Chương trình nhập môn</small>
                </div>
              </section>

              <section className="section-block">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">LỘ TRÌNH CỦA BẠN</span>
                    <h3>Hành trình học chữ Nôm</h3>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => navigate("learn")}
                  >
                    Xem tất cả →
                  </button>
                </div>

                <div className="lesson-grid">
                  {lessons.map((lesson, index) => (
                    <article className="lesson-card" key={lesson.number}>
                      <span className="lesson-number">
                        {lesson.number}
                      </span>
                      <div className="lesson-symbol">
                        {["𡨸", "𡗶", "文"][index]}
                      </div>
                      <h4>{lesson.title}</h4>
                      <p>{lesson.subtitle}</p>
                      <div className="lesson-footer">
                        <span>{lesson.count}</span>
                        <button onClick={() => navigate("learn")}>
                          Học ngay →
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="section-block">
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">MỖI NGÀY MỘT CHỮ</span>
                    <h3>Chữ Nôm hôm nay</h3>
                  </div>
                </div>
                <CharacterCard
                  entry={entries[0]}
                  onClick={() => {
                    setSelected(entries[0]);
                    navigate("dictionary");
                  }}
                />
              </section>
            </>
          )}

          {tab === "learn" && (
            <section className="section-block page-section">
              <span className="eyebrow">CHƯƠNG TRÌNH HỌC</span>
              <h2 className="page-title">Học chữ Nôm</h2>
              <p className="page-description">
                Học từ nền tảng, tìm hiểu cách đọc và ý nghĩa
                của từng chữ.
              </p>

              <div className="lesson-grid">
                {lessons.map((lesson, index) => (
                  <article className="lesson-card" key={lesson.number}>
                    <span className="lesson-number">
                      {lesson.number}
                    </span>
                    <div className="lesson-symbol">
                      {["𡨸", "𡗶", "文"][index]}
                    </div>
                    <h4>{lesson.title}</h4>
                    <p>{lesson.subtitle}</p>
                    <div className="lesson-footer">
                      <span>{lesson.count}</span>
                      <button
                        onClick={() => {
                          setSelected(entries[index % entries.length]);
                          setTab("dictionary");
                        }}
                      >
                        Mở bài →
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <h3 className="subheading">Thẻ học chữ cơ bản</h3>
              <div className="flashcard-grid">
                {entries.map((entry) => (
                  <button
                    className="flashcard"
                    key={entry.id}
                    onClick={() => {
                      setSelected(entry);
                      setTab("dictionary");
                    }}
                  >
                    <span>{entry.character}</span>
                    <strong>{entry.reading}</strong>
                    <small>{entry.meaning}</small>
                  </button>
                ))}
              </div>
            </section>
          )}

          {tab === "dictionary" && (
            <section className="section-block page-section">
              <span className="eyebrow">TRA CỨU HÁN NÔM</span>
              <h2 className="page-title">Từ điển chữ Nôm</h2>
              <p className="page-description">
                Tìm kiếm theo âm Quốc ngữ, nghĩa hoặc ký tự Nôm.
              </p>

              <input
                className="search-input"
                placeholder="Nhập từ cần tra cứu..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <div className="dictionary-layout">
                <div className="dictionary-results">
                  <span className="result-count">
                    {filteredEntries.length} kết quả trong dữ liệu mẫu
                  </span>
                  {filteredEntries.map((entry) => (
                    <button
                      className={`dictionary-row ${
                        selected.id === entry.id ? "selected" : ""
                      }`}
                      key={entry.id}
                      onClick={() => setSelected(entry)}
                    >
                      <span className="dictionary-glyph">
                        {entry.character}
                      </span>
                      <span>
                        <strong>{entry.reading}</strong>
                        <small>{entry.meaning}</small>
                      </span>
                    </button>
                  ))}
                  {filteredEntries.length === 0 && (
                    <p className="empty-state">
                      Chưa tìm thấy trong dữ liệu MVP.
                      Kho từ điển sẽ được mở rộng sau.
                    </p>
                  )}
                </div>

                <div className="dictionary-detail">
                  <span className="eyebrow">THÔNG TIN CHỮ</span>
                  <div className="detail-glyph">
                    {selected.character}
                  </div>
                  <h3>{selected.reading}</h3>
                  <p className="detail-meaning">
                    {selected.meaning}
                  </p>
                  <div className="detail-meta">
                    <div>
                      <small>MÃ UNICODE</small>
                      <strong>{selected.unicode}</strong>
                    </div>
                    <div>
                      <small>SỐ NÉT</small>
                      <strong>{selected.strokes}</strong>
                    </div>
                    <div>
                      <small>CẤP ĐỘ</small>
                      <strong>{selected.level}</strong>
                    </div>
                  </div>
                  <p className="detail-description">
                    {selected.description}
                  </p>
                  <div className="example-box">
                    <small>VÍ DỤ</small>
                    <strong>{selected.example}</strong>
                  </div>
                  <small className="source-label">
                    Nguồn: {selected.source}
                  </small>
                  <a
                    className="source-link"
                    href={selected.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Xem tài liệu gốc ↗
                  </a>
                </div>
              </div>
            </section>
          )}

          {tab === "practice" && (
            <section className="section-block page-section">
              <span className="eyebrow">KIỂM TRA KIẾN THỨC</span>
              <h2 className="page-title">Thử tài chữ Nôm</h2>
              <p className="page-description">
                Nhận diện chữ Nôm và chọn âm đọc chính xác.
              </p>

              <div className="quiz-card">
                <div className="quiz-top">
                  <span>THỬ THÁCH NHẬP MÔN</span>
                  <span>CÂU {quizIndex + 1}</span>
                </div>
                <div className="quiz-character">
                  {currentQuiz.character}
                </div>
                <h3>{currentQuiz.question}</h3>
                <div className="quiz-options">
                  {currentQuiz.options.map((option) => (
                    <button
                      key={option}
                      disabled={checked}
                      className={`quiz-option ${
                        answer === option ? "chosen" : ""
                      } ${
                        checked && option === currentQuiz.correct
                          ? "correct"
                          : ""
                      } ${
                        checked &&
                        answer === option &&
                        answer !== currentQuiz.correct
                          ? "incorrect"
                          : ""
                      }`}
                      onClick={() => setAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {!checked ? (
                  <button
                    className="primary-button quiz-submit"
                    disabled={!answer}
                    onClick={() => {
                      setChecked(true);
                      if (answer === currentQuiz.correct) {
                        setLearned((value) => value + 1);
                      }
                    }}
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <div className="quiz-feedback">
                    <strong>
                      {answer === currentQuiz.correct
                        ? "Chính xác! Bạn đã trả lời đúng."
                        : `Chưa chính xác. Đáp án là ${currentQuiz.correct}.`}
                    </strong>
                    <button
                      className="primary-button"
                      onClick={nextQuiz}
                    >
                      Câu tiếp theo →
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {tab === "profile" && (
            <section className="section-block page-section">
              <span className="eyebrow">HỒ SƠ CỦA BẠN</span>
              <h2 className="page-title">Hành trình tri thức</h2>
              <div className="profile-card">
                <div className="profile-avatar">𡨸</div>
                <h3>Người học chữ Nôm</h3>
                <p>Thành viên NÔM VIỆT</p>
                <div className="profile-stats">
                  <div>
                    <strong>{learned}</strong>
                    <span>Chữ đã học</span>
                  </div>
                  <div>
                    <strong>{streak}</strong>
                    <span>Ngày học</span>
                  </div>
                  <div>
                    <strong>{Math.floor(learned / 5) + 1}</strong>
                    <span>Cấp độ</span>
                  </div>
                </div>
              </div>
              <button
                className="secondary-button"
                onClick={() => {
                  setLearned(0);
                  setStreak(1);
                }}
              >
                Đặt lại dữ liệu học thử
              </button>
            </section>
          )}

          <footer className="footer">
            <span>NÔM VIỆT – Gìn giữ hồn chữ Việt</span>
            <span>PHIÊN BẢN MVP 0.1.0</span>
          </footer>
        </div>
      </section>

      <nav className="mobile-nav">
        {([
          ["home", "⌂", "Trang chủ"],
          ["learn", "▤", "Học"],
          ["dictionary", "⌕", "Tra cứu"],
          ["practice", "✧", "Luyện"],
          ["profile", "♙", "Tôi"],
        ] as [Tab, string, string][]).map(([id, icon, label]) => (
          <button
            key={id}
            className={tab === id ? "mobile-active" : ""}
            onClick={() => navigate(id)}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </main>
  );
}

function CharacterCard({
  entry,
  onClick,
}: {
  entry: NomEntry;
  onClick: () => void;
}) {
  return (
    <button className="daily-character" onClick={onClick}>
      <span className="daily-glyph">{entry.character}</span>
      <div>
        <span className="eyebrow">CHỮ NÔM</span>
        <h3>{entry.reading}</h3>
        <p>{entry.meaning}</p>
        <small>{entry.unicode} · {entry.strokes} nét</small>
      </div>
      <span className="daily-arrow">→</span>
    </button>
  );
}
