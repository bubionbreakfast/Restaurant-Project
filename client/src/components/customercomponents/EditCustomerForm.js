import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';

class EditCustomerForm extends Component {
    constructor(props) {
      super(props)
    //   const { name, phone, email } = this.props.customer
      this.state = {
        name: "",
        phone: "",
        email: "",
        customers: [],
        showForm: false,
        // customerId: this.props.customer._embedded.customer.id
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePhoneChange = this.handlePhoneChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleForm = this.toggleForm.bind(this);
      this.handleCustomerChange = this.handleCustomerChange.bind(this)
      this.handleCustomerChange = this.handleCustomerChange.bind(this);
      this.handleCustomerDelete = this.handleCustomerDelete.bind(this);


    }
    handleNameChange(event) {
      this.setState({ name: event.target.value })
    }

    handleCustomerChange(event) {
        this.setState({ customerId: event.target.value })
      }
  
    handlePhoneChange(event) {
      this.setState({ phone: event.target.value })
    }
  
    handleEmailChange(event) {
      this.setState({ email: event.target.value })
    }

    componentDidMount() {
        fetch('http://localhost:8080/customers')
          .then(res => res.json())
          .then(data => this.setState({ customers: data._embedded.customers }))
      }
    
      handleCustomerSelected(index) {
        const customer = this.state.customers[index]
        this.setState({ selectedCustomer: customer })
      }
    
      handleCustomerSubmit(customer) {
        customer.id = Date.now();
        const updatedCustomers = [...this.state.customers, customer]
        this.setState({ customers: updatedCustomers });
      }
    
      handleCustomerDelete(index) {
        const updatedCustomers = this.state.customers.splice(index, 1)
        this.setState({ customers: updatedCustomers })
      }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch(`http://localhost:8080/customers/${this.state.customer}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          email: this.state.email,
          customer: `http://localhost:8080/customers/${this.state.customerId}`

        })
      })
        .then(() => {
         const name = this.state.name.trim();
         const phone = this.state.phone.trim();
         const email = this.state.email.trim();
            if (!name || !phone || !email) {
            return
        }
            // this.props.onCustomerSubmit({ name: name, phone: phone, email: email })
            this.setState({ name: '', phone: '', email: '' })
        })
    }

    toggleForm() {
        this.setState({ showForm: true })
      }

    render() {

        const customerOptions = this.state.customers.map((customer, index) => {
            return <MenuItem value={customer.id} key={index}>{customer.name}</MenuItem>
          })

        return (
          <form className="customer-form" onSubmit={this.handleSubmit}>
            <TextField
              fullWidth={true}
              type="text"
              placeholder="Your Name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <TextField
              fullWidth={true}
              type="text" placeholder="Phone Number"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
            <TextField
              fullWidth={true}
              type="text" placeholder="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}

            />
            <InputLabel>Select a Customer</InputLabel>
            <br></br>
            <Select id="customer-booking-selector" onChange={this.handleCustomerChange} value={this.state.customerId} >
              <MenuItem></MenuItem>
              {customerOptions}
            </Select>

            <br /><br />
            <Button variant="contained" color="secondary"
              type="submit">
              Edit Customer
            </Button>
          </form>
        )
    }
}






export default EditCustomerForm
