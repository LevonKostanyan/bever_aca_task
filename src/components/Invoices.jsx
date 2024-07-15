import React, {useEffect, useState} from 'react';
import InvoiceLines from './InvoiceLines';
import {useNavigate} from 'react-router-dom';
import {API_URL, userStorageKey} from "../constants";

const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [invoiceLines, setInvoiceLines] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem(userStorageKey));

        if (!loggedInUser) {
            navigate('/');
            return;

        }
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`${API_URL}/invoices`);
                const data = await response.json();
                const userInvoices = data.value.filter(invoice => invoice.UserId === loggedInUser.UserId);
                setInvoices(userInvoices);
            } catch (error) {
                console.error('Failed to load invoices', error);
            }
        };

        const fetchInvoiceLines = async () => {
            try {
                const response = await fetch(`${API_URL}/invoicelines`);
                const data = await response.json();
                setInvoiceLines(data.value);
            } catch (error) {
                console.error('Failed to load invoice lines', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/products`);
                const data = await response.json();
                setProducts(data.value);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        fetchInvoices();
        fetchInvoiceLines();
        fetchProducts();
    }, [navigate]);

    const handleSelectInvoice = (invoiceId) => {
        setSelectedInvoice(invoiceId);
    };

    const calculateTotalAmount = (invoiceId) => {
        const relatedInvoiceLines = invoiceLines.filter(line => line.InvoiceId === invoiceId);
        return relatedInvoiceLines.reduce((acc, line) => {
            const product = products.find(p => p.ProductId === line.ProductId);
            return acc + (product ? line.Quantity * product.Price : 0);
        }, 0);
    };

    return (
        <div className="invoices-container container">
            <h2>Invoices</h2>
            <table>
                <thead>
                <tr>
                    <th>Select</th>
                    <th>Invoice ID</th>
                    <th>Name</th>
                    <th>Paid Date</th>
                    <th>Total Amount</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.InvoiceId}>
                        <td>
                            <input
                                type="radio"
                                name="selectedInvoice"
                                value={invoice.InvoiceId}
                                onChange={() => handleSelectInvoice(invoice.InvoiceId)}
                            />
                        </td>
                        <td>{invoice.InvoiceId}</td>
                        <td>{invoice.Name}</td>
                        <td>{invoice.PaidDate}</td>
                        <td>{calculateTotalAmount(invoice.InvoiceId)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedInvoice && <InvoiceLines invoiceId={selectedInvoice}/>}
        </div>
    );
};

export default Invoices;
