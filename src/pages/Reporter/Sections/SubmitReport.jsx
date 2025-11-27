import FormInput from '../../../components/FormInput'
import Buttons from '../../../components/Buttons'
import SectionHeader from '../../../components/SectionHeader'
import { supabase } from '../../../subabaseClient'
import { Upload, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UserAuth } from '../../../context/AuthContext';
import DropDown from '../../../components/DropDown'
import { useNavigate } from 'react-router'

const categories = ["Electrical", "Plumbing", "Cleaning", "Security"];
function SubmitReport() {
  const {user} = UserAuth();
  const [dataURL, setDataURL] = useState(null);
  const [uploadedURL, setUploadedURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [success, setSuccess] =useState("");
  const [error, setError] = useState("");
  
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onabort =  () => console.log("file reading was aborted");
      reader.onerror =  () => console.log("file reading has an error");
      reader.onload = () => {
        const binaryStr = reader.result
        setDataURL(binaryStr)
      }
      reader.readAsDataURL(file)
    });
  }, []);

  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive
  } = useDropzone({ onDrop });

  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    location: '',
  })

  const validateForm = () => {
    if(reportForm.title.trim().length <= 0) return "Title Required"
    if(reportForm.description.trim().length <= 0) return "Title Required"
    if(reportForm.location.trim().length <= 0) return "Title Required"
    return null;
  }

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setUploadedURL(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const uploadImage = async (file) => {

    const filePath = `report-${file.name}-${Date.now()}`

    const { error } = await supabase.storage
      .from("report_url")
      .upload(filePath, file);
    

    if (error) {
      console.error("Enter uploading image:", error.message)
      return null;
    }

    const {data} = await supabase.storage
                    .from("report_url")
                    .getPublicUrl(filePath)

    return data.publicUrl;
  }

  const handleSubmit = async (e) => {
    setError("");
    setSuccess("");

    const validationError = validateForm();
      if(validationError) {
        setError(validationError)
        return;
      }
    setLoading(true);

    let image_url = null;
    
    if (uploadedURL) {
      image_url = await uploadImage(uploadedURL)
    }

    const {error} = await supabase
      .from("reports")
      .insert({...reportForm, image_url, user_id: user.id, category: category, reported_by: user?.user_metadata?.full_name })
      .single()

    if(error) {
      console.error("Error submitting report", error.message)
      setError(error.message);
    } else {
        setReportForm({
          title: "",
          description: "",
          location: "",
        });
        setCategory("");
        setDataURL(null);
        setUploadedURL(null);
        setError("")
        setSuccess("Report successfully submitted")
        
    }

    setLoading(false);

  }
  return (
    <section className='flex flex-col gap-5 justify-center items-center'>
      <SectionHeader
        title="Submit New Report"
        text="Report a facility issue for our team to address"
      />
    
      <div className='bg-white dark:bg-black sm:w-160 w-85 min-h-152 rounded-lg px-5 sm:px-8 pt-4 pb-6 flex flex-col gap-2 shadow-lg border-border/50 border'>
        <form action="" onSubmit={handleSubmit} className=' flex flex-col gap-5 w-full'>
          <h3 class="text-text font-semibold text-xl">
            Submit Maintenance Report
          </h3>

          <FormInput
            label = 'Title *'
            type='text'
            placeholder="Berief description of the issue"
            onChange= {(e) => setReportForm({...reportForm, title: e.target.value})}
          />

          <div>
            <p className="font-bold text-text mb-2">Description *</p>
            <div className='bg-background/90 rounded-xl focus:rounded-xl flex hover:outline-3 outline-border text-text-muted shadow-sm items-center'>
              <textarea
                name="description"
                id="input-description"
                required
                placeholder="Provide detailed information about the maintenance issue"
                className="bg-gray-100 dark:bg-gray-900 w-full text-[15px] px-3 py-1 rounded-md text-text-muted placeholder:text-gray-500 focus:outline-none"
                onChange= {(e) => setReportForm({...reportForm, description: e.target.value})}
                ></textarea>                
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-between items-center gap-5'>
            <div className='w-full flex flex-col gap-1 '>
              <DropDown
                categories={categories}
                value={category}
                onChange={setCategory}
              />
            </div>
            
            
            <FormInput
              label = 'Location *'
              type='text'
              placeholder="e.g., Building A - Rom 301"
              onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
            />
          </div>

          <div>
            <p className="font-bold text-text mb-2">Upload Images (Optional)</p>
            <label
              for="input-file"
              id="drop-area"
              className="block w-full h-40 rounded-lg text-center cursor-pointer"
            >   
              <input 
                type="file" 
                name="imageFileName" 
                accept="image/*" 
                hidden
                {...getInputProps()}
                
              />   
              {dataURL ? (
              <div
                id="selected"
                className={`w-full h-full border-3 border-border bg-gray-200 dark:bg-neutral-900 relative hover:border-primary-dark rounded-lg flex flex-col justify-center items-center gap-2 bg-center bg-cover `} 
                {...getRootProps()}
              >

                <Buttons style={'text-white absolute right-0 z-2 top-0 cursor-pointer w-5 h-5 flex items-center justify-center m-1'}
                  icon={<X className=' w-4  h-4  ' />}
                  onClick={() => setDataURL(null)}
                />
                
                <img src={dataURL} className='w-full h-full rounded-lg' />
              </div>

              ) : (
                <div
                  id="img-view"
                  className={`w-full h-full border-3 border-dashed border-border bg-gray-200 dark:bg-neutral-900 hover:border-primary-dark rounded-lg flex flex-col justify-center items-center gap-2 bg-center bg-cover `} 
                  {...getRootProps()}
                >
                  {isDragActive ? (
                    <div
                      id="drag-zone"
                    >
                    </div>
              ) : (
                    <div className='flex flex-col items-center gap-2'>
                      <Upload color="rgb(107, 114, 128)" />
                      <p className="text-text-muted text-sm">
                        Drag and drop your image here, or click to upload<br />
                        <span className="text-text-muted">Supports JPG, PNG files</span>
                      </p>
                    </div>
                  )}
                </div> 
                  
              )}  
              
            </label>
          </div>


          <button  className='cursor-pointer w-full bg-primary-dark p-2 rounded-lg text-white font-bold hover:bg-primary-dark/70' disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
          </button>

        </form>

          
      </div>
      {success && (<p className='text-success m-3'>{success}</p>)}

      {error && (<p className='text-error m-3'>{error}</p>)}
    </section>
  )
}

export default SubmitReport
