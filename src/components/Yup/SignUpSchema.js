import * as yup from 'yup'

const passwordRules = /^(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~*]{8,}$/;
export const SignUpSchema = yup.object().shape({
    username:yup.string().min(3).max(16).required('Required'),
    fullname:yup.string().min(3).max(28).required('Required'),
    email:yup.string().email('Please enter a valid email address').required('Required'),
    password:yup.string().min(7).matches(passwordRules, {message: 'Please create a stronger password'}).required('Required'),
    role:yup.string().required('Required')
});