import React, { useState, useEffect } from "react";

import { getOperatorEmployeeBoard } from "../../services/user.service";
import EventBus from "../../common/eventBus";
import { Subscription } from "../../models/Subscription";

const mockData: Subscription[] = [
    {
        id: 1,
        startDate: new Date("2020-01-01"),
        endDate: new Date("2023-01-01"),
        credit: 900,
        card: {
            id: 1,
            phoneNumber: "(+212) 00000000",
            authenticationKey: "0000",
            balance: 200,
            status: "ACTIVE"
        }
    },
    {
        id: 2,
        startDate: new Date("2020-01-01"),
        endDate: new Date("2023-01-01"),
        credit: 300,
        card: {
            id: 2,
            phoneNumber: "(+212) 00000000",
            authenticationKey: "0000",
            balance: 0,
            status: "DISABLED"
        }
    },
    {
        id: 3,
        startDate: new Date("2020-01-01"),
        endDate: new Date("2023-01-01"),
        credit: 640,
        card: {
            id: 3,
            adapterType: "SIP Trunking Adapter",
            balance: 600,
            status: "INACTIVE"
        }
    }
    // Add more items as needed
];

const SubscriptionsPage: React.FC = () => {
    const [content, setContent] = useState<string>("");
    const [items, setItems] = useState<Subscription[]>(mockData);

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
                            <h3>Subscriptions</h3>
                        </header>
                        <div className="container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Credit</th>
                                        <th>Card ID</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.startDate.toDateString()}</td>
                                            <td>{item.endDate.toDateString()}</td>
                                            <td>{item.credit}</td>
                                            <td>{item.card.id}</td>
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

export default SubscriptionsPage;