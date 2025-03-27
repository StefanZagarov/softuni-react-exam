// A hook function which we call when we need to do requests to the server which require an authorized user. Additionally we will use it to get user specific data
// TODO: Separate user information propagation from authenticated server requests
import { useUserContext } from "../contexts/UserContext";
import request from "../utils/requester";


export default function useAuth() {
    const userData = useUserContext();
    // Request wrapper that makes server requests that require an authenticated user - maybe separate it into its own function (maybe in utils)
    function requestWrapper(method, url, data, options = {}) {
        const userOptions = {
            ...options,
            headers: {
                'X-Authorization': userData.accessToken,
                ...options.headers
            }
        };

        // If we have a user, the wrapper will use the options containing the header with "X-Authorization", otherwise use the provided options. We do this check in order to not send access token if we don't have one and break the request with undefined accessToken value
        return request.baseRequest(method, url, data, userData.accessToken ? userOptions : options);
    }

    return {
        ...userData,
        isAuthenticated: !!userData.accessToken,
        userId: userData._id,
        request: {
            get: requestWrapper.bind(null, "GET"),
            put: requestWrapper.bind(null, "PUT"),
            post: requestWrapper.bind(null, "POST"),
            delete: requestWrapper.bind(null, "DELETE")
        }
    };
}