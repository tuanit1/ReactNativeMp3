import React, { createContext, useState, useEffect, memo } from "react";

export const TestContext = createContext({});

const TestProvider = ({ children }) => {

    const [count, setCount] = useState(0);
    const [ text, setText] = useState('aaa');

    console.log('Count -->', count);

    useEffect(() => {
        timerId = setInterval(() => {
            setCount(prevCount => prevCount + 1);
        }, 1000);

        // return clearInterval(timerId);
    }, [])

    return (

        <TestContext.Provider
            value={{
                count,
                text,
                setCount
            }}>
            {children}
        </TestContext.Provider>
    )

}

export default TestProvider;