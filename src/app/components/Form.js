import React, { useState } from 'react'
import { primary_color, get_key } from '../helpers'

export const Form = ({ handle_change, handle_submit, todos, btn_value, columns, element_below_button }) => {
    const { form_fields } = todos;
    const [keys, _] = useState(form_fields.map(_ => get_key()));
    const default_columns = columns || 12;
    return (
        <div className={`card col s${default_columns}`}>
            <div className="card-content">
                <form onSubmit={handle_submit}>
                    {
                        form_fields.map(
                            (todo, ind) =>
                                (todo.custom_element && todo.custom_element(keys[ind]))
                                || <div className={`input_field col s${default_columns}`} key={keys[ind]}>
                                    <input
                                        name={todo.name}
                                        placeholder={todo.placeholder}
                                        type={todo.type}
                                        onChange={handle_change}
                                        className={todo.readonly ? null : 'validate'}
                                        value={todo.value || ''}
                                        pattern={todo.pattern}
                                        required
                                        readOnly={todo.readonly || null}
                                    />
                                    {
                                        todo.readonly ? <></> :
                                            <span
                                                className="helper-text"
                                                data-error={todo.error_msg}
                                                data-success={todo.success_msg}
                                            ></span>
                                    }
                                </div>
                        )
                    }
                    <div className={`center-align col s${default_columns}`}>

                        <button
                            type="submit"
                            className={`btn ${primary_color}`}
                            style={{ margin: '20px 0', width: '100%' }}
                        >
                            {btn_value || 'Continuar'}
                        </button>
                    </div>
                    {element_below_button}
                </form>
            </div>
        </div>
    )
}
