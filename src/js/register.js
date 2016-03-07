$(function(){
    $("#reigsterForm").bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            'user[name]': {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '用户名必须输入'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '用户名由6到30个字符组成'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由字母或数字组成'
                    },
                    remote: {
                        message: '用户名已经存在',
                        url: '/user/checkName'
                    }
                }
            },
            'user[password]': {
                message: 'The password is not valid',
                validators: {
                    notEmpty: {
                        message: '密码必须输入'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码由6到30个字符组成'
                    }
                }
            },
            'repassword': {
                message: 'The password is not valid',
                validators: {
                    notEmpty: {
                        message: '重复密码必须输入'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: '密码由6到30个字符组成'
                    },
                    identical: {
                        field: 'user[password]',
                        message: '两次密码必须一至'
                    }
                }
            },
            'user[email]': {
                message: 'The email is not valid',
                validators: {
                    notEmpty: {
                        message: '电子邮件必须输入'
                    },
                    emailAddress: {
                        message: '请输入正确的电子邮件地址'
                    },
                    remote: {
                        message: '电子邮件已经存在',
                        url: '/user/checkEmail'
                    }
                }
            }
        }
    });

})