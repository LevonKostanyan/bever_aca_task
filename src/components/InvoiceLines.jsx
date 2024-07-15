import React, {useEffect, useState} from 'react';
import {API_URL} from "../constants";

const InvoiceLines = ({invoiceId}) => {
    const [invoiceLines, setInvoiceLines] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchInvoiceLines = async () => {
            try {
                const response = await fetch(`${API_URL}/invoicelines?$filter=InvoiceId eq ${invoiceId}`);
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

        fetchInvoiceLines();
        fetchProducts();
    }, [invoiceId]);

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = invoiceLines.reduce((acc, line) => {
                const product = products.find(p => p.ProductId === line.ProductId);
                return acc + (product ? line.Quantity * product.Price : 0);
            }, 0);
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [invoiceLines, products]);

    return (
        <div className="invoice-lines">
            <h3>Invoice Lines for Invoice ID: {invoiceId}</h3>
            <table>
                <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {invoiceLines.map(line => {
                    const product = products.find(p => p.ProductId === line.ProductId);
                    return (
                        <tr key={line.InvoiceLineId}>
                            <td>{line.ProductId}</td>
                            <td>{line.Quantity}</td>
                            <td>{product ? product.Price : 'N/A'}</td>
                            <td>{product ? line.Quantity * product.Price : 'N/A'}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            <h4>Total Amount: {totalAmount}</h4>
        </div>
    );
};

export default InvoiceLines;
