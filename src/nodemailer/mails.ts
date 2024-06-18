import 'dotenv/config'
// import{error,info}from "console"
// import nodemailer from 'nodemailer'
// const mail_Function=()=>{
//     const transporter=nodemailer.createTransport({
//         service:"gmail",
//         auth:{
//             user:process.env.EMAIL,
//             pass:process.env.PASSWORD
//         }
//     });
//     const mailOptions={
//         from:process.env.EMAIL,
//         to:email,
//         subject:"cogratulations for registering",
//         text:"welcome to Abdirahman's networking for best tech services,thanks for choosing us"

//     }
//     transporter.sendMail(mailOptions,(error,info)=>{
//         if(error){
//             console.log(error)
//         }else{
//             console.log(`Email send:${info.response}`)
//         }

//     })
 
// }
// export default mail_Function;
import nodemailer from 'nodemailer';    

export const sendEmail = async (email: string, subject: string, message: string): Promise<string> => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `${subject}`, 
            text:`${message}`// "welcome to Abdirahman's networking for best tech services,thanks for choosing us",
        };

        const mailRes: nodemailer.SentMessageInfo = await transporter.sendMail(mailOptions);
        let mailResponse = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email rejected, please try again';
        } else {
            mailResponse = 'Email not sent';
        }
        return mailResponse;    
    } catch (error: any) {
        return JSON.stringify(error.message); 
    }
};
export const sendRegistrationEmail = async (userMail: string): Promise<string> => {
    try{
        const subject: string = 'Registration Successful';
        const message: string = `Thank you for registering for`;   

        const emailResponse: string = await sendEmail(userMail, subject, message);
        return emailResponse;
    }catch (error: any) {
        throw new Error(error.message);
    }
}
