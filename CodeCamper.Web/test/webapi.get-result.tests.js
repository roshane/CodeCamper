﻿(function () {
    QUnit.config.testTimeout = 10000;
    
    var okAsync = QUnit.okAsync;
    
    module('Web API GET result has expected shape');
    
    test('Lookups url should return array of Rooms, Tracks, TimeSlots',
            function () {
                stop();
                $.ajax({
                    url: '/api/lookups/all',
                    dataType: 'json',
                    success: function (result) {
                        okAsync(!!result.Rooms && !!result.Tracks && !!result.TimeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                        start();
                    },
                    error: function (result) {
                        okAsync(false, 'Failed with: ' + result.responseText);
                    }
                });
            }
        );
    
    var expectedHansImageSource = "hans_fjallemark.jpg";
    test('Find Hans among speakers and his ImageSource is ' + expectedHansImageSource,
        function() {
            stop();
            $.ajax({
                // url: '/api/persons/?$filter=firstName%20eq%20\'Hans\'', // Future OData syntax
                url: '/api/persons/getbyfirstname/?value=Hans',
                dataType: 'json',
                success: function(result) {
                    okAsync(!!result, "Got data when searching for Hans");
                    // person = result[0]; // If used OData ...
                    var person = result;
                    okAsync(person.FirstName === 'Hans',
                        "Got exactly one speaker w/ firstName = 'Hans'");
                    
                    okAsync(person.ImageSource === expectedHansImageSource,
                        "Got expected ImageSource = " + expectedHansImageSource);
                    start();
                },
                error: function(result) {
                    okAsync(false, 'Failed with: ' + result.responseText);
                }
            });
        }
    );
}());
