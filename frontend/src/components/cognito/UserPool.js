import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "us-east-1_U74pnUIz9",
    ClientId: "60jbqq9qbfj2tda63ipna2q56m"
}

export default new CognitoUserPool(poolData);