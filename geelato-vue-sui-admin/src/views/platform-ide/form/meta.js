export default {
    type: 'object',
    layout: {
        type: 'table',
        data: [
            // [label col-num,field col-num]
            [{name: [4, 8]}, {loginName: [4, 8]}],
            [{email: [4, 8]}, {age: [4, 8]}],
            [{sex: [4, 8]}, {tel: [4, 8]}],
            [{password: [4, 8]}, {confirmPassword: [4, 8]}],
            [{enable: [4, 8]}, {$null: [4, 8]}],
            [{description: [4, 20]}]
        ]
    },
    entities: [
        {
            platformUser: {
                id,
                name,
                loginName,
                description
            }
        }
    ]
}

