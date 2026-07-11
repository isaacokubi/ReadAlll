import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../pages/customer/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Books from "../pages/customer/Books";
import BookDetails from "../pages/customer/BookDetails";
import Cart from "../pages/customer/Cart";
import Dashboard from "../pages/admin/Dashboard";
import ManageBooks from "../pages/admin/ManageBooks";
import ManageCategories from "../pages/admin/ManageCategories";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageUsers from "../pages/admin/ManageUsers";
import ProtectedRoute from "../components/protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route element={<ProtectedRoute role="admin" />}>
         <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/books" element={<ManageBooks/>} />
      </Route>
     
      <Route element={<ProtectedRoute role="admin" />}>
         <Route path="/admin/categories" element={<ManageCategories/>} />
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
         <Route path="/admin/orders" element={<ManageOrders/>} />
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/users" element={<ManageUsers/>} />
      </Route>
    </Routes> 
  );
};

export default AppRoutes;