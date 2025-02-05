import { notification } from 'antd';
import Axios from 'axios';
import { headers } from '../helpers/variables';

//-------------------------------------------------------------------
const imageUploadSave = async (vfile, url) => {
  console.log('Inside Helper imageUploadSave');
  var image;
  // console.log(vfile);
  console.log(url);
  //
  const formData = new FormData();
  [...vfile].map(file => {
    formData.append('photo', file);
  });
  // //for single file working below code-----------------
  // //   const formData = new FormData();
  // //   formData.append('photo', file);
  // //-----------------------------------------------------

  // //formData.append('photoName', fileName);
  // // console.log(formData);

  //  async function vuploadphotofunc(url, formData) {
  //    console.log(url);
  await Axios.post(url, formData, {
    headers,
  })
    .then(response => {
      console.log(response);
      // console.log('Image uploaded');
      if (response.status === 200 && response.data.success === 'Success') {
        console.log(response.data.url, 'insideeeee');
        image = response.data.url;
        //  objDataFinal[index][table_fieldName] = image;
        // setImageURL(response.data.url);
        // notification.success({
        //   message: 'Image Added Successfully',
        // });
        setTimeout(() => {
          notification.destroy();
        }, 3000);
        //return image;
      } else {
        notification.error({
          message: 'Error in Image Upload!!',
        });
        // return 0;
      }
    })
    .catch(error => {
      notification.error({
        message: error.response.data.message,
      });
      //return 0;
    });
  // };
  //  const hh = await vuploadphotofunc(url, formData);
  // // console.log(image);
  // // console.log('Ppp');
  return image;
};
//-----------------------------------------------------------------
//module.exports = { imageUploadSave };

export default imageUploadSave;
