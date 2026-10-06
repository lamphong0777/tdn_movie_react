import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null

  // Tạo mảng số trang hiển thị (có dấu ...)
  const getVisiblePages = () => {
    const delta = 2 // số trang hiển thị 2 bên trang hiện tại
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    // Xử lý trang đầu
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    // Xử lý trang cuối
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return
    onPageChange(page)
    // Scroll lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      {/* Prev */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Trang trước"
        className="flex items-center gap-1 px-3 py-2 border border-line text-muted hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-muted transition-colors cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Page numbers */}
      {visiblePages.map((page, idx) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${idx}`}
              className="px-3 py-2 text-muted tracking-editorial text-sm select-none"
            >
              …
            </span>
          )
        }

        const isActive = page === currentPage
        return (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`min-w-[40px] px-3 py-2 text-sm tracking-editorial border transition-colors cursor-pointer ${
              isActive
                ? 'bg-gold border-gold text-inverse font-bold'
                : 'bg-bg border-line text-muted hover:border-gold hover:text-gold'
            }`}
          >
            {page}
          </button>
        )
      })}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Trang sau"
        className="flex items-center gap-1 px-3 py-2 border border-line text-muted hover:border-gold hover:text-gold disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-line disabled:hover:text-muted transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Pagination
