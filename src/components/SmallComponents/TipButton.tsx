import React,{FC,memo} from 'react';
import {Tooltip, IconButton, TooltipProps,IconButtonProps} from '@material-ui/core';
//import { ClassNameMap } from '@material-ui/core/styles/withStyles';
export const TipButton:FC<{TooltipProp:TooltipProps,IconButtonProp:IconButtonProps}>=memo(({TooltipProp,IconButtonProp,children})=>{
    return (<Tooltip {...TooltipProp}>
        <IconButton {...IconButtonProp} >
            {children}
        </IconButton>
    </Tooltip>
)});