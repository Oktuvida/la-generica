import React, { useState, useEffect, useCallback } from 'react'
import { Form } from './Form'
import { Table } from './Table';
import { csv_file_to_array, show_msg, primary_color } from '../helpers'
import own_fetch from '../fetch';

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [didMount, setDidMount] = useState(false);
    const api_url = '/api/products';
    const fetch_products = useCallback(async () => {
        const products = await (await own_fetch({ url: api_url })).json();
        setProducts(products);
    })
    useEffect(() => {
        if (!didMount) {
            fetch_products();
            setDidMount(true);
        }
    }, [products, didMount]);

    const headers = {
        "Nombre": "product_name",
        "Código": "product_code",
        "NIT Proveedor": "supplier_nit",
        "IVA": "vat_sale",
        "Precio Compra": "purchase_price",
        "Precio Venta": "selling_price"
    };
    const handle_submit = async e => {
        e.preventDefault();
        const csv_input = document.querySelector("input[name='csv_file']");
        const { files } = csv_input
        if (files) {
            const res = await csv_file_to_array(files[0]);

            for (const el of res[0]) {
                if (!headers[el]) {
                    show_msg("Headers no coinciden");
                    return;
                }
            }
            const fixed_length = res[0].length;
            const key_header = res.shift();
            for (const el of res) {
                if (el.length < fixed_length || el.length > fixed_length) {
                    show_msg("Cantidad de datos incorrectos");
                    return;
                }
            }
            for (const i of res) {
                for (const [ind, val] of i.entries()) {
                    if (val.length <= 0) {
                        show_msg("No pueden haber campos vacíos");
                        return;
                    }
                    const header = headers[key_header[ind]];
                    if (header === "produce_code" && isNaN(val)) {
                        show_msg("No todos los códigos son números");
                        return;
                    } else if (header === "supplier_nit" && isNaN(val)) {
                        show_msg("No todos los NIT son números");
                        return;
                    }
                    if (header === "vat_sale" && isNaN(val)) {
                        show_msg("No todos los IVA son números");
                        return;
                    }
                    if (header === "selling_price" && isNaN(val)) {
                        show_msg("No todos los precios de venta son válidos");
                        return;
                    }
                    if (header == "purchase_price" && isNaN(val)) {
                        show_msg("No todos los precios de compra son válidos");
                        return;
                    }
                }
            }
            res.forEach(async product => {
                let json = {};
                product.forEach((val, ind) => json[headers[key_header[ind]]] = val);
                await own_fetch({ url: api_url, method: "POST", body: JSON.stringify(json) })
                fetch_products();
            })
            show_msg("Productos guardados correctamente");
        }
    }
    const todos = {
        form_fields: [
            {
                name: "csv_reader",
                placeholder: "Escoge un archivo CSV",
                type: "file",
                custom_element: key =>
                    <div className="file-field input_field" key={key}>
                        <div className={`btn ${primary_color}`}>
                            <span>File</span>
                            <input
                                name="csv_file"
                                type="file"
                                accept=".csv"
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
            }
        ],
        table_fields: {
            header: Object.entries(headers).map(([key, value]) => ({
                name: value,
                display_name: key
            })),
            body: products
        }
    }
    return (
        <div className='container'>
            <Form
                handle_submit={handle_submit}
                todos={todos}
            />
            <Table
                todos={todos}
                api_url={api_url}
                handle_refresh={fetch_products}
            />
        </div>
    )
}
