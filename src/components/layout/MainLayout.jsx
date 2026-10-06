// src/components/layout/MainLayout.jsx
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import TopBar from './TopBar'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Marquee top bar */}
      <TopBar />

      {/* Header chính */}
      <Header />

      {/* Nội dung trang */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
