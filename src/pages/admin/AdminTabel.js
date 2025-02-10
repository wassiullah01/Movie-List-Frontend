import { useEffect, useState } from "react";
// import context from "../../context/context";

const AdminTabel = () => {
    // const { permissions, setPermissions } = useContext(context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("users")) || [];

        const updatedUsers = data.map((user) => {
            if (!user.permissions) {
                user.permissions =
                    user.email === "admin@gmail.com"
                        ? {
                            create: true,
                            read: true,
                            update: true,
                            delete: true,
                        }
                        : {
                            create: false,
                            read: false,
                            update: false,
                            delete: false,
                        };
            }
            return user;
        });

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    }, []);

    const handleCheckboxChange = (email, permissionType) => {
        const updatedUsers = users.map((user) => {
            if (user.email === email) {
                return {
                    ...user,
                    permissions: {
                        ...user.permissions,
                        [permissionType]: !user.permissions[permissionType],
                    },
                };
            }
            return user;
        });

        console.log("Updated permissions for user: ", updatedUsers.find((u) => u.email === email));
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    return (
        <div className="admin-container text-center">
            <h1 className="text-white my-5">ADMIN PANEL</h1>
            <table className="table table-hover table-bordered">
                <thead className="table-success">
                    <tr>
                        <th scope="col">Emails</th>
                        <th scope="col">Create</th>
                        <th scope="col">Read</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((user) => user.email !== "admin@gmail.com")
                        .map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.email}</th>
                                <td>
                                    <input
                                        className="form-check-input shadow-none"
                                        type="checkbox"
                                        style={{ backgroundColor: "rgb(91 163 130 / 72%)" }}
                                        checked={user.permissions?.create || false}
                                        onChange={() => handleCheckboxChange(user.email, "create")}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-check-input shadow-none"
                                        type="checkbox"
                                        style={{ backgroundColor: "rgb(91 163 130 / 72%)" }}
                                        checked={user.permissions?.read || false}
                                        onChange={() => handleCheckboxChange(user.email, "read")}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-check-input shadow-none"
                                        type="checkbox"
                                        style={{ backgroundColor: "rgb(91 163 130 / 72%)" }}
                                        checked={user.permissions?.update || false}
                                        onChange={() => handleCheckboxChange(user.email, "update")}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-check-input shadow-none"
                                        type="checkbox"
                                        style={{ backgroundColor: "rgb(91 163 130 / 72%)" }}
                                        checked={user.permissions?.delete || false}
                                        onChange={() => handleCheckboxChange(user.email, "delete")}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTabel;