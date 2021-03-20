import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`


const Formulario = ({guardarMoneda,guardarCriptoMoneda}) => {

    
    const[listaCripto, actualizarCripto]= useState([]);
    const[error, guardarError]= useState(false);

    const MONEDAS = [
        
        {codigo: 'USD', nombre: 'Dolar de EEUU'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
        

    ]

    const[moneda, SelectMoneda, actualizarState] = useMoneda('Elige tu moneda: ', '', MONEDAS);
    const[criptomoneda, SelectCripto] = useCriptomoneda('Elige criptomoneda: ', '', listaCripto);

    // Segun arrancamos hacemos llamada a la api
    useEffect(() => {
        const consultarApi = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            actualizarCripto(resultado.data.Data);
        };

        //y llamamos a la funcion si no no haría nada..
        consultarApi();

    }, []);

    //cuando hace el submit
    const cotizarMoneda = (e) => {
        e.preventDefault();
        
        //validamos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        
        //pasamos los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }


    return(
        <form
          onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Hay un error'/> : null}
            <SelectMoneda/>
            <SelectCripto/>
            <Boton
              type="submit"
              value="Calcular"
            ></Boton>
        </form>
    )
}
export default Formulario;