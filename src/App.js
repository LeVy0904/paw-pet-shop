import './App.css';
import Credit from './components/credit/credit';
import Cart from './pages/cartPage';
import Slider from './components/slider/reactslider';
import About from './components/about/about';
import Contact from './components/contact/contact';
import Home from './pages/homePage';
import ProductCard from './pages/productPage';
import Profile from './pages/profilePage';
import ProductDetail from './pages/detailProductPage';
import PetCart from './pages/petPage';
import EditProduct from './components/modal/EditProduct';
import NotFound from './components/not-found/NotFound';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/signup/Signup';
import AllProductCart from './pages/allProductPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className='container1'></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:customerid" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductCard />} />
          <Route path="/all-product" element={<AllProductCart />} />
          <Route path="/pet" element={< PetCart />} />
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
        {/* <IconAdd /> */}
        {/* <Footer /> */}
      </Router>
    </div>

  );
}

export default App;

