// A request utility function for communicating with the server. The logic is written to fit all the situations in which this function will be used. For this purpose, we will make it as abstract as possible and make a few checks

async function request(method, url, data, options = {}) {

    // The default method of a request is GET, therefore we need to set the method only if it is not GET (although this may be redundant)
    if (method != 'GET') {
        options.method = method;
    }

    // If we have data, we take the method from above, and add the data to it. 
    if (data) {
        options = {
            // Keep the method from above
            ...options,
            headers: {
                // When we add data to a request, we must add the content type aswell
                'Content-Type': 'application/json',
                // Get the rest of the passed header values
                ...options.headers
            },
            // Add the data
            body: JSON.stringify(data)
        };
    }

    try {
        const response = await fetch(url, options);
        // We get the content type of the header to make a check
        const responseContentType = response.headers.get("Content-Type");
        // If the response does not have a content type (in the case of a logout) we return to exit the logic and avoid breaking the code
        if (!responseContentType) return;

        // If we have a content type, then we return the data
        const result = await response.json();

        return result;
    } catch (error) {
        return error;
    }
}

// By binding the method, we create a partial application where we need to send only the url and data
export default {
    get: request.bind(null, 'GET'),
    post: request.bind(null, 'POST'),
    put: request.bind(null, 'PUT'),
    delete: request.bind(null, 'DELETE'),
    baseRequest: request
};