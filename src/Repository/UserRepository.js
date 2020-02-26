function userRepository(){

    //public Method
    this.loginValidationAsync =async function(userModelPara){
        let response=null;
        try{
            return await new promises((resolve) =>{
                let tempUserName="Nahid";
                let tempPassword="123";

                if(tempUserName===userModelPara.userName
                &&
                tempPassword===userModelPara.password)
                {
                    response=true;
                }
                else
                {
                    response="UserName and Password does not match";
                }

                return resolve(response);
            });

        }
        catch(ex){

            throw ex;

        }
    }
}
