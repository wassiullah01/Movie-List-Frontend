import { useEffect, useState } from "react";
import axios from "axios";

const AdminTabel = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/permissions/admin-permissions`,
            withCredentials: true,
        })
            .then((response) => {
                if (response.data.status === "success") {
                    const fetchedUsers = response.data.data.map((user) => ({
                        email: user.email,
                        permissions: {
                            create: user.permissions.includes("create"),
                            view: user.permissions.includes("view"),
                            update: user.permissions.includes("update"),
                            delete: user.permissions.includes("delete"),
                        },
                    }));
                    setUsers(fetchedUsers);
                    console.log("Users fetched:", fetchedUsers);
                }
            })
            .catch((error) => console.error("Error fetching users:", error.response?.data?.message || error.message));
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

        setUsers(updatedUsers);

        axios({
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/permissions/update-user-permissions`,
            withCredentials: true,
            data: { email, permisionType: permissionType },
        })
            .then(() => {
                console.log(`Permission updated: ${permissionType} for ${email}`);
            })
            .catch((error) => console.error("Error updating permissions:", error.response?.data?.message || error.message));
    };

    return (
        <div className="admin-container text-center">
            <h1 className="text-white my-5">ADMIN PANEL</h1>
            <table className="table table-hover table-bordered">
                <thead className="table-success">
                    <tr>
                        <th scope="col">Emails</th>
                        <th scope="col">Create</th>
                        <th scope="col">View</th>
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
                                {["create", "view", "update", "delete"].map((permType) => (
                                    <td key={permType}>
                                        <input
                                            className="form-check-input shadow-none"
                                            type="checkbox"
                                            style={{ backgroundColor: "rgb(91 163 130 / 72%)" }}
                                            checked={user.permissions?.[permType] || false}
                                            onChange={() => handleCheckboxChange(user.email, permType)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminTabel;