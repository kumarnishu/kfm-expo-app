export type AuthStackParamList = {
    login: undefined;
    register: undefined;
};

export type MainStackParamList = {
    home: undefined;
    profile: { userId: string }; // Example of passing a parameter
};
