import axios from "axios";

export async function postUpload(file: File) {
    console.log("🚀 ~ file: postUpload.ts:4 ~ postUpload ~ file:", file)
    if (file) {
        const formData = new FormData();
        formData.append("comprovante", file); 
  
        const headersList = {
          "Accept": "*/*",
          'Content-Type': 'multipart/form-data',
        }
        
        let reqOptions = {
            url: `${process.env.URL_FRONT}/api/order`,
            method: "POST",
            data: formData,
            headers: headersList,
        }
    
        try {
          const response = await axios.request(reqOptions);          
          return response.data;  
        } catch (error) {
            return Promise.reject(error)
        } 
      }
}