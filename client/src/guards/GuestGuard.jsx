import { Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
// Guard for guests
export default function GuestGuard() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <Outlet />
    );
}