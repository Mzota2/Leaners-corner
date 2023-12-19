import * as yup from 'yup';

export const settingsSchema = yup.object().shape({
    username:yup.string().min(3).max(16).required(),
    about:yup.string().min(28).max(150),
    interests:yup.string().min(3).max(150),
    skills:yup.string().min(3).max(200),
    experience:yup.string().min(3).max(200),
    linkedInLink:yup.string(),
    twitterLink:yup.string(),
    whatsapp:yup.string(),
    
});