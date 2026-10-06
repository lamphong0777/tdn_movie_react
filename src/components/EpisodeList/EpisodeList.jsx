// src/components/EpisodeList/EpisodeList.jsx
import { Play } from 'lucide-react'
import { useState } from 'react'

const EpisodeList = ({ servers = [], currentEpisodeSlug, onSelectEpisode }) => {
  const [activeServerIndex, setActiveServerIndex] = useState(0)

  if (!servers.length) {
    return (
      <div className="border border-line p-8 text-center">
        <p className="text-muted tracking-editorial text-xs">CHƯA CÓ TẬP PHIM</p>
      </div>
    )
  }

  const activeServer = servers[activeServerIndex]
  const episodes = activeServer?.episodes || []

  return (
    <div className="space-y-4">
      {/* Server tabs (nếu có nhiều server) */}
      {servers.length > 1 && (
        <div className="flex flex-wrap gap-px bg-line border border-line w-fit">
          {servers.map((server, idx) => {
            const isActive = idx === activeServerIndex
            return (
              <button
                key={idx}
                onClick={() => setActiveServerIndex(idx)}
                className={`px-4 py-2 text-xs tracking-editorial transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gold text-inverse font-bold'
                    : 'bg-bg text-muted hover:text-cream hover:bg-surface'
                }`}
              >
                {server.serverName || `Server ${idx + 1}`}
              </button>
            )
          })}
        </div>
      )}

      {/* Episode grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-px bg-line border border-line">
        {episodes.map((ep) => {
          const isActive = ep.slug === currentEpisodeSlug
          return (
            <button
              key={ep.slug}
              onClick={() => onSelectEpisode?.(ep, activeServer)}
              title={`Tập ${ep.name}`}
              className={`relative aspect-square flex items-center justify-center text-sm font-bold tracking-wide transition-all cursor-pointer group ${
                isActive
                  ? 'bg-gold text-inverse'
                  : 'bg-bg text-muted hover:bg-surface hover:text-gold'
              }`}
            >
              {!isActive && (
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-3 h-3 fill-current" />
                </span>
              )}
              <span className={isActive ? '' : 'group-hover:opacity-0 transition-opacity'}>
                {ep.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default EpisodeList
