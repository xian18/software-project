import React,{FC,memo} from 'react'
import {Props} from '../../containers/Counters';
import Button from '@material-ui/core/Button';

export const Counters:FC<Props>=memo((props)=>{
    const {value,serverValue,onIncrement,onDecrement,ongetserverValue}=props;
    return (
        <div>
            {`Clicked:`}<strong>{value}</strong>{` times.`}
            <button onClick={ onIncrement } style={{ marginRight: 20 }}> +  </button>
            <button onClick={ onDecrement }> - </button>
            <br />
            <span>{`serverValue is:`}</span><strong>{serverValue}</strong>
            <Button variant='contained' color='primary' onClick={()=>(ongetserverValue('a'))}>Change</Button>
        </div>
    )
})

