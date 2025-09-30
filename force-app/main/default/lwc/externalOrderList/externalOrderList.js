import { LightningElement, wire } from 'lwc';
import getExternalOrders from '@salesforce/apex/ExternalOrderController.getExternalOrders';

export default class ExternalOrderList extends LightningElement {
    orders; // stores the data
    error;  // stores any errors

    // Wire Apex method to fetch data
    @wire(getExternalOrders)
    wiredOrders({ error, data }) {
        if (data) {
            this.orders = data;
            this.errr = undefined;
        } else if (error) {
            this.error = error.body.message;
            this.orders = undefined;
        }
    }
}
