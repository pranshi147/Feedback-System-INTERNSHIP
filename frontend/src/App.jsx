import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageFeedback from "./pages/ManageFeedback";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import MyFeedback from "./pages/MyFeedback";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/submit-feedback"
                    element={
                        <ProtectedRoute>
                            <SubmitFeedback />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-feedback"
                    element={
                        <ProtectedRoute>
                            <MyFeedback />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-feedback"
                    element={
                        <ProtectedRoute>
                            <ManageFeedback />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;