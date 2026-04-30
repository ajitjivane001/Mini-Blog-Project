import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create" element={<Editor />} />
                <Route path="/edit/:id" element={<Editor />} />
              </Route>
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-100 py-8">
            <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} MiniBlog. Built with React and Express.
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
