export async function postUpload(file: File) {
    
    if (file) {
      const fileContent = await file.text()
      const arrayLines = fileContent.split('\n')

      const headersList = {
        "Content-Type": "application/json"
      }

      const bodyContent = JSON.stringify({
        lines: arrayLines
      });
  
      await fetch(`${process.env.URL_FRONT}/api/order`, { 
          method: "POST",
          body: bodyContent,
          headers: headersList
      });
      
      return true;
    }
}