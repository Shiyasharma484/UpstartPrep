//-------------------------------------------------------------------
const imageRender = (req, res) => {

  //console.log(req);
  const imageRenderFiles = req;
  //console.log(imageRenderFiles);
  //
  const fileArray = Array.from(imageRenderFiles).map(file => URL.createObjectURL(file)); //to create a url path for images
  console.log(fileArray);
  //vimage = fileArray;
  //setSelectedImages(prev => prev.concat(fileArray));
  //setVSelectedImages(fileArray);
  Array.from(imageRenderFiles).map(file => URL.revokeObjectURL(file));
  //
  return fileArray;
};
//-------------------------------------------------------------------
// const imageUploadSave = (req, res) => {
//   console.log('Inside Helper imageUploadSave');
//   //console.log(req);
//   const url = req.url;
//   const vfile = req.vfile;

//   // const formData = new FormData();
//   // formData.append('photo', vfile);
//   //  formData.append('photoName', fileName);
//   // console.log(formData);
//   // async function vuploadphotofunc(url, formData) {
//   // Axios.post(url, formData, {
//   //   headers: {
//   //     Accept: 'application/json',
//   //     'Content-Type': 'multipart/form-data',
//   //     token: 'Bearer hjskdhskjdhsjkdhskjdhskjdhskdhskjdhsdjksjhdsjkdsdks',
//   //   },
//   // })
//   //   .then(response => {
//   //     console.log(response);

//   //     // console.log('Image uploaded');
//   //     if (response.status === 200 && response.data.success === 'Success') {
//   //       console.log(response.data.url, 'insideeeee');
//   //       const image = response.data.url[0];
//   //       objDataFinal[index][table_fieldName] = image;
//   //       // setImageURL(response.data.url);
//   //       notification.success({
//   //         message: 'Image Added Successfully',
//   //       });
//   //       setTimeout(() => {
//   //         notification.destroy();
//   //       }, 3000);
//   //     } else {
//   //       notification.error({
//   //         message: 'Error in Image Upload!!',
//   //       });
//   //     }
//   //   })
//   //   .catch(error => {
//   //     notification.error({
//   //       message: error.response.data.message,
//   //     });
//   //   });
//   // }
//   // vuploadphotofunc(url, formData);

//   return 'abc';
// };
//-----------------------------------------------------------------
module.exports = { imageRender };
