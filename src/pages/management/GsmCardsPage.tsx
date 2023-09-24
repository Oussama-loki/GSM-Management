import React, { useState, useEffect } from "react";

import { getOperatorEmployeeBoard } from "../../services/user.service";
import EventBus from "../../common/eventBus";
import { GsmCard } from "../../models/GsmCard";

const mockData: GsmCard[] = [
    {
        id: 1,
        phoneNumber: "(+212) 00000000",
        authenticationKey: "0000",
        balance: 200,
        status: "ACTIVE"
    },
    {
        id: 2,
        phoneNumber: "(+212) 00000000",
        authenticationKey: "0000",
        balance: 0,
        status: "DISABLED"
    },
    {
        id: 3,
        phoneNumber: "(+212) 00000000",
        authenticationKey: "0000",
        balance: 250,
        status: "ACTIVE"
    }
    // Add more items as needed
];

const GsmCardsPage: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [items, setItems] = useState<GsmCard[]>(mockData);

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
                            <h3>GSM Cards</h3>
                        </header>
                        <div className="container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Phone Number</th>
                                        <th>Authentication Key</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                        <th>Assigned To</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td>{item.authenticationKey}</td>
                                            <td>{item.balance}</td>
                                            <td>{item.status}</td>
                                            <td>No one</td>
                                            <td>
                                                <button className="btn btn-success mr-3">Assign To Employee</button>
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

export default GsmCardsPage;