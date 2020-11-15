

export const digitsKeyMap={
    DIGIT1:['1'],
    DIGIT2:['2'],
    DIGIT3:['3'],
    DIGIT4:['4'],
    DIGIT5:['5'],
    DIGIT6:['6'],
    DIGIT7:['7'],
    DIGIT8:['8'],
    DIGIT9:['9'],
};



export function createDigitsHandlers(handler,...args){
    let handlers={};
    Object.keys(digitsKeyMap).forEach((key,index)=>{
        handlers[key]=function(){
            handler(index+1,args);
        }
    })
    return handlers;
};
