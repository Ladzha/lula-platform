import jwt from 'jsonwebtoken';

export const authMiddleware = async (request, response, next) => {
  if(request.method ==='OPTIONS'){
    next()
  }
  try {
    const token = request.cookies.token || request.headers.authorization || request.headers["x-access-token"]; //get token from cookies req.cookies.token
    console.log(request.headers.authorization); //get token from headers req.headers["x-access-token"]
    console.log('headers=>>>>>',request.headers);
    console.log('request.cookies', request.cookies);
    if(!token){
      return response.status(401).json({message: 'User not authorized'})
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY) //verify token
    request.user = decoded;
    next();
    
  } catch (error) {
    console.log(error);
    return response.status(401).json({message: 'User not authorized'})
  }

}