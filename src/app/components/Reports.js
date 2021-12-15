import React, { useState, useEffect, useCallback } from 'react'
import { Table } from './Table';
import { primary_color } from '../helpers'
import own_fetch from '../fetch';

export const Reports = () => {
    const [state, setState] = useState({
        component: '',
        clients: [],
        sales: [],
        total_value_sales: ''
    });
    const [didMount, setDidMount] = useState(false);
    const fetch_clients = useCallback(async () => {
        const clients = await (await own_fetch({ url: '/api/clients' })).json();
        setState(state => ({ ...state, clients }));
    });

    const fetch_sales = useCallback(async () => {
        const data = await (await own_fetch({ url: 'api/sales' })).json();
        const get_data = async () => {
            const sales = new Map();
            let total_value_sales = 0;
            for (const { customer_id: id, sale_value } of data) {
                total_value_sales += sale_value;
                const { name } = await (await own_fetch({ url: `/api/clients/${id}` })).json();
                if (sales.get(id)) {
                    const { _sale_value } = sales.get(id);
                    sales.set(id, {
                        id,
                        name,
                        sale_value: _sale_value + sale_value
                    })
                } else {
                    sales.set(id, {
                        id,
                        name,
                        sale_value
                    });
                }
            }
            return { sales, total_value_sales };
        }
        const { sales, total_value_sales } = await get_data();
        setState(state => ({
            ...state,
            sales: Array.from(sales.values()),
            total_value_sales
        }))
    });

    useEffect(() => {
        if (!didMount) {
            fetch_clients();
            fetch_sales();
            setDidMount(true);
        }
    }, [state, didMount]);

    const handle_click = ({ target: { className: classes } }) => {
        const action = classes.match(/(?<=show\_)\w+/g);
        if (action) {
            setState(state => ({
                ...state,
                component: action[0]
            }));
        }
    };

    const clients_todos = {
        table_fields: {
            header: [
                {
                    name: "id",
                    display_name: "Cédula"
                },
                {
                    name: "name",
                    display_name: "Nombre"
                },
                {
                    name: "email",
                    display_name: "Correo electrónico",
                },
                {
                    name: "address",
                    display_name: "Dirección"
                },
                {
                    name: "phone",
                    display_name: "Teléfono"
                }
            ],
            body: state.clients
        }
    }

    const sales_todos = {
        table_fields: {
            header: [
                {
                    name: "id",
                    display_name: "Cédula"
                },
                {
                    name: "name",
                    display_name: "Nombre"
                },
                {
                    name: "sale_value",
                    display_name: "Valor Total Ventas"
                }
            ],
            body: state.sales
        }
    };


    const custom_element = () => {
        switch (state.component) {
            case 'clients':
                return <Table
                    todos={clients_todos}
                    hide_actions='1'
                />
            case 'sales':
                return <div className="container">
                    <Table
                        todos={sales_todos}
                        hide_actions='1'
                    />
                    <div className="right-align">
                        <button type="button" style={{ margin: '10px 0', cursor: 'default' }} className={`btn ${primary_color}`}>Total ventas: ${state.total_value_sales}</button>
                    </div>
                </div>
            default:
                return
        }
    }

    return (
        <div className="container row s12">
            <div className="col s12 center-align" onClick={handle_click}>
                <button type="button" className={`btn ${primary_color} show_clients`} style={{ margin: "10px 5px" }}>Listado de Clientes</button>
                <button type="button" className={`btn ${primary_color} show_sales`} style={{ margin: "10px 5px" }}>Ventas por Cliente</button>
            </div>
            <div className="col s12">
                {custom_element()}
            </div>
        </div>
    )
}
