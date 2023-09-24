import React, { useState, useEffect } from "react";

import { getOperatorEmployeeBoard } from "../../services/user.service";
import EventBus from "../../common/eventBus";
import { VoipCard } from "../../models/VoipCard";

const mockData: VoipCard[] = [
    {
        id: 1,
        adapterType: "PCI VoIP Adapter",
        balance: 500,
        status: "ACTIVE"
    },
    {
        id: 2,
        adapterType: "Analog Telephone Adapter",
        balance: 0,
        status: "DISABLED"
    },
    {
        id: 3,
        adapterType: "SIP Trunking Adapter",
        balance: 600,
        status: "INACTIVE"
    },
    // Add more items as needed
];

const VoipCardsPage: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [items, setItems] = useState<VoipCard[]>(mockData);

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
                            <h3>VOIP Cards</h3>
                        </header>
                        <div className="container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Adapter Type</th>
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
                                            <td>{item.adapterType}</td>
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

export default VoipCardsPage;