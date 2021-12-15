import React, { useState, useEffect, useCallback } from 'react';
import { Form } from './Form';
import { Table } from './Table';
import own_fetch from '../fetch';
import { show_msg } from '../helpers';

export const Client = () => {
    const [didMount, setDidMount] = useState(false);
    const [state, setState] = useState({
        _id: null,
        id: '',
        address: '',
        email: '',
        name: '',
        phone: '',
        clients: [],
    });
    const api_url = '/api/clients';

    const fetch_clients = useCallback(async () => {
        const clients = await (await own_fetch({ url: api_url })).json();
        setState(state => ({ ...state, clients }))
    })
    useEffect(() => {
        if (!didMount) {
            fetch_clients();
            setDidMount(true);
        }
    }, [state.clients, didMount]);

    const handle_submit = async e => {
        e.preventDefault();
        const url = state._id ? `${api_url}/${state._id}` : api_url;
        const method = state._id ? 'PUT' : 'POST';
        await own_fetch({ url, body: JSON.stringify(state), method });
        const toast_msg = (state._id) ? "Cliente actualizado" : "Cliente guardado";
        show_msg(toast_msg)
        setState(state => ({
            ...state,
            _id: null,
            id: '',
            address: '',
            email: '',
            name: '',
            phone: '',
        }));
        fetch_clients();
    };

    const handle_change = ({ target: { name, value } }) => {
        setState(state => ({ ...state, [name]: value }));
    };

    const handler_edit = async (comp_url) => {
        const { _id, id, address, email, name, phone } = await(await own_fetch({ url: `${api_url}/${comp_url}` })).json();
        setState(state => ({
            ...state,
            _id, id, address,
            email, name, phone
        }));
    }

    const todos = {
        form_fields: [
            {
                name: "name",
                placeholder: "Nombre",
                type: "text",
                value: state.name,
            },
            {
                name: "id",
                placeholder: "Documento de identidad",
                type: "text",
                pattern: "[0-9]+",
                error_msg: "Únicamente se permiten números",
                value: state.id,
            },
            {
                name: "phone",
                placeholder: "Número de teléfono",
                type: "text",
                pattern: "[0-9]+",
                error_msg: "Únicamente se permiten números",
                value: state.phone,
            },
            {
                name: "email",
                placeholder: "Correo electrónico",
                type: "email",
                error_msg: "Correo electrónico no válido",
                value: state.email,
            },
            {
                name: "address",
                placeholder: "Dirección",
                type: "text",
                value: state.address,
            },
        ],
        table_fields: {
            header: [
                {
                    name: "id",
                    display_name: "Documento"
                },
                {
                    name: "name",
                    display_name: "Nombre"
                },
                {
                    name: "email",
                    display_name: "Email"
                },
                {
                    name: "phone",
                    display_name: "Teléfono"
                },
                {
                    name: "address",
                    display_name: "Dirección"
                }
            ],
            body: state.clients
        }
    };

    return (
        <div className="container">
            <div className="row">
                <Form
                    handle_change={handle_change}
                    handle_submit={handle_submit}
                    todos={todos}
                />
                < Table
                    todos={todos}
                    api_url={api_url}
                    handle_refresh={fetch_clients}
                    handle_edit={handler_edit}
                />
            </div>
        </div>
    )
}
