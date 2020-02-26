///<reference path="../src/lib/jquery/jquery-3.4.1.min.js"></reference>
function usersController(userModelPara=Null,userContextPara=null){

    let _userModelObj=userModelPara;
    let _userContextObj=userContextPara;

    //private method
    let getUserCredentialsAsync= async function(){
        try{
             
            return await new promises((resolve)=>{
                //model binding
                _userModelObj.userName=$("#txtUserName").val();
                _userModelObj.password=$("#txtPassword").val();
                
                return resolve(true);

            });
           
        }
        catch(ex)
        {

          throw ex;

        } 
    }

    let validationUserAsync= async function(){
        let isFlag=undefined;//boolean
        try{

           return await new promise((resolve)=>{
             if(
                 (_userModelObj.userName!=null)
                 &&
                 (_userModelObj.password!=null)
                )
                {
                  $("#validationUser").html("UserName And Password should not be empty");
                   isFlag=false;
                }
                else
                {
                    isFlag=true;
                }
                return resolve(isFlag);

            });
        }
        catch(ex)
        {
            throw ex;
        }
    }
    
    
    let validationUserCredentialsAsync= async function(isValidationDone){
        let response= undefined;//string||boolean
        try{ 

            return await new promise(async (resolve)=>{
            
                if(isValidationDone===true)
                {
                   response=await _userContextObj.loginValidationAsync(_userModelObj);
                }
               return resolve(response);
            });
        }
        catch(ex)
        {
            throw ex;
        }
    }
 
   
    let redirectToDashboardAsync= async function(response){
        try{
             return await new promise((resolve)=>{

                if(typeof(response)==="boolean"){
                    //Redirect to DashBoard

                }
                else
                {
                    $("#validationUser").html(response);
                }

                return resolve(true);
            });

        }
        catch(ex)
        {
            throw ex;
        }

    }

}    

    //public method
    this.onSubmitAsync=async function(){
        try{
            return await new promise( async (resolve)=>{
                
                //read user credentials from UI
               await getUserCredentialsAsync();
                 
                //validation users
                let isValidationDone =await validationUserAsync();
               
                //validate user credential
                let response= await validationUserCredentialAsync(isValidationDone);
                
                //Redirect to Dashboard
                await redirectToDashboardAsync(response);

                return resolve();
            });

        }
        catch(ex)
        {
            throw ex;
        }
 
    }

 
   //Non async mode.
    function onSubmitButtonClickEvent(){
    try{
        //Create an Instance of userModel
        let userModelObj=new userModel();

        //Create an Instance of Repository
        let userRepositoryObj= new userRepository();

        //Create an Instance of userContext
         let userContextObj=new userContext(userRepositoryObj);

        //Create an Instance of UserController
        let usersControllerObj= new usersController(userModelObj,userContextObj);
        usersControllerObj
        .onSubmitAsync()
        .then((resolve)=> console.log(resolve));
    }
    catch(ex)
    {
        console.log(ex.message);
        console.log(ex.stack);

    }
}