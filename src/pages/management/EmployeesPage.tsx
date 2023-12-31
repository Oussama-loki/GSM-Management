import React, { useState, useEffect } from "react";

import { getOperatorEmployeeBoard } from "../../services/user.service";
import EventBus from "../../common/eventBus";
import { Employee } from "../../models/Employee";

const mockData: Employee[] = [
    new Employee(
        1,
        "Oussama",
        "Loukili Idrissi",
        "(+212) 00000000",
        "test@company.ma",
        234,
        new Date("2019-02-16"),
        "IT",
        "Manager"
    ),
    new Employee(
        8,
        "Anas",
        "Mourad",
        "(+212) 00000000",
        "test@company.ma",
        452,
        new Date("2022-01-24"),
        "Operations",
        "Manager"
    ),
    new Employee(
        10,
        "Imad",
        "Maailil",
        "(+212) 00000000",
        "test@company.ma",
        755,
        new Date("2011-11-22"),
        "IT",
        "Engineer"
    ),
    // Add more items as needed
];

const EmployeesPage: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [items, setItems] = useState<Employee[]>(mockData);

    useEffect(() => {
        getOperatorEmployeeBoard().then(
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
            {content === "Admin content." || content === "Operator employee content."
                ?
                (
                    <>
                        <header className="jumbotron">
                            <h3>Employees</h3>
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
                                        <th>Employee ID</th>
                                        <th>Join Date</th>
                                        <th>Departement</th>
                                        <th>Position</th>
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
                                            <td>{item.employeeId}</td>
                                            <td>{item.joinDate.toDateString()}</td>
                                            <td>{item.departement}</td>
                                            <td>{item.position}</td>
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

export default EmployeesPage;