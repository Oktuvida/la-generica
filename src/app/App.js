import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header'
import { Client } from './components/Client'
import { Product } from './components/Product';
import { Sale } from './components/Sale';
import { Reports } from './components/Reports';
import { Consolidation } from './components/Consolidation';
import { Login } from './components/Login';

export const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/clients" element={<Client />} />
                <Route path="/products" element={<Product />} />
                <Route path="/sales" element={<Sale />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/consolidation/" element={<Consolidation />} />
            </Routes>
        </Router>
    )
}
