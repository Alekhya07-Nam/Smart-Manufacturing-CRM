import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';

export default class CustomerProfile extends NavigationMixin(LightningElement) {
    @api recordId;

    handleCreateOrder() {
        const defaultValues = { Customer__c: this.recordId };
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
}
