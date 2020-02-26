function userContext(userRepositoryPara){

    let _userRepository=userRepositoryPara;

    this.loginValidationAsync=async function(userModelPara){
        let response=null;
        try{
            return await new Promise(async(resolve)=>{

            response=await _userRepository.loginValidation(userModelPara);
            
            return resolve (response);
            
            });
        }
        catch(ex){

            throw ex;

        }
    }

}