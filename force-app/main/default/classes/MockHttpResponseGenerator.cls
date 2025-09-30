global class MockHttpResponseGenerator implements HttpCalloutMock {
    global HTTPResponse respond(HTTPRequest req) {
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('[{"userId":1,"id":1,"title":"Sample Order","body":"Order details"}]');
        res.setStatusCode(200);
        return res;
    }
}
