import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoot({ children }) {
    const { user } = useSelector((state) => state.auth);
    if (!user) {
        return <Navigate to="/auth" replace={true} />
    }
    return children
}