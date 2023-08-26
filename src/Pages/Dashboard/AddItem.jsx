import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const img_token = import.meta.env.VITE_Image_token;
//console.log(img_token)
const AddItem = ()=>{
  const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const img_url = `https://api.imgbb.com/1/upload?key=${img_token}`
  const onSubmit = data => {console.log(data)
  const formData = new FormData();
  formData.append('image', data.image[0])

  fetch(img_url,{
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(imageResponse => {
    if(imageResponse.success){
      const imgURL = imageResponse.data.display_url;
      const {name, price, category, recipe} = data;
      const newItem = {name, price: parseFloat(price), category, recipe, image: imgURL}
      console.log(newItem)
      axiosSecure.post('/menu', newItem)
      .then(data => {
        console.log('new item', data.data)
        reset();
        if(data.data.insertedId){
          alert('Added!')
        }
      })
      
    }
    })
  
  
  };
  
    return(
        <div className="w-full px-10">
            <SectionTitle subHeading="What's new" heading="Add an item"></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
  <label className="label">
    <span className="label-text font-semibold">Recipe Name*</span>
  </label>
  <input type="text" placeholder="Recipe name" {...register("name", {required: true, maxLength: 80})} className="input input-bordered w-full " />
</div>
<div className="flex">
<div className="form-control w-full ">
  <label className="label">
    <span className="label-tex font-semibold">Category*</span>
  </label>
  <select {...register("category", { required: true })} className="select select-bordered">
    <option disabled selected>Pick one</option>
    <option>Pizza</option>
    <option>Soup</option>
    <option>Salad</option>
    <option>Dessert</option>
    <option>Drink</option>
  </select>
</div>
<div className="form-control w-full ml-4">
  <label className="label">
    <span className="label-text font-semibold">Price*</span>
  </label>
  <input type="number"  {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
</div>
</div>
<div className="form-control">
  <label className="label">
    <span className="label-text">Recipe Details</span>
  </label>
  <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
</div>
<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Choose image*</span>
  </label>
  <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
</div>
<input type="submit" value="Submit" className="btn btn-sm mt-5" />
            </form>
        </div>
    );

};

export default AddItem;