import React, {useContext, useMemo} from 'react';
import { Text } from 'react-native';
import { TestContext } from '../providers/TestProvider';

const TestComponent = () => {
    
    const { count, text } = useContext(TestContext)

    return useMemo(() => {

        console.log("test component re-render")

        return (
            <Text>Count: {count}</Text>
        )

    }, [count])
}

export default TestComponent