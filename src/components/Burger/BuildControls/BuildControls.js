import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'salad', type: 'salad', id: 1 },
    { label: 'cheese', type: 'cheese', id: 2 },
    { label: 'meat', type: 'meat', id: 3 },
    { label: 'bacon', type: 'bacon', id: 4 }
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map((ctrl) => (
            <BuildControl  
            key={ctrl.id} 
            label={ctrl.label} 
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
            > </BuildControl>
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
        >ORDER NOW</button>
    </div>
);

export default buildControls;