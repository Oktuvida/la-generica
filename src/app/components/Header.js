import React, { useEffect } from 'react'
import { get_token, primary_color, remove_token } from '../helpers'
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    const token = get_token()

    useEffect(() => {
        const el = document.querySelector('.sidenav');
        M.Sidenav.init(el, {});
    }, []);
    const handle_click = e => {
        const match = e.target.className.match(/\w+(?=\_link)/) || null;
        if (match) {
            e.preventDefault();
            if (match[0] === 'logout') {
                remove_token();
                navigate('/');
            } else {
                navigate(`/${match}`);
            }
        }
    }
    const list_items = (className, id) =>
        <ul id={id} className={`${token ? 'visible_el' : 'invisible_el'} ${className}`}>
            <li><a href="#" className="clients_link">Clientes</a></li>
            <li><a href="#" className="products_link">Productos</a></li>
            <li><a href="#" className="sales_link">Ventas</a></li>
            <li><a href="#" className="reports_link">Reportes</a></li>
            <li><a href="#" className="consolidation_link">Consolidación</a></li>
            <li><a href="#" className="logout_link" style={{ textDecoration: "underline white" }}>Cerrar Sesión</a></li>
        </ul>
    return (
        <header>
            <nav className={primary_color} onClick={handle_click}>
                <div className="nav-wrapper">
                    <a className={`brand-logo ${token ? 'clients' : ''}_link`} style={{ margin: '0 20px' }} href="#">La Genérica</a>
                    <a href="#" className={`${token ? 'visible_el' : 'invisible_el'} sidenav-trigger`} data-target="mobile-nav">
                        <i className="material-icons">menu</i>
                    </a>
                    {list_items("right hide-on-med-and-down")}
                    {list_items("sidenav", "mobile-nav")}
                </div>
            </nav>
        </header>
    )
}
