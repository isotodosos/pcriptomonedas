// Nuestro propio hook va a tener su propio state y su propia interface

import React,{Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display:block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useMoneda = (label, stateInicial, valores) => {

   // state de nuestro custom hook
   const [state, actualizarState] = useState(stateInicial);

   // interface
   const Seleccionar = () => (// aqui le damos por implicito el return
    <Fragment>
        <Label>{label}</Label>
        <Select
          onChange={e => {actualizarState(e.target.value)}}
          value={state}
        >
            <option value="">-- Selecciona una moneda --</option>
            {valores.map(valor => {return(
                <option key={valor.codigo} value={valor.codigo}>{valor.nombre}</option>
            )})}
        </Select>
    </Fragment>
   )

   // retornamos el state, la parte de la interface, y la funcion que modifica el state
   return[state, Seleccionar, actualizarState];//!!se puede retornar en el orden que se quiera pero hay que tenerlo en cuenta de cara al destructuring de useMoneda en el formulario
}
export default useMoneda;
