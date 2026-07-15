import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const login = (jwt) => {
    console.log("Saving token:", jwt);

    localStorage.setItem("token", jwt);

    console.log("Stored:", localStorage.getItem("token"));

    setToken(jwt);
    };

    const logout = () => {
    console.log("LOGOUT CALLED");

    localStorage.removeItem("token");
    setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}