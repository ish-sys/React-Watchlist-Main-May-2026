import axios from "axios"
const commonAPI=async(httpMethod,url,reqBody)=>{

  const reqConfig={
    method:httpMethod,
    url,
    data:reqBody
  }
  try{
    const response= await axios(reqConfig)
    return response
  }
  catch(err){
    console.log(err)
  }
}
export default commonAPI