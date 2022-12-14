
import clienteAxios from '../helpers/clienteAxios';

export const useIniciarSesion = async (form) => {
    const { data } = await clienteAxios.post('auth/login',form);
    return data;
}