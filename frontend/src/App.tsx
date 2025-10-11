import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DealsPage from "./pages/DealsPage";
import "./App.css";
import ReviewsPage from "./pages/ReviewsPage";
import ReviewDetailPage from "./pages/ReviewDetailPage";
import BlogsPage from "./pages/BlogsPage";
import ComparisionsPage from "./pages/ComparisionsPage";
import ComparisionsDetailPage from "./pages/ComparisionsDetailPage";
import BlogsDetailPage from "./pages/BlogsDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/review/:id" element={<ReviewDetailPage />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blog/:id" element={<BlogsDetailPage />} />
      <Route path="/comparisons" element={<ComparisionsPage />} />
      <Route path="/comparison/:id" element={<ComparisionsDetailPage />} />
    </Routes>
  );
}

export default App;
