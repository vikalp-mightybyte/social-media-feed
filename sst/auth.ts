const cognitoUserPool = new sst.aws.CognitoUserPool('UserPool', {
  usernames: ['email'],
});

const cognitoWebClient = cognitoUserPool.addClient('UserPoolWebClient');

export { cognitoUserPool, cognitoWebClient };
