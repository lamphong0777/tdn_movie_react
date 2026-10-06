import { MARQUEE_ITEMS } from '../constants'

const TopBar = () => {
  return (
    <div className="bg-gold text-inverse overflow-hidden border-b border-gold-soft">
      <div className="flex animate-marquee whitespace-nowrap py-1.5">
        {[...Array(4)].map((_, dupIdx) => (
          <div key={dupIdx} className="flex items-center shrink-0">
            {MARQUEE_ITEMS.map((item, idx) => (
              <span
                key={`${dupIdx}-${idx}`}
                className="flex items-center gap-4 px-6 text-[11px] font-bold tracking-editorial"
              >
                {item}
                <span className="w-1 h-1 bg-inverse rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopBar
