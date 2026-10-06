// src/components/layout/Footer/Footer.jsx
import FooterBrand from './FooterBrand'
import FooterLinks from './FooterLinks'

const Footer = () => {
  return (
    <footer className="bg-bg border-t border-line mt-20">
      {/* Big logo row */}
      <div className="container mx-auto px-4 pt-16 pb-10 border-b border-line">
        <FooterBrand />
      </div>

      {/* Links grid */}
      <div className="container mx-auto px-4 py-12">
        <FooterLinks />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted text-[11px] tracking-editorial">
            © 2024 VSMOV — ALL RIGHTS RESERVED
          </p>
          <p className="text-muted text-[11px] tracking-editorial">
            MADE WITH <span className="text-gold">♥</span> IN VIETNAM
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
