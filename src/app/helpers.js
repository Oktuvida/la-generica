import { v4 as uuid } from 'uuid';

export const primary_color = 'light-blue darken-4';
export const get_key = () => uuid();
export const show_msg = msg => M.toast({ html: msg });
export const csv_file_to_array = file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
        const lines = result.split('\n');
        resolve(
            lines.reduce((res, line) => (line.length > 0) ? res.push(line.split(',')) && res : res, [])
        );
    };
    reader.readAsText(file);
});
const token_name = 'auth_token';
export const set_token = token => sessionStorage.setItem(token_name, JSON.stringify(token));
export const get_token = () => JSON.parse(sessionStorage.getItem(token_name));
export const remove_token = () => sessionStorage.removeItem(token_name);