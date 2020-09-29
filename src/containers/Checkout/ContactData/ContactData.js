import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Zipcode'
                },
                value:'',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value:'fastest', displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}

                    ]
                },
                value:'fastest',
                valid: true,
                validation:{
                },
            },
        },
        loading: false,
        formIsValid: false
    };

    checkValidity = (value, rules) =>{
        let isValid = true;
        if(!rules){
            return true;
        }
            if(rules.required){
                isValid = value.trim() !== '' && isValid;
            }
    
            if(rules.minLength){
                isValid = value.length >= rules.minLength && isValid
            }
            if(rules.maxLength){
                isValid = value.length <= rules.maxLength && isValid
            }
      
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault()
        console.log(this.props);
        this.setState({ loading: true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(resp => {
                console.log(resp);
                this.setState({ loading: false, purchasing: false });
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false, purchasing: false })
            });
    }

    inputChangeHandler = (event, inputIdentifier) =>{
        const updatedForm = {
            ... this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        console.log(updatedFormElement);
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for(let inputIdentifiers in updatedForm){
             formIsValid = updatedForm[inputIdentifiers].valid && formIsValid
        }
        console.log(formIsValid);
        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
        // updatedForm[inputIdentifier] = 
    }
    render() {
        console.log(this.state.formIsValid);
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (

            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid} 
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={ (event) => this.inputChangeHandler(event, formElement.id)}
                    />

                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>

        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;