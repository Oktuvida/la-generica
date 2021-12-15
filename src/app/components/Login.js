import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form } from './Form'
import { show_msg, remove_token, set_token } from '../helpers'
import own_fetch from '../fetch';

export const Login = () => {
    const [state, setState] = useState({
        username: '',
        password: '',
        validate_password: '',
        email: '',
        todos_form: 1,
        text_form: '',
    })
    const [didMount, setDidMount] = useState(false);
    const navigate = useNavigate();

    const set_form = useCallback(() => {
        setState(state => ({
            ...state,
            username: '',
            password: '',
            validate_password: '',
            email: '',
            todos_form: 1 - state.todos_form,
            text_form: !state.todos_form ? '¿Ya tienes una? ¡Inicia sesión!' : '¿No tienes una? ¡Créala!',
        }));
    });

    useEffect(() => {
        if (!didMount) {
            remove_token();
            set_form();
            setDidMount(true);
        }
    }, [state, didMount]);

    const handle_change = ({ target: { name, value } }) => {
        setState(state => ({ ...state, [name]: value }));
    };

    const handle_submit = async e => {
        e.preventDefault();
        if (state.todos_form && state.password !== state.validate_password) {
            show_msg("Las contraseñas no coinciden");
            return;
        }
        const api_url = !state.todos_form ? '/api/auth/signin' : '/api/auth/signup';
        const res = await own_fetch({ url: api_url, body: JSON.stringify(state), method: 'POST' });

        if (state.todos_form) {
            switch (res.status) {
                case 400:
                    return show_msg("Usuario no encontrado");
                case 401:
                    return show_msg("Contraseña no válida");
                case 403:
                    return show_msg("Tal email ya existe. Por favor, intenta con otro");
                default:
                    set_form();
            }
        } else {
            switch (res.status) {
                case 400:
                    return show_msg("Usuario no encontrado");
                case 401:
                    return show_msg("La contraseña no coincide con el usuario");
                default:
                    const data = await res.json();
                    set_token(data.token);
                    navigate('/clients')
            }
        }
    }

    const handle_click = ({ target: { className: classes } }) => {
        const action = classes.match(/(?<=toggle\_)\w+/g);
        if (action) {
            set_form();
        }
    }

    const common_pattern = '^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W).*$';
    const get_todos = () => {
        const form_fields = [
            {
                name: "email",
                placeholder: "Correo electrónico",
                type: "email",
                error_msg: "Email no válido",
                value: state.email
            },
            {
                name: "password",
                placeholder: "Contraseña",
                type: "password",
                pattern: common_pattern,
                error_msg: "Debe contener por lo menos 1 mayús., 1 número, 1 símbolo y 8 carácteres en total",
                value: state.password
            }
        ]
        if (!state.todos_form) {
            return {
                form_fields
            }
        } else {
            return {
                form_fields: [{
                    name: "username",
                    placeholder: "Nombre de usuario",
                    type: "text",
                    value: state.username
                }, ...form_fields, {
                    name: "validate_password",
                    placeholder: "Repetir contraseña",
                    type: "password",
                    pattern: common_pattern,
                    error_msg: "Las contraseñas no coinciden",
                    value: state.validate_password
                }]
            }
        }
    }

    return (
        <div className="container">
            <Form
                todos={get_todos()}
                handle_change={handle_change}
                handle_submit={handle_submit}
                element_below_button={<a
                    style={{ margin: '0 5px', cursor: 'pointer' }}
                    className="toggle_form"
                    onClick={handle_click}
                >
                    {state.text_form}
                </a>}
            />
        </div>
    )
}
