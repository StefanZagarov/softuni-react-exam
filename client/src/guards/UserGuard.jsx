import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
// Guard for users
export default function UserGuard() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to="/stories" />;

    return (
        <Outlet />
    );
}
