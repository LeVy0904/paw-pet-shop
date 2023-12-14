import './App.css';
import Credit from './components/credit/credit';
import Cart from './components/cart/cart';
import Slider from './components/slider/reactslider';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Home from './pages/homePage';
import ProductCard from './components/product/ProductCard';
import Profile from './pages/profilePage';
import ProductDetail from './components/product-detail/ProductDetail';
import NotFound from './components/not-found/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/signup/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <div className='container1'></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:customerid" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products/" element={<ProductCard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/slider" element={<Slider />} />
          <Route path="/profile/:customerid" element={<Profile />} />
          <Route path="/cart/:customerid" element={<Cart />} />
          <Route path="/credit" element={<Credit />} />
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/tvshows" element={<Tvshows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/moviesdetail" element={<MoviesDetail />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

