// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home.jsx";
// import Doctors from "./pages/Doctors.jsx";
// import Login from "./pages/Login.jsx";
// import About from "./pages/About.jsx";
// import Contacts from "./pages/Contacts.jsx";
// import MyProfile from "./pages/MyProfile.jsx";
// import Appointments from "./pages/Appointments.jsx";
// import MyApppointments from "./pages/MyApppointments.jsx";
// import Header from "./components/Header.jsx";
// import { ToastContainer, toast } from "react-toastify";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         {/* <Header/> */}
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/doctors" element={<Doctors />}></Route>
//           <Route path="/doctors/:speciality" element={<Doctors />}></Route>
//           <Route path="/login" element={<Login />}></Route>
//           <Route path="/about" element={<About />}></Route>
//           <Route path="/contacts" element={<Contacts />}></Route>
//           <Route path="/myappointments" element={<MyApppointments />}></Route>
//           <Route path="/myprofile" element={<MyProfile />}></Route>
//           <Route path="/appointments/:docId" element={<Appointments />}></Route>
//         </Routes>
//         <ToastContainer />
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;




import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contacts from "./pages/Contacts.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Appointments from "./pages/Appointments.jsx";
import MyApppointments from "./pages/MyApppointments.jsx";
import Header from "./components/Header.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />
        {/* <Header/> */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/myappointments" element={<MyApppointments />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/appointments/:docId" element={<Appointments />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
