export const logins = {
    standartLoginData: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    lockedLoginData: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Sorry, this user has been locked out.'
    },
    wrongLoginData: {
        username: 'lorem',
        password: 'lorem',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service'
    }
}