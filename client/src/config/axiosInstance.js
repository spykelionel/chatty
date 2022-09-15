import axios from 'axios';

const customAxios = (contentType) => {
  // axios instance for making requests
  const axiosInstance = axios.create({
    // your other properties for axios instance
    headers: {
      'Content-Type': contentType,
    },
  });

  // your response interceptor
  axiosInstance.interceptors.response.use((res)=>{
    console.log(res)
  });

  return axiosInstance;
};

export default customAxios;