import{v2 as cloudinary} from "cloudinary"

const connectCloudinary = async()=>{

    cloudinary.config({
        cloud_name:"dtsxomh37",
        api_key:"584637396642654",
        api_secret:"iqy5gme5UP3lwZhEKkpA9OhDEYo"
    })
}
export default connectCloudinary;