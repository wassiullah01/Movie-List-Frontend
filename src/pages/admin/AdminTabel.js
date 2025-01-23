import { useEffect, useState } from "react";

const AdminTabel = () => {

    const [users, setUsers] = useState([])
    const [permissions, setPermissions] = useState({})

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("signUp")) || [];
        setUsers(data)

        const initialPermissions = {};
        data.forEach(user => {
            initialPermissions[user.email] = {
                create: false,
                read: false,
                update: false,
                delete: false,
            };
        });
        setPermissions(initialPermissions);
    }, [])

    const handleCheckboxChange = (email, permissionType) => {
        // Update permissions for the selected user
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [email]: {
                ...prevPermissions[email],
                [permissionType]: !prevPermissions[email][permissionType],
            },
        }));
    };

    useEffect(() => {
        localStorage.setItem("permissions", JSON.stringify(permissions));
    }, [permissions]);

    return (
        <div className="admin-container text-center">

            <h1 className="text-white my-5">ADMIN PANEL</h1>
            <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Emails</th>
                        <th scope="col">Create</th>
                        <th scope="col">Read</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{user.email}</th>
                            <td><input
                                className="form-check-input bg-dark shadow-none"
                                type="checkbox"
                                checked={permissions[user.email]?.create || false}
                                onChange={() => handleCheckboxChange(user.email, "create")}
                            /></td>
                            <td><input
                                className="form-check-input bg-dark shadow-none"
                                type="checkbox"
                                checked={permissions[user.email]?.read || false}
                                onChange={() => handleCheckboxChange(user.email, "read")}
                            /></td>
                            <td><input
                                className="form-check-input bg-dark shadow-none"
                                type="checkbox"
                                checked={permissions[user.email]?.update || false}
                                onChange={() => handleCheckboxChange(user.email, "update")}
                            /></td>
                            <td><input
                                className="form-check-input bg-dark shadow-none"
                                type="checkbox"
                                checked={permissions[user.email]?.delete || false}
                                onChange={() => handleCheckboxChange(user.email, "delete")}
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    );
}

export default AdminTabel;