import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
	const { user, logout } = useAuth();

	return (
		<nav className="bg-blue-600 p-4 flex flex-wrap items-center justify-between text-white">
			<Link to="/" className="text-xl font-bold">
				SOS App
			</Link>
			<div className="flex flex-wrap items-center space-x-4 mt-2 md:mt-0">
				{!user ? (
					<>
						<Link to="/login" className="mx-2">
							Login
						</Link>
						<Link to="/register" className="mx-2">
							Register
						</Link>
					</>
				) : (
					<>
						<Link to="/dashboard" className="mx-2">
							Dashboard
						</Link>
						<Link to="/contact" className="mx-2">
							Contact
						</Link>
						<Link to="/sos" className="mx-2">
							SOS
						</Link>
						<Link to="/broadcast" className="mx-2">
							Broadcast
						</Link>
						<Link to="/user-management" className="mx-2">
							User Management
						</Link>
						<Link to="/manage-sos" className="mx-2"> {/* Added the Manage SOS link */}
              Manage SOS
            </Link>
						{user.role === "volunteer" && (
							<>
								<Link to="/alert" className="mx-2">
									Alerts
								</Link>
								<Link to="/status" className="mx-2">
									Status
								</Link>

								
							</>
						)}
						<button
							onClick={logout}
							className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
						>
							Logout
						</button>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
