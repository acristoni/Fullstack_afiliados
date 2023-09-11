import { Alert, Button, Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postUpload } from "service/postUpload";

export default function ButtonUpload() {
    const router = useRouter()
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null)
      };
    
    useEffect(() => {
      if (file) {
        const uploadFile = async() => {
            const maxSize = 5 * 1024 * 1024 // Define o tamanho máximo permitido (5 MB)
            const allowedFileTypes = ['text/plain'];
        
            if (file) {
              if (!allowedFileTypes.includes(file.type)) {
                <Alert severity="error">Tipo de arquivo inválido. São permitidos apenas arquivos JPEG, PNG e PDF.</Alert> 
                setFile(null)
              } else if (file.size > maxSize) {
                <Alert severity="error">Envie um arquivo menor que 5MB.</Alert>
                setFile(null)
              } else {
                const response = await postUpload(file)
                if (response) {
                  location.reload();
                }
              }
            }
        }
        uploadFile();
      }
    }, [file]);

    return (
        <Input 
          color="primary"
          sx={{
            position: 'absolute',
            bottom: '10px',
            right: '10px'
          }}
          id="ButtonUpload"
          onChange={handleChange} 
          type="file"
        />
    )
}