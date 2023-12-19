import React from 'react'
import {Formik} from 'formik';
import { LoginSchema } from '../../components/Yup/LoginSchema';
import axios from 'axios';
import { appUrl, getUser } from '../../Helpers';
import { useNavigate } from 'react-router-dom';
import {message} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import { getLoggedInUser, setToken, setUser } from '../../state/usersSlice';
import googleSvg from '../../Assets/google.svg';
import twitterSvg from '../../Assets/twitter.svg';
import facebookSvg from '../../Assets/facebook.svg';
import Loader from '../../components/Loader/Loader';

function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  function handleShowPassword(){
    setShowPassword(prev => !prev);
  }

  const login = async(values)=>{
    try {
      setIsLoading(true)
      const response = await axios.post(`${appUrl}user/signin`, values, {
        withCredentials:true,
      });

      const {data} = response;
      const {token, msg} = data;
      if(!token){
        message.warning(msg)
      }

      else{
        message.success(msg);
        navigate('/learners-corner');
        dispatch(setToken(token));
        dispatch(getLoggedInUser(token));

        // const loggedUser = await getUser(token);

        // if(loggedUser){
        //   dispatch(setUser(loggedUser))
        // }
        
      }
      
      
    } catch (error) {
      message.error('Try Again ! Something went wrong')
      console.log(error);

    }finally{
      console.log(user);
      setIsLoading(false);
    }
  }

  function handleSubmit(values, {resetForm}){
    console.log(values);
    login(values);
    resetForm();
    
  }

  React.useEffect(()=>{

  }, [user]);

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className='sign-container signin-container'>
      
      <Formik

      initialValues={{
        email:'',
        password:'',
      
      }}

      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      
      >{({handleChange, handleSubmit, errors, values, touched})=>(
        <form noValidate onSubmit={handleSubmit} className='sign-form signin-form' autoComplete='off'>
          
          
          <div className="sign-image-container-contents">
            <h3 className="footer--title signin-logo">Learners corner.</h3>
            <h2 className='signup-text'>Login to your account</h2>

            <p>Login to your account so you can continue enjoying our online classes and quizzes.</p>
          </div>
    
    
    
          <div className="row">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={values.email} onChange={handleChange} className='lc-input'  />
            {touched.email && errors.email && <p className='error-text'>{errors.email}</p>}
          </div>

          <div className="row">
            <label htmlFor='password'>Password</label>
            <input type={`${showPassword? 'text':'password'}`} id='password' value={values.password} onChange={handleChange} className='lc-input' />
            <div className="col">
              <input className='checkPassword' id='checkPassword' type="checkbox" checked={showPassword} onChange={handleShowPassword} />
              <label htmlFor="checkPassword">Show Password</label>
            </div>
            
            {touched.password && errors.password && <p className='error-text'>{errors.password}</p>}
          </div>

          <button disabled={isLoading} className='create-btn' type='submit'>LOGIN</button>

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

        </form>
      )}
      </Formik>

      <div className='sign-image-container'>

          <div className="sign-image-container-contents">

            <h2 className='signup-text'>Don't have an account yet?</h2>

            <p>Create your account so you can start enjoying our online classes and quizzes.</p>
            
            <button className='l-login-btn' onClick={()=>{navigate('/learners-corner/signup')}}>SIGN UP</button>
          </div>          

      </div>

    </div>
  )
}

export default SignIn