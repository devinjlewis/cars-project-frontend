import "./App.css";
import Loader from "./components/Loader/Loader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
const Nav = React.lazy(() => import("./components/Nav/Nav"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Car = React.lazy(() => import("./components/Car/Car"));
const Cars = React.lazy(() => import("./components/Cars/Cars"));
const NewCar = React.lazy(() => import("./components/NewCar/NewCar"));
const EditCar = React.lazy(() => import("./components/EditCar/EditCar"));

function App() {
    return (
        <div className="App">
            <React.Suspense fallback={<Loader />}>
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cars/:id" element={<Car />} />
                        <Route path="/cars/makes/:id" element={<Cars />} />
                        <Route path="/cars/new" element={<NewCar />} />
                        <Route path="/cars/edit/:id" element={<EditCar />} />
                    </Routes>
                </Router>
            </React.Suspense>
        </div>
    );
}

export default App;
