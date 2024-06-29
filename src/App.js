import { Route, Routes } from "react-router-dom"
import UserNavbar from "./user/header/UserNavbar"
import Home from "./user/pages/Home"
import About from "./user/pages/About"
import Product from "./user/pages/Product"
import Contact from "./user/pages/Contact"
import AdminNavbar from "./admin/header/AdminNavbar"
import Dashboard from "./admin/pages/Dashboard"
import Manage from "./admin/pages/Manage"

const App = () => {

  let role = "user"

  if (role == "user") {
    return (
      <>
        <UserNavbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </>
    )
  } else if (role == "admin") {

    return (
      <>
        <AdminNavbar />

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/manage" element={<Manage/>}/>
        </Routes>
      </>
    )

  }
  else {

    return <h1>404 Not Found</h1>

  }

}
export default App