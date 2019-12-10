import React from 'react'
import Button from '@material-ui/core/Button';
import EditCustomerForm from './EditCustomerForm'

const CustomerDetail = ({ customer }) => {


  // handleCustomerDelete(index)
  //   const updatedCustomers = this.state.customers.splice(index, 1)
  //   this.setState({ customers: updatedCustomers })
  

  if (!customer) return null;
  return (
    <div className="detail">
      <h2>Customer Details</h2>
      <p>{customer.name}</p>
      <p>{customer.phone}</p>
      <p>{customer.email}</p>
      <div className="customer-button">
      <Button variant="contained" color="primary">Update Customer</Button>
      <Button variant="contained" color="secondary">Delete Customer</Button>
    </div></div>
  )
}

export default CustomerDetail
