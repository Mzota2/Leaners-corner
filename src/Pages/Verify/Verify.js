import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { appUrl } from '../../Helpers';
import { message } from 'antd';
function Verify() {
    const {token} = useParams();
    const [verifyData, setVerifyData] = React.useState('');

    const navigate = useNavigate();
    const verifyEmail = async(token)=>{
        try {
            const response = await axios.get(`${appUrl}user/confirm/${token}`);
            const {data} = response;
            console.log(data);
            if(data === 'Email Verified'){
                setTimeout(()=>{
                    navigate('/learners-corner/signin');
                }, 4000)
            }
            setVerifyData(data);
        } catch (error) {
            message.error('Try again ! Something went wrong');
        }
    }

    React.useEffect(()=>{
        if(!verifyData){
            verifyEmail(token);
        }
    }, []);

    if(verifyData === 'Invalid Token'){
        return <h3 style={{color:'brown'}}>{verifyData?.msg}</h3>
    }

  return (
    <div className='l-mail-sent'>
        <div className='l-email-sent-container-clicked'>
            
            <br />
            <h3>Verified redirecting...</h3>

        </div>
    </div>
    

  )
}

export default Verify