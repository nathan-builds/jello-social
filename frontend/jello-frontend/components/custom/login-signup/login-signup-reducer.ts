export interface LoginFormState {
    currentUsername: string,
    currentPassword: string,
    newUsername: string,
    newPassword: string,
    newPasswordConfirm: string,
}

export interface FormActions {
    type: LoginSignupActions,
    payload: string
}

export enum LoginSignupActions {
    CURRENT_USERNAME = 'CURRENT_USERNAME',
    CURRENT_PASSWORD = 'CURRENT_PASSWORD',
    NEW_USERNAME = 'NEW_USERNAME',
    NEW_PASSWORD = 'NEW_PASSWORD',
    NEW_PASSWORD_CONFIRM = 'NEW_PASSWORD_CONFIRM'
}

export const loginFormReducer= (state: LoginFormState, action: FormActions): LoginFormState => {
    switch (action.type) {
        case LoginSignupActions.CURRENT_PASSWORD:
            return { ...state, currentPassword: action.payload };
        case LoginSignupActions.CURRENT_USERNAME:
            return { ...state, currentUsername: action.payload };
        case LoginSignupActions.NEW_USERNAME:
            return { ...state, newUsername: action.payload };
        case LoginSignupActions.NEW_PASSWORD:
            return { ...state, newPassword: action.payload };
        case LoginSignupActions.NEW_PASSWORD_CONFIRM:
            return { ...state, newPasswordConfirm: action.payload };

    }
};

export const initialLoginState: LoginFormState = {
    currentUsername: 'nateHans',
    currentPassword: 'password123',
    newUsername: '',
    newPassword: '',
    newPasswordConfirm: ''
};
