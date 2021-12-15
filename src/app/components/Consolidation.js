import React, { useState, useEffect, useCallback } from 'react'
import { Table } from './Table'
import { primary_color } from '../helpers'
import own_fetch from '../fetch';

export const Consolidation = () => {
    const [state, setState] = useState({
        sales_by_city: [],
        total_sales_shop: ''
    });
    const [didMount, setDidMount] = useState(false);

    const fetch_cities = useCallback(async () => {
        const cities = await (await own_fetch({ url: '/api/consolidation' })).json();
        if (cities)
            setState(state => ({ ...state, sales_by_city: cities }));
    });

    useEffect(() => {
        if (!didMount) {
            fetch_cities();
            setDidMount(true);
        }
    }, [state, didMount]);

    const todos = {
        table_fields: {
            header: [
                {
                    name: "city",
                    display_name: "Ciudad"
                },
                {
                    name: "total_sales",
                    display_name: "Valor Total Ventas"
                }
            ],
            body: state.sales_by_city
        }
    }
    return (
        <div className="container">
            <Table
                todos={todos}
            />
            <div className="right-align">
                <button type="button" style={{ margin: '20px 0', cursor: "default" }} className={`btn ${primary_color}`}>Total Ventas Tienda ${state.total_sales_shop}</button>
            </div>
        </div>
    )
}
