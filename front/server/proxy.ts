import httpProxy from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

export const proxy = httpProxy.createProxyServer({
  target: `${process.env.URL_ORDER_MS}`,
  autoRewrite: true,
});

export const nextProxyServer = (path: any, req: NextApiRequest, res: NextApiResponse)=>{

  return new Promise((resolve, reject) => {
          
      const newReq = { ...req };

      newReq.url = path;

      const cookies = newReq.cookies;
      const token = cookies["@token"];
      newReq.headers.cookie = "";
      if(path !== "/auth/login"){
        newReq.headers.authorization = `Bearer ${token}` 
      }
      
      proxy.once("error", reject);

      proxy.on('proxyRes', (proxyRes, req, res)=> {
        let body: any[] = [];

        proxyRes.on("data", (chunk) => body.push(chunk));

        proxyRes.on("end", () => {
          const bodyString = Buffer.concat(body).toString();
          const statusCode = parseInt(bodyString[14] + bodyString[15] + bodyString[16])

          if ( statusCode && statusCode === 409 ) {
            console.log("res from proxied server:", bodyString);

            res.statusCode = 409;
            res.statusMessage = JSON.parse(bodyString)

            return res;  
          }

          console.log("res from proxied server:", bodyString);
          
          res.statusCode = 200;
          res.statusMessage = JSON.parse(bodyString)

          return res;  
        });

      });

      proxy.web(newReq, res, {
        selfHandleResponse: true,
      });
    
  })

}