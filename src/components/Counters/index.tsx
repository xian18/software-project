import React,{FC,memo} from 'react'

export interface Props {
    value:number;
    onIncrement:()=>void;
    onDecrement:()=>void;
}

export const Counters:FC<Props>=memo((props)=>{
    const {value,onIncrement,onDecrement}=props;
    return (
        <div>
            {`Clicked:`}<strong>{value}</strong>{` times.`}
            <button onClick={ onIncrement } style={{ marginRight: 20 }}> +  </button>
            <button onClick={ onDecrement }> - </button>
        </div>
    )
})

