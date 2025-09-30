public with sharing class OrderController {

    // Get upcoming Sales Orders
    @AuraEnabled(cacheable=true)
    public static List<Sales_Order__c> getUpcomingSalesOrders(Id userId) {
        Date today = Date.today();
        return [
            SELECT Id, Name, Customer__c, Customer__r.Name, Status__c, Delivery_Date__c, Total_Amount__c
            FROM Sales_Order__c
            WHERE Delivery_Date__c >= :today
            ORDER BY Delivery_Date__c ASC
            LIMIT 50
        ];
    }

    // Get Purchase Orders for current user
    @AuraEnabled(cacheable=true)
    public static List<Purchase_Order__c> getPurchaseOrdersForUser(Id userId) {
        return [
            SELECT Id, Name, Supplier__c, Supplier__r.Name, Status__c, Expected_Delivery_Date__c, Total_Cost__c
            FROM Purchase_Order__c
            WHERE CreatedById = :userId
            ORDER BY Expected_Delivery_Date__c ASC
            LIMIT 50
        ];
    }
}
