@IsTest
private class ExternalOrderControllerTest {
    @IsTest
    static void testGetExternalOrders() {
        // Set the mock callout
        Test.setMock(HttpCalloutMock.class, new MockHttpResponseGenerator());

        // Call the Apex method that makes the HTTP request
        List<Map<String, Object>> result = ExternalOrderController.getExternalOrders();

        // Assertions
        System.assert(result != null, 'Result should not be null');
        System.assert(result.size() > 0, 'Should return some orders');
        System.assertEquals('Sample Order', result[0].get('title'), 'Title should match mock response');
    }
}
