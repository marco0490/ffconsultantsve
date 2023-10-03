import { useEffect } from 'react'

function Blog() {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])
  return <div>Blog</div>
}

export default Blog
