import { useEffect, useRef, useState } from 'react'
import './App.css'

const base = import.meta.env.BASE_URL
const startDate = new Date('2021-11-24T00:00:00')
const daysTogether = Math.floor(
  (Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24),
)

const albumPhotos = [
  ['2021 · 11 · 24', '故事开始的地方', '从这一天开始，平凡的日子有了特别的意义。'],
  ['2022 · OUR MEMORY', '第一次一起旅行', '因为身边是你，所以沿途的一切都变得值得纪念。'],
  ['2023 · EVERYDAY', '平凡的小日子', '没有特别安排的日子，也因为有你而变得温柔。'],
  ['2024 · TOGETHER', '我们还在继续', '这一页不是结尾，下一段故事依然是我们。'],
  ['OUR MEMORY · 05', '被珍藏的瞬间', '镜头留住的不只是画面，还有那一天的心情。'],
  ['OUR MEMORY · 06', '和你一起看风景', '去过哪里并不重要，重要的是一路都有你陪着。'],
  ['OUR MEMORY · 07', '值得反复想起', '那些笑得很开心的时刻，后来都成了闪闪发亮的回忆。'],
  ['OUR MEMORY · 08', '日常里的浪漫', '真正喜欢的生活，是每一个普通日子里都有彼此。'],
  ['OUR MEMORY · 09', '故事未完待续', '相册会继续翻页，我们也会一起创造更多故事。'],
].map(([date, title, note], index) => ({
  src: `${base}photos-web/album-${index + 1}.jpg`,
  date,
  title,
  note,
}))

function App() {
  const [showLetter, setShowLetter] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [favorite, setFavorite] = useState(false)
  const [reactionCount, setReactionCount] = useState(0)
  const [heartBurst, setHeartBurst] = useState(0)
  const [previewPhoto, setPreviewPhoto] = useState(0)
  const [previewPlaying, setPreviewPlaying] = useState(false)
  const [videoAvailable, setVideoAvailable] = useState(false)
  const [musicReady, setMusicReady] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const audioRef = useRef(null)
  const audioContextRef = useRef(null)
  const melodyTimerRef = useRef(null)

  const previousPhoto = () => setCurrentPhoto((value) =>
    value === 0 ? albumPhotos.length - 1 : value - 1)
  const nextPhoto = () => setCurrentPhoto((value) =>
    value === albumPhotos.length - 1 ? 0 : value + 1)

  useEffect(() => {
    if (!previewPlaying || videoAvailable) return undefined
    const timer = window.setInterval(() => {
      setPreviewPhoto((value) => (value + 1) % albumPhotos.length)
    }, 2600)
    return () => window.clearInterval(timer)
  }, [previewPlaying, videoAvailable])

  useEffect(() => () => {
    window.clearInterval(melodyTimerRef.current)
    audioContextRef.current?.close()
  }, [])

  const stopBuiltInMusic = () => {
    window.clearInterval(melodyTimerRef.current)
    melodyTimerRef.current = null
    audioContextRef.current?.close()
    audioContextRef.current = null
  }

  const startBuiltInMusic = () => {
    const AudioEngine = window.AudioContext || window.webkitAudioContext
    if (!AudioEngine) return
    const context = new AudioEngine()
    audioContextRef.current = context
    const notes = [261.63, 329.63, 392, 329.63, 293.66, 349.23, 440, 349.23]
    let noteIndex = 0
    const playNote = () => {
      const now = context.currentTime
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = notes[noteIndex % notes.length]
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.055, now + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15)
      oscillator.connect(gain).connect(context.destination)
      oscillator.start(now)
      oscillator.stop(now + 1.2)
      noteIndex += 1
    }
    playNote()
    melodyTimerRef.current = window.setInterval(playNote, 760)
  }

  const toggleMusic = async () => {
    if (musicPlaying) {
      audioRef.current?.pause()
      stopBuiltInMusic()
      setMusicPlaying(false)
      return
    }
    if (musicReady && audioRef.current) {
      try {
        await audioRef.current.play()
        setMusicPlaying(true)
        return
      } catch {
        // Use the built-in melody if the browser blocks or cannot read the file.
      }
    }
    startBuiltInMusic()
    setMusicPlaying(true)
  }

  const randomMemory = () => {
    setCurrentPhoto((current) => {
      const offset = 1 + Math.floor(Math.random() * (albumPhotos.length - 1))
      return (current + offset) % albumPhotos.length
    })
  }

  const sendHeart = () => {
    setReactionCount((count) => count + 1)
    setHeartBurst((value) => value + 1)
  }

  const activePhoto = albumPhotos[currentPhoto]

  return (
    <main className="app">
      <audio
        ref={audioRef}
        src={`${base}media/our-song.mp3`}
        loop
        preload="metadata"
        onCanPlay={() => setMusicReady(true)}
        onError={() => setMusicReady(false)}
      />

      <button
        className={`music-button ${musicPlaying ? 'is-playing' : ''}`}
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicPlaying}
      >
        <span className="music-disc" aria-hidden="true">♪</span>
        <span>{musicPlaying ? '暂停音乐' : '播放音乐'}</span>
      </button>

      <section className="hero">
        <div className="romantic-decor" aria-hidden="true"><img
          className="couple-dog-art"
          src={`${base}photos/couple-border-collie-cutout.png`}
          alt=""
        /><figure className="swing-frame frame-one">
            <img src={`${base}photos-web/frame-1.jpg`} alt="" decoding="async" />
            <figcaption>OUR MEMORY</figcaption>
          </figure>
          <figure className="swing-frame frame-two">
            <img src={`${base}photos-web/frame-2.jpg`} alt="" decoding="async" />
            <figcaption>11 · 24 · 2021</figcaption>
          </figure>
          <div className="string-lights"><span /><span /><span /><span /><span /><span /><span /></div>
          <span className="soft-cloud cloud-one" /><span className="soft-cloud cloud-two" />
          <div className="ground ground-back" /><div className="ground ground-front" />
          <div className="little-house">
            <span className="house-roof" /><span className="house-chimney" />
            <span className="house-window window-left" /><span className="house-window window-right" />
            <span className="house-door" /><span className="door-light" />
          </div><div className="family-scene">
            <div className="figure family-man"><span className="figure-head" /><span className="man-body" /><span className="man-arm" /><span className="figure-leg man-leg-one" /><span className="figure-leg man-leg-two" /></div>
            <div className="figure family-woman"><span className="figure-head" /><span className="woman-dress" /><span className="woman-arm-left" /><span className="woman-arm-right" /><span className="figure-leg woman-leg-one" /><span className="figure-leg woman-leg-two" /></div>
            <span className="dog-leash" />
            <div className="little-dog"><span className="dog-body" /><span className="dog-head" /><span className="dog-ear" /><span className="dog-tail" /><span className="dog-leg dog-leg-one" /><span className="dog-leg dog-leg-two" /></div>
          </div>
        </div>
        <p className="eyebrow">OUR LOVE STORY</p>
        <h1>刘梓毅 <span>と</span> 黄心莹</h1>
        <p className="start-date">2021年11月24日，我们的故事开始了。</p>
        <div className="counter"><strong>{daysTogether}</strong><span>一起走过的日子</span></div>
        <button className="letter-button" onClick={() => setShowLetter(!showLetter)}>
          {showLetter ? '收起这封信' : '打开一封小情书'}
        </button>
        {showLetter && <p className="letter">很幸运，在这么大的世界里遇见了你。希望未来还有许许多多的日子，可以和你一起慢慢记录。</p>}
        <a className="section-jump" href="#album">翻开我们的相册 ↓</a>
      </section>

      <section className="memories memory-redesign" id="album">
        <header className="memory-masthead">
          <div>
            <p className="section-label">OUR LITTLE ARCHIVE</p>
            <h2>日子很慢，<br />喜欢你这件事很长。</h2>
          </div>
          <p>这里没有规整的时间线，只有一张张舍不得删掉的照片，和我们共同生活过的证据。</p>
        </header>

        <div className="memory-editorial" key={currentPhoto} aria-live="polite">
          <div className="memory-image-deck">
            <span className="paper-tape tape-one" aria-hidden="true" />
            <span className="paper-tape tape-two" aria-hidden="true" />
            <figure className="memory-main-photo">
              <img src={activePhoto.src} alt={`${activePhoto.title}的回忆照片`} loading="lazy" decoding="async" />
              <figcaption>{activePhoto.date}</figcaption>
            </figure>
            <span className="scribble-heart" aria-hidden="true">♡</span>
          </div>

          <article className="memory-copy-card">
            <span className="memory-index">{String(currentPhoto + 1).padStart(2, '0')}</span>
            <p className="memory-date">{activePhoto.date}</p>
            <h3>{activePhoto.title}</h3>
            <p className="memory-note">{activePhoto.note}</p>
            <p className="memory-signature">— always, us.</p>
            <div className="memory-actions">
              <button type="button" className={favorite ? 'is-active' : ''} onClick={() => setFavorite(!favorite)}>
                {favorite ? '♥ 已珍藏' : '♡ 珍藏这一刻'}
              </button>
              <button type="button" onClick={randomMemory}>随便翻一页 ↗</button>
            </div>
          </article>
        </div>

        <div className="memory-footer-controls">
          <button type="button" onClick={previousPhoto} aria-label="上一张照片">←</button>
          <div className="memory-thumbnails">
            {albumPhotos.map((photo, index) => (
              <button
                type="button"
                className={index === currentPhoto ? 'is-current' : ''}
                onClick={() => setCurrentPhoto(index)}
                aria-label={`查看第 ${index + 1} 张照片`}
                key={photo.src}
              >
                <img src={photo.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <button type="button" onClick={nextPhoto} aria-label="下一张照片">→</button>
        </div>
        <a className="section-jump dark-jump" href="#cinema">去看我们的影片 ↓</a>
      </section>

      <section className="cinema" id="cinema">
        <div className="cinema-glow" aria-hidden="true" />
        <header className="cinema-heading">
          <p className="section-label">CHAPTER THREE · OUR CINEMA</p>
          <h2>有些回忆，<br />应该让它继续播放。</h2>
          <p>把散落的瞬间连起来，就变成了只属于我们的电影。</p>
        </header>

        <div className="cinema-stage">
          <div className="cinema-screen">
            <video
              className={videoAvailable ? 'is-ready' : ''}
              controls
              playsInline
              preload="metadata"
              onCanPlay={() => { setVideoAvailable(true); setPreviewPlaying(false) }}
              onError={() => setVideoAvailable(false)}
            >
              <source src={`${base}media/our-video.mp4`} type="video/mp4" />
            </video>
            {!videoAvailable && (
              <div className="cinema-fallback">
                <img key={previewPhoto} src={albumPhotos[previewPhoto].src} alt="照片组成的回忆预告" />
                <div className="film-grain" aria-hidden="true" />
                <div className="cinema-caption">
                  <span>{String(previewPhoto + 1).padStart(2, '0')} / {String(albumPhotos.length).padStart(2, '0')}</span>
                  <strong>{albumPhotos[previewPhoto].title}</strong>
                </div>
                <button type="button" className="trailer-button" onClick={() => setPreviewPlaying(!previewPlaying)}>
                  {previewPlaying ? 'Ⅱ 暂停预告' : '▶ 播放回忆预告'}
                </button>
              </div>
            )}
          </div>
          <div className="cinema-meta">
            <span>刘梓毅 × 黄心莹</span><span>Est. 2021</span><span>To be continued</span>
          </div>
        </div>

        <div className="reaction-zone">
          <div>
            <p>如果你也喜欢这个故事</p>
            <strong>就留下一颗小心心吧</strong>
          </div>
          <button type="button" onClick={sendHeart} aria-label="送出一颗心">
            <span className="heart-icon">♥</span><span>{reactionCount}</span>
            <i key={heartBurst} className={heartBurst ? 'heart-burst' : ''} aria-hidden="true">♥</i>
          </button>
        </div>
      </section>

      <footer>刘梓毅 と 黄心莹 · Our story continues</footer>
    </main>
  )
}

export default App
