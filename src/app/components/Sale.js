import React, { useState } from 'react'
import { Form } from './Form';
import { Table } from './Table';
import { primary_color, show_msg } from '../helpers';
import own_fetch from '../fetch';

export const Sale = () => {
    const [state, setState] = useState({
        customer_id: '',
        name: '',
        sale_code: '',
        product_code: '',
        number_products: '',
        sale_total: '',
        sale_vat: '',
        sale_value: '',
        sale_details: []
    })
    const api_url = '/api/sales';

    const handle_submit = async e => {
        e.preventDefault();
        if (!state.name) {
            show_msg("Primero debes consultar un cliente");
        } else if (state.sale_details.length <= 2) {
            show_msg("Debes tener por lo menos 3 productos añadidos");
        } else if (confirm("¿Está seguro que desea continuar?")) {
            state.sale_details.forEach(async product => {
                product._id = null;
                await own_fetch({ url: '/api/sale_details', method: "POST", body: JSON.stringify(product) });
            });
            const data = await (await own_fetch({ url: '/api/sale_details' })).json();
            const len = data.length;
            const sale_details = data.slice(len - state.sale_details.length, len).map(product => product._id);
            await own_fetch({ url: api_url, method: 'POST', body: JSON.stringify({ ...state, sale_details }) });
            show_msg("Venta guardada");
            setState(_ => ({
                customer_id: '',
                name: '',
                sale_code: '',
                product_code: '',
                number_products: '',
                sale_total: '',
                sale_vat: '',
                sale_value: '',
                sale_details: []
            }))
        }
    };

    const handle_change = ({ target: { name, value } }) => {
        setState(state => ({ ...state, [name]: value }));
    };

    const handle_click = async ({ target }) => {
        switch (target.name) {
            case "verify_client":
                const id_input = document.querySelector("input[name='customer_id']");
                if (id_input.value.match(/^\d+$/g)) {
                    try {
                        const { name } = await (await own_fetch({ url: `/api/clients/${id_input.value}` })).json();
                        const sales = await (await own_fetch({ url: api_url })).json();
                        setState(state => ({
                            ...state,
                            name,
                            sale_code: sales.length > 0 ? Number(sales.at(-1).sale_code) + 1 : 1,
                        }))
                        id_input.readOnly = true
                        id_input.className = "";
                    } catch {
                        show_msg("Cliente no encontrado");
                    }
                }
                return
            case "verify_product":
                if (!state.name) {
                    show_msg("Debes primero consultar un cliente");
                } else {
                    const { value: comp_url } = document.querySelector("input[name='product_code']");
                    const { value: number_products } = document.querySelector("input[name='number_products']");
                    const regex = /^\d+$/g;
                    if (comp_url.match(regex) && number_products.match(regex)) {
                        try {
                            const { product_code, product_name, purchase_price: total_value, vat_sale }
                                = await (await own_fetch({ url: `/api/products/${comp_url}` })).json();
                            setState(state => ({
                                ...state,
                                product_code: '',
                                number_products: '',
                                sale_total: state.sale_total ? state.sale_total + (total_value * number_products)
                                    : total_value * number_products,
                                sale_vat: state.sale_vat ? state.sale_vat : vat_sale,
                                sale_value: state.sale_value ? state.sale_value + (total_value * (1 + vat_sale / 100) * number_products)
                                    : total_value * (1 + (vat_sale / 100)) * number_products,
                                sale_details: [...state.sale_details, {
                                    _id: state.sale_details.length > 0 ? state.sale_details.at(-1)._id + 1 : 1,
                                    product_code,
                                    product_name,
                                    number_products,
                                    total_value: total_value * number_products,
                                    vat_value: vat_sale,
                                    sale_value: total_value * (1 + (vat_sale / 100)) * number_products,
                                }]
                            }));
                            show_msg("Producto añadido");
                        } catch {
                            show_msg("Producto no encontrado");
                        }

                    }
                }
                return
            default:
                return
        }
    };

    const handle_delete = id => {
        let sale_total = state.sale_total;
        let sale_value = state.sale_value
        const sale_details = state.sale_details.filter(({ _id }, i) => {
            if (_id === id) {
                const { total_value: value, number_products } = state.sale_details[i];
                sale_total -= value;
                sale_value -= (value * (1 + state.sale_vat / 100));
            }
            return _id !== id;
        });
        setState(state => ({
            ...state,
            sale_details: sale_details || [],
            sale_total: sale_total || '',
            sale_value: sale_value || '',
            sale_vat: products.length > 0 ? state.sale_vat : ''
        }))
    };

    const todos = {
        form_fields: [
            {
                custom_element: key => <div className="row s12" key={key}>
                    <div className="input_field col s4">
                        <input
                            name="customer_id"
                            placeholder='Cédula'
                            type="text"
                            pattern="[0-9]+"
                            className="validate"
                            value={state.customer_id}
                            onChange={handle_change}
                        />
                        <span
                            className="helper-text"
                            data-error="Únicamente se permiten números"
                        >
                        </span>
                    </div>
                    <button type="button" name="verify_client" onClick={handle_click} className={`btn ${primary_color} col s2`}>Consultar</button>
                    <div className="input_field col s3">
                        <input
                            name="name"
                            placeholder="Cliente"
                            type="text"
                            value={state.name}
                            readOnly
                        />
                    </div>
                    <div className="input_field col s3">
                        <input
                            name="sale_code"
                            placeholder="Consec."
                            type="text"
                            value={state.sale_code}
                            readOnly
                        />
                    </div>
                </div>
            },
            {
                custom_element: key => <div className="row s12" key={key}>
                    <div className="input_field col s6">
                        <input
                            name="product_code"
                            placeholder="Código del producto"
                            type="text"
                            pattern="[0-9]+"
                            className="validate"
                            value={state.product_code}
                            onChange={handle_change}
                        />
                        <span
                            className="helper-text"
                            data-error="Únicamente se permiten números"
                        ></span>
                    </div>
                    <div className="input_field col s3">
                        <input
                            name="number_products"
                            placeholder="Cantidad"
                            type="text"
                            pattern="[0-9]+"
                            className="validate"
                            value={state.number_products}
                            onChange={handle_change}
                        />
                        <span
                            className="helper-text"
                            data-error="Únicamente se permiten números"
                        ></span>
                    </div>
                    <button type="button" name="verify_product" onClick={handle_click} className={`btn ${primary_color} col s3`}>Consultar</button>
                </div>
            },
            {
                custom_element: key =>
                    <Table
                        key={key}
                        todos={todos}
                        handle_delete={handle_delete}
                    />
            },
            {
                custom_element: key => <Table key={key}
                    hide_actions={1}
                    todos={{
                        table_fields: {
                            header: [
                                {
                                    name: "sale_total",
                                    display_name: "Total Venta"
                                },
                                {
                                    name: "sale_vat",
                                    display_name: "Total IVA"
                                },
                                {
                                    name: "sale_value",
                                    display_name: "Total con IVA"
                                }
                            ],
                            body: [
                                {
                                    sale_total: state.sale_total || 0,
                                    sale_vat: state.sale_vat || 0,
                                    sale_value: state.sale_value || 0
                                }
                            ]
                        }


                    }}
                />
            }
        ],
        table_fields: {
            header: [
                {
                    name: "product_code",
                    display_name: "Cod. Producto"
                },
                {
                    name: "product_name",
                    display_name: "Nombre Producto",
                },
                {
                    name: "number_products",
                    display_name: "Cant."
                },
                {
                    name: "total_value",
                    display_name: "Vlr. Total"
                }
            ],
            body: state.sale_details
        }
    };
    return (
        <Form
            todos={todos}
            handle_change={handle_change}
            handle_submit={handle_submit}
            btn_value='Confirmar'
        />
    )
}
