import React, { FC, memo, useState, useMemo } from 'react';
import Button from '@material-ui/core/Button';

const checkEqual = (prev: any, next: any) => {
    return true;
};

const Abcdef: FC<{ num: number }> = memo(({ children, num }) => {
    const [state2, setState2] = useState(1);
    return <div>{num}</div>;
}, checkEqual);

/* check update*/
const Test: FC = memo(({ children }) => {
    const [state1, setState1] = useState(1);
    function set() {
        setState1(2);
    }

    const values: number[] = [1, 2, 3, 4, 5, 6];

    const nochange = useMemo(() => {
        return <div>{state1}</div>;
    }, []);

    return (
        <>
            <Button variant='contained' color='primary' onClick={() => setState1(2)}>
                设置状态为2
            </Button>
            {children}
            <Abcdef num={1}>wawawa</Abcdef>
            {nochange}
            {values.map((num: number) => {
                return <Abcdef num={num} />;
            })}
        </>
    );
});

export default Test;
