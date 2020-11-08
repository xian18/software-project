import React,{FC,memo} from 'react';
import {Tooltip, IconButton, TooltipProps,IconButtonProps} from '@material-ui/core';


export const TipButton:FC<{TooltipProp:TooltipProps,IconButtonProp:IconButtonProps}>=memo((
    {TooltipProp,
        IconButtonProp,
        children,
    })=>{

    return (<Tooltip {...TooltipProp}>
        <IconButton {...IconButtonProp} >
            {children}
        </IconButton>
    </Tooltip>
)});

export default TipButton;