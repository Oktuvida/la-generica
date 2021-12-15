import React from 'react'
import own_fetch from '../fetch';
import { primary_color, get_key, show_msg } from '../helpers';

export const Table = ({ todos, api_url, handle_refresh, handle_edit, handle_delete, custom_button, columns, hide_actions }) => {
    const { table_fields: { body, header } } = todos;
    const id_btns = new Map();
    let counter = 0;

    const handle_click = async ({ target: { className: classes, parentNode: { className: p_classes } } }) => {
        const get_id = reg => id_btns.get(Number(classes.match(reg) || p_classes.match(reg) || null));
        let is_delete = true;
        let reg = /(?<=delete_btn)\d+/;
        let id = get_id(reg);
        if (!id) {
            reg = /(?<=edit_btn)\d+/;
            id = get_id(reg);
            is_delete = false;
        }
        if (id) {
            if (is_delete && confirm('¿Estás seguro que deseas eliminarlo?')) {
                if (handle_delete) {
                    handle_delete(id)
                } else {
                    await own_fetch({url: `${api_url}/${id}`, method: "DELETE"});
                    const toast_msg = `${api_url.match(/(?<=\/api\/)\w+/)} eliminado`
                        .replace(/(?<!\w)[a-z]/g, chr => chr.toUpperCase());
                    show_msg(toast_msg);
                    handle_refresh();
                }
            } else if (!is_delete) {
                handle_edit(id);
            }
        }
    };

    return (
        <table className={`col s${columns || 12}`}>
            <thead>
                <tr>
                    {
                        header.map(
                            todo =>
                                <th key={get_key()}>{todo.display_name}</th>
                        )
                    }
                    {!hide_actions && <th>Acciones</th>}
                </tr>
            </thead>
            <tbody onClick={handle_click}>
                {
                    body.map(
                        todo => {
                            id_btns.set(++counter, todo._id);
                            return <tr key={get_key()}>
                                {
                                    header.map(
                                        el =>
                                            <td key={get_key()}>
                                                {todo[el.name]}
                                            </td>
                                    )
                                }
                                <td>
                                    {!hide_actions &&
                                        <>
                                            {custom_button && custom_button()}
                                            <button className={`btn delete_btn${counter} ${primary_color}`} style={{ margin: '1px 2px' }}><i className="material-icons">delete</i></button>
                                            {handle_edit && <button className={`btn edit_btn${counter} ${primary_color}`} style={{ margin: '1px 2px' }}><i className="material-icons">edit</i></button>}
                                        </>
                                    }
                                </td>
                            </tr>
                        }
                    )
                }
            </tbody>
        </table>
    )
}
