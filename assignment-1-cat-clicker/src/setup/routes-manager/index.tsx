import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const CatPage = lazy(() => import('../../pages/CatPage/CatPage'))

const index = () => {
  return (
    <Suspense
      fallback={<div> "a" </div>}>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cats/:id' element={<CatPage />} />
      </Routes>
    </Suspense >
  )
}

export default index