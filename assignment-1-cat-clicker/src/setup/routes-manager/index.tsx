import CircularProgress from "@mui/material/CircularProgress"
import { Box } from "@mui/system"
import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"


const HomePage = lazy(() => import('../../pages/HomePage/HomePage'))
const CatPage = lazy(() => import('../../pages/CatPage/CatPage'))

const index = () => {
  return (
    <Suspense
      fallback={
        <Box sx={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Box>
      }
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/cats/:id' element={<CatPage />} />
      </Routes>
    </Suspense >
  )
}

export default index