import { LightningElement, api, wire } from 'lwc';
import getUpcomingSalesOrders from '@salesforce/apex/OrderController.getUpcomingSalesOrders';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class OrderList extends NavigationMixin(LightningElement) {
    @api recordId; // optional, used on record page
    orders = [];
    error;

    // Define columns for lightning-datatable
    columns = [
        { label: 'Order Name', fieldName: 'Name', type: 'text', sortable: true },
        { label: 'Customer', fieldName: 'Customer__r.Name', type: 'text', sortable: true },
        { label: 'Status', fieldName: 'Status__c', type: 'text', sortable: true },
        { label: 'Delivery Date', fieldName: 'Delivery_Date__c', type: 'date', sortable: true },
        { label: 'Total Amount', fieldName: 'Total_Amount__c', type: 'currency', sortable: true },
        {
            type: 'action',
            typeAttributes: { rowActions: [
                { label: 'View', name: 'view' },
                { label: 'Edit', name: 'edit' }
            ]}
        }
    ];

    @wire(getUpcomingSalesOrders, { userId: '$recordId' })
    wiredOrders({ error, data }) {
        if (data) {
            this.orders = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.orders = [];
        }
    }

    handleNewOrder() {
        const defaultValues = this.recordId ? { Customer__c: this.recordId } : {};
        const encodedDefaults = encodeDefaultFieldValues(defaultValues);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Sales_Order__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: encodedDefaults
            }
        });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'view') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'Sales_Order__c',
                    actionName: 'view'
                }
            });
        } else if (actionName === 'edit') {
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    objectApiName: 'Sales_Order__c',
                    actionName: 'edit'
                }
            });
        }
    }
}
