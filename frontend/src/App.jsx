import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageFeedback from "./pages/ManageFeedback";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitFeedback from "./pages/SubmitFeedback";
import MyFeedback from "./pages/MyFeedback";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import Survey from "./pages/Survey";
import SurveyAnalytics from "./pages/SurveyAnalytics";

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

                <Route
                    path="/users"
                    element={
                        <ProtectedRoute>
                            <Users />
                        </ProtectedRoute>
                    }
                />
                
                <Route
                    path="/survey"
                    element={
                        <ProtectedRoute>
                            <Survey />
                        </ProtectedRoute>
                    }
                />
                
                <Route
                    path="/survey-analytics"
                    element={
                        <ProtectedRoute>
                            <SurveyAnalytics />
                        </ProtectedRoute>
                    }
                />
                

            </Routes>
        </BrowserRouter>
    );
}

export default App;