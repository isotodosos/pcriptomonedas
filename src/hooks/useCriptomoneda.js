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

const useCriptomoneda = (label, stateInicial, valores) => {


   // state de nuestro custom hook
   const [state, actualizarState] = useState(stateInicial);

   // interface
   const SelectCripto = () => (// aqui le damos por implicito el return
    <Fragment>
        <Label>{label}</Label>
        <Select
          onChange={e => {actualizarState(e.target.value)}}
          value={state}
        >
            <option value="">-- Selecciona una Criptomoneda --</option>
            {valores.map(valor => (
               
                <option key={valor.CoinInfo.Id} value={valor.CoinInfo.Name}>{valor.CoinInfo.FullName}</option>
                
            ))}
            
        </Select>
    </Fragment>
   )

   // retornamos el state, la parte de la interface, y la funcion que modifica el state
   return[state, SelectCripto, actualizarState];//!!se puede retornar en el orden que se quiera pero hay que tenerlo en cuenta de cara al destructuring de useMoneda en el formulario
}
export default useCriptomoneda;
