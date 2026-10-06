// src/components/VideoPlayer/VideoPlayer.jsx
import { Maximize2, RotateCcw } from 'lucide-react'
import { useRef } from 'react'

const VideoPlayer = ({ linkEmbed, title }) => {
  const wrapperRef = useRef(null)
  const iframeRef = useRef(null)

  const handleFullscreen = () => {
    const el = wrapperRef.current
    if (!el) return

    if (el.requestFullscreen) {
      el.requestFullscreen()
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen()
    }
  }

  const handleReload = () => {
    // ✅ Cách 1: Set lại src bằng URL gốc từ prop
    const iframe = iframeRef.current
    if (iframe && linkEmbed) {
      iframe.src = linkEmbed
    }
  }

  if (!linkEmbed) {
    return (
      <div className="relative aspect-video bg-surface flex items-center justify-center border border-line">
        <p className="text-muted tracking-editorial text-xs">KHÔNG CÓ LINK PHIM</p>
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className="relative aspect-video bg-bg border border-line overflow-hidden group"
    >
      <iframe
        ref={iframeRef}
        src={linkEmbed}
        title={title}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        referrerPolicy="no-referrer"
      />

      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <button
          onClick={handleReload}
          aria-label="Tải lại"
          title="Tải lại"
          className="bg-bg/80 backdrop-blur-sm border border-line hover:border-gold hover:text-gold text-cream p-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleFullscreen}
          aria-label="Toàn màn hình"
          title="Toàn màn hình"
          className="bg-bg/80 backdrop-blur-sm border border-line hover:border-gold hover:text-gold text-cream p-2 transition-colors cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default VideoPlayer
