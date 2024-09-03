import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, approveUser, banUser } from "../API/userApis"; // Adjust the path to your userApis file

export default function Home() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return navigate("/login");
        }

        // Fetch all users on component mount
        async function fetchUsers() {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchUsers();
    }, [navigate]);

    // Function to handle user approval
    const handleApprove = async (userId) => {
        try {
            await approveUser(userId);
            setUsers(users.map(user => 
                user.id === userId ? { ...user, approve: true } : user
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    // Function to handle user ban
    const handleBan = async (userId) => {
        try {
            await banUser(userId);
            setUsers(users.map(user => 
                user.id === userId ? { ...user, approve: false } : user
            ));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.approve ? "Approved" : "Banned"}</td>
                            <td>
                                <button onClick={() => handleApprove(user.id)} disabled={user.approve}>
                                    Approve
                                </button>
                                <button onClick={() => handleBan(user.id)} disabled={!user.approve}>
                                    Ban
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
