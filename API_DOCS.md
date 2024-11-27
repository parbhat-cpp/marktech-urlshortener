# House of Marktech Url Shortener
## Structure of API response -

    {
	    status_code: "[RESPONSE STATUS CODE]",
	    error: "[CONTAINS ERROR IF ANY]",
	    data: "[CONTAINS DATA IF ANY]"
    }
   
## Url Shortener APIs -

1. /api/shorten - POST
 Generates a shortId for a url.
    
    body
    {
        url: "[VALID URL]"
    }

    Sample Response
    {
        "status_code": 201,
        "data": {
            "originalUrl": "http://parbhatsharma.in",
            "shortId": "Y5Uc2E86Gp",
            "clicks": 0,
            "_id": "67467b9bea2d4616286f287e"
        },
        "error": null
    }

2. /api/:shortId - GET
 Redirects to the original url by shortId.

3. /api/stats/:shortId - GET
 Returns the usage statistics for a specific short URL

    Sample response
    {
        "status_code": 200,
        "data": {
            "clicks": 4,
            "lastAccessed": "2024-11-26T17:04:12.526Z"
        },
        "error": null
    }
