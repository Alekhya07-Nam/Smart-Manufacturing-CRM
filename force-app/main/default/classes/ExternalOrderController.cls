public with sharing class ExternalOrderController {
    
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getExternalOrders() {
        try {
            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint('https://jsonplaceholder.typicode.com/posts'); // your API
            request.setMethod('GET');
            
            HttpResponse response = http.send(request);
            
            if (response.getStatusCode() == 200) {
                // Parse JSON response
                List<Object> rawList = (List<Object>) JSON.deserializeUntyped(response.getBody());
                List<Map<String, Object>> resultList = new List<Map<String, Object>>();
                
                for (Object o : rawList) {
                    if (o instanceof Map<String, Object>) {
                        resultList.add((Map<String, Object>) o);
                    }
                }
                
                return resultList;
            } else {
                throw new AuraHandledException('Error fetching orders: ' + response.getStatus());
            }
        } catch(Exception e) {
            throw new AuraHandledException('Callout failed: ' + e.getMessage());
        }
    }
}
