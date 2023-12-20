import React from 'react'
import {Formik} from 'formik';
import { SignUpSchema } from '../../components/Yup/SignUpSchema';
import './SignUp.css';
import axios from 'axios';
import { PWD, USER, appUrl, frontendUrl } from '../../Helpers';
import {message} from 'antd';
import loginImage from '../../Assets/login.jpg';
import { useNavigate } from 'react-router-dom';
import googleSvg from '../../Assets/google.svg';
import twitterSvg from '../../Assets/twitter.svg';
import facebookSvg from '../../Assets/facebook.svg';
import 'animate.css';

function SignUp() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [isMailSent, setIsMailSent] = React.useState(false);

  function handleShowPassword(){
    setShowPassword(prev => !prev);
  }

  const [ user, setUser ] = React.useState([]);
  const [ profile, setProfile ] = React.useState([]);



  const postUser = async(values)=>{
    try {
      setIsLoading(true)
      const response = await axios.post(`${appUrl}user/signup`, values);
      const {data} = response;
      console.log(data);
      const {user, msg} = data;

      if(!user){
        message.warning(msg)
      }
      else{
        message.success(msg)
        setIsMailSent(true);
      }
      
    } catch (error) {
      message.error('Try again later ! Something went wrong');

      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }


  function handleSubmit(values, {resetForm}){
    console.log(values);
    postUser(values)
    // resetForm();
  }


  React.useEffect(()=>{
    if (user) {
      axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
              headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
              }
          })
          .then((res) => {
              setProfile(res.data);
          })
          .catch((err) => console.log(err));
  }
  }, [user])
  return (
    <div className='sign-container signup-container'>
    
      <Formik

      initialValues={{
        username:'',
        email:'',
        password:'',
        role:'',
        fullname:''
      }}

      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
      
      >{({handleChange, handleSubmit, errors, values, touched})=>(
        !isMailSent?<form autoComplete='off' noValidate onSubmit={handleSubmit} className=' signin-form'>
          
          <div className="sign-image-container-contents">
            <h3 className="footer--title signin-logo">Learners corner.</h3>
            <h2 className='signup-text'>Sign Up for an Account</h2>

            <p>Create your account so you can start enjoying our online classes and quizzes.</p>

          </div>
   
          <div className="row">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' value={values.username} onChange={handleChange} className='lc-input' />
            {touched.username && errors.username && <p className='error-text'>{errors.username}</p>}
          </div>

          <div className="row">
            <label htmlFor="fullname">Full name</label>
            <input type="text" name='fullname' id='fullname' value={values.fullname} onChange={handleChange} className='lc-input' />
            {touched.fullname && errors.fullname && <p className='error-text'>{errors.fullname}</p>}
          </div>

          <div className="row">
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' value={values.email} onChange={handleChange} className='lc-input'  />
            {touched.email && errors.email && <p className='error-text'>{errors.email}</p>}
          </div>

          <div className="row">
            <label htmlFor='password'>Password</label>
            <input type={`${showPassword? 'text':'password'}`} name='password' id='password' value={values.password} onChange={handleChange} className='lc-input' />
            <div className="col">
              <input className='checkPassword' id='checkPassword' type="checkbox" checked={showPassword} onChange={handleShowPassword} />
              <label htmlFor="checkPassword">Show Password</label>
            </div>
            
            {touched.password && errors.password && <p className='error-text'>{errors.password}</p>}
          </div>

          <div className="row">

            <h3>Are you a Student or Teacher?</h3>
            <p>Please select your role to create your account</p>

            <div className="col">
              <input className='checkPassword' id='student' type="radio" name='role' value={'student'} onChange={handleChange}/>
              <label  htmlFor="student">Student</label>
            </div>

            <div className="col">
              <input className='checkPassword' id='teacher' type="radio" name='role' value={'teacher'} onChange={handleChange}/>
              <label htmlFor="student">Teacher</label>

            </div>

            {touched.role && errors.role &&<p className='error-text'>{errors.role}</p>}

          </div>

          <button disabled={isLoading} className='create-btn' type='submit'>SIGN UP</button>
          
          <br />

          
          
          <p className='third-party-text'>Or Login using</p>
          <div className="third-party-login-container">
            
            <div className="third-party">
                <img className='third-party-icon' src={googleSvg} alt="google" />
            </div>
            <div className="third-party">
                <img className='third-party-icon' src={facebookSvg} alt="facebook" />
            </div>
            <div className="third-party">
              <img className='third-party-icon' src={twitterSvg} alt="twitter" />
            </div>
          </div>
        
        
        </form>:

        <div className="l-email-sent-container">

          <div className="l-email-sent-main-container">
            <h3 className="footer--title">Learners corner</h3>
            <h3>Please Verify Your Email</h3>
            <p>You are almost there! We have sent an email to <br /> <strong>{values.email}</strong></p>
            <p>Just click the link in that email to complete your signup. <br /> If you don't see it, you may need to <strong>check your spam</strong> folder. </p>
            <p>Still can't find it ? </p>
            <button type='button' className='l-btn btn-resend-email'>Resend Email</button>
            <p>Need help? <a href="/learners-corner/contact">Contact us</a></p>
          </div>
          
        </div>
      )}
      </Formik>
      {!isMailSent?<div className='sign-image-container'>
          <div className="sign-image-container-contents">
            <h2 className='signup-text'>Already Signed Up ?</h2>
            <p>Login to your account so you can continue enjoying our online classes and quizzes.</p>
            <button className='l-login-btn' onClick={()=>{navigate('/learners-corner/signin')}}>LOGIN</button>
          </div>          

      </div>:<></>}
    </div>
  )
}

export default SignUp