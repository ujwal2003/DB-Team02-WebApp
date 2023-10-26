import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<div className="text-lg underline">Tailwind test</div>}></Route>
    </Routes>
    </>
  )
}

export default App
