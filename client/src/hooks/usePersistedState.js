// A wrapper useState function which will be used when logging in (useful for any localStorage writing) to set the data of the user in the local storage for persistence effect
import { useState } from "react";

export default function usePersistedState(stateKey, initialState) {
    // Read:
    const [state, setState] = useState(() => {
        // Check if there already is such key in the localStorage
        const persistedState = localStorage.getItem(stateKey);

        // If there isn't, then we return the inputted initial state
        if (!persistedState) {
            // Check if the initialState input is a function - if it is: execute it, and return the result. If it isn't - then it's just a value, so we return it
            return typeof initialState === `function` ? initialState() : initialState;
        }

        const persistedStateData = JSON.parse(persistedState);

        return persistedStateData;
    });

    // Write:
    // This is the function we will call when we want to set data
    function setPersistedState(data) {
        // Execute the data if it is a function and get the value. If it is not a function then just return the data
        const dataType = typeof data === `function` ? data(state) : data;

        const persistedData = JSON.stringify(dataType);
        // Write in the local storage
        localStorage.setItem(stateKey, persistedData);
        // Write the data in the state, which will trigger React to re-render
        setState(data);
    }

    return [state, setPersistedState];
}