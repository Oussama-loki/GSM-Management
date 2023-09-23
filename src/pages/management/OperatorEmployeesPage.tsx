import React, { useState, useEffect } from "react";

import { getAdminBoard } from "../../services/user.service";
import EventBus from "../../common/eventBus";
import { OperatorsEnum } from "../../enums/OperatorsEnum";
import { OperatorEmployee } from "../../models/OperatorEmployee";

const mockData: OperatorEmployee[] = [
    {
        id: 2,
        firstName: "Oussama",
        lastName: "Loukili Idrissi",
        phoneNumber: "(+212) 00000000",
        email: "test@company.ma",
        username: "OLoukiliOperatorEmployee",
        roles: ["operatorEmployee"],
        operator: OperatorsEnum.IAM,
        employeeId: 1
    },
    {
        id: 4,
        firstName: "Othmane",
        lastName: "Tibba",
        phoneNumber: "(+212) 00000000",
        email: "test@company.ma",
        username: "Tibox",
        roles: ["admin", "operatorEmployee"],
        operator: OperatorsEnum.Orange,
        employeeId: 1
    }
    // Add more items as needed
];

const OperatorEmployeesPage: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [items, setItems] = useState<OperatorEmployee[]>(mockData);

    useEffect(() => {
        getAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    return (
        <div className="container-fluid">
            {content === "Admin content."
                ?
                (
                    <>
                        <header className="jumbotron">
                            <h3>Operator Employees</h3>
                        </header>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>Roles</th>
                                        <th>Operator</th>
                                        <th>Employee ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.email}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                {item.roles.map((role, index) => (
                                                    <React.Fragment key={index}>
                                                        {role === "admin"
                                                            ?
                                                            "Admin"
                                                            :
                                                            role === "operatorEmployee"
                                                                ?
                                                                "Operator Employee"
                                                                :
                                                                "Unknown Role"
                                                        }
                                                        {index !== item.roles.length - 1 && ', '}
                                                    </React.Fragment>
                                                ))}
                                            </td>
                                            <td>{item.operator}</td>
                                            <td>{item.employeeId}</td>
                                            <td>
                                                <button className="btn btn-primary mr-3">Edit</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
                :
                (
                    <header className="jumbotron">
                        <h3>{content}</h3>
                    </header>
                )}
        </div>
    );
};

export default OperatorEmployeesPage;