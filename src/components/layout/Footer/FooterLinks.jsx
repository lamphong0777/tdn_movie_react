// src/components/layout/Footer/FooterLinks.jsx
import { ArrowUpRight } from 'lucide-react'
import { FOOTER_LINKS } from '../constants'

const FooterLinkGroup = ({ index, title, links }) => {
  return (
    <div>
      <span className="tracking-editorial text-[10px] text-gold block mb-4">
        {index} / {title}
      </span>
      <ul className="space-y-2.5 text-sm">
        {links.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="group inline-flex items-center gap-1 text-muted hover:text-cream transition-colors"
            >
              {item}
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

const FooterLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      {FOOTER_LINKS.map((group) => (
        <FooterLinkGroup key={group.index} {...group} />
      ))}
    </div>
  )
}

export default FooterLinks
