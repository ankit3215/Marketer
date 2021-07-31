const sendEmail = async (clientEmail,campaignData,window) =>{
    try {
        await  window.Email.send({
            SecureToken : "a66a457c-0910-429b-9643-b6a48a3c16c2",
            To : clientEmail,
            From : "reactjs137@gmail.com",
            Subject : campaignData.subject,
            Body : campaignData.content,
        })
        
    } catch (error) {
        return error
    }
 
}

export default sendEmail;