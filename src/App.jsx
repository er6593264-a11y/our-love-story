import { useState } from 'react'
import './App.css'

const startDate = new Date('2021-11-24T00:00:00')
const daysTogether = Math.floor(
  (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24),
)
const albumPhotos = [
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-1.jpg`,
    date: '2021 · 11 · 24',
    title: '故事开始的地方',
    note: '从这一天开始，平凡的日子有了特别的意义。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-2.jpg`,
    date: '2022 · OUR MEMORY',
    title: '第一次一起旅行',
    note: '因为身边是你，所以沿途的一切都变得值得纪念。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-3.jpg`,
    date: '2023 · EVERYDAY',
    title: '平凡的小日子',
    note: '没有特别安排的日子，也因为有你而变得温柔。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-4.jpg`,
    date: '2024 · TOGETHER',
    title: '我们还在继续',
    note: '这一页不是结尾，下一段故事依然是我们。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-5.jpg`,
    date: 'OUR MEMORY · 05',
    title: '被珍藏的瞬间',
    note: '镜头留住的不只是画面，还有那一天的心情。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-6.jpg`,
    date: 'OUR MEMORY · 06',
    title: '和你一起看风景',
    note: '去过哪里并不重要，重要的是一路都有你陪着。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-7.jpg`,
    date: 'OUR MEMORY · 07',
    title: '值得反复想起',
    note: '那些笑得很开心的时刻，后来都成了闪闪发亮的回忆。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-8.jpg`,
    date: 'OUR MEMORY · 08',
    title: '日常里的浪漫',
    note: '真正喜欢的生活，是每一个普通日子里都有彼此。',
  },
  {
    src: `${import.meta.env.BASE_URL}photos-web/album-9.jpg`,
    date: 'OUR MEMORY · 09',
    title: '故事未完待续',
    note: '相册会继续翻页，我们也会一起创造更多故事。',
  },
]
function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  const previousPhoto = () => {
    setCurrentPhoto((current) =>
      current === 0 ? albumPhotos.length - 1 : current - 1,
    )
  }

  const nextPhoto = () => {
    setCurrentPhoto((current) =>
      current === albumPhotos.length - 1 ? 0 : current + 1,
    )
  }

  const activePhoto = albumPhotos[currentPhoto]
  return (
    <main className="app">
      <section className="hero">
        <div className="romantic-decor" aria-hidden="true"><img
          className="couple-dog-art"
          src={`${import.meta.env.BASE_URL}photos/couple-border-collie-cutout.png`}
          alt=""
        /><figure className="swing-frame frame-one">
            <img
              src={`${import.meta.env.BASE_URL}photos-web/frame-1.jpg`}
              alt=""
              decoding="async"
            />
            <figcaption>OUR MEMORY</figcaption>
          </figure>

          <figure className="swing-frame frame-two">
            <img
              src={`${import.meta.env.BASE_URL}photos-web/frame-2.jpg`}
              alt=""
              decoding="async"
            />
            <figcaption>11 · 24 · 2021</figcaption>
          </figure>
          <div className="string-lights">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <span className="soft-cloud cloud-one" />
          <span className="soft-cloud cloud-two" />

          <div className="ground ground-back" />
          <div className="ground ground-front" />

          <div className="little-house">
            <span className="house-roof" />
            <span className="house-chimney" />
            <span className="house-window window-left" />
            <span className="house-window window-right" />
            <span className="house-door" />
            <span className="door-light" />
          </div><div className="family-scene">
            <div className="figure family-man">
              <span className="figure-head" />
              <span className="man-body" />
              <span className="man-arm" />
              <span className="figure-leg man-leg-one" />
              <span className="figure-leg man-leg-two" />
            </div>

            <div className="figure family-woman">
              <span className="figure-head" />
              <span className="woman-dress" />
              <span className="woman-arm-left" />
              <span className="woman-arm-right" />
              <span className="figure-leg woman-leg-one" />
              <span className="figure-leg woman-leg-two" />
            </div>

            <span className="dog-leash" />

            <div className="little-dog">
              <span className="dog-body" />
              <span className="dog-head" />
              <span className="dog-ear" />
              <span className="dog-tail" />
              <span className="dog-leg dog-leg-one" />
              <span className="dog-leg dog-leg-two" />
            </div>
          </div>
        </div>
        <p className="eyebrow">OUR LOVE STORY</p>
        <h1>
          刘梓毅 <span>と</span> 黄心莹
        </h1>

        <p className="start-date">
          2021年11月24日，我们的故事开始了。
        </p>

        <div className="counter">
          <strong>{daysTogether}</strong>
          <span>一起走过的日子</span>
        </div>

        <button
          className="letter-button"
          onClick={() => setShowLetter(!showLetter)}
        >
          {showLetter ? '收起这封信' : '打开一封小情书'}
        </button>

        {showLetter && (
          <p className="letter">
            很幸运，在这么大的世界里遇见了你。
            希望未来还有许许多多的日子，可以和你一起慢慢记录。
          </p>
        )}
      </section>

      <section className="memories">
        <div className="album-heading">
          <p className="section-label">OUR PHOTO ALBUM</p>
          <h2>把喜欢的日子，慢慢装进相册里。</h2>
          <p className="album-intro">
            每一页，都是我们一起走过的一小段时间。
          </p>
        </div>

        <div className="album-shell">
          <div className="album-book">
            <div className="album-rings" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div
              className="album-page"
              key={currentPhoto}
              aria-live="polite"
            >
              <figure className="album-photo">
                <img
                  src={activePhoto.src}
                  alt={`${activePhoto.title}的回忆照片`}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{activePhoto.date}</figcaption>
              </figure>

              <div className="album-story">
                <span className="album-page-number">
                  {String(currentPhoto + 1).padStart(2, '0')}
                </span>

                <p className="album-date">{activePhoto.date}</p>
                <h3>{activePhoto.title}</h3>
                <p>{activePhoto.note}</p>
                <span className="handwritten-note">
                  Love lives here.
                </span>
              </div>
            </div>
          </div>

          <div className="album-controls">
            <button type="button" onClick={previousPhoto}>
              ← 上一页
            </button>

            <span>
              {String(currentPhoto + 1).padStart(2, '0')}
              {' / '}
              {String(albumPhotos.length).padStart(2, '0')}
            </span>

            <button type="button" onClick={nextPhoto}>
              下一页 →
            </button>
          </div>
        </div>
      </section>

      <footer>
        刘梓毅 と 黄心莹 · Our story continues
      </footer>
    </main>
  )
}

export default App
