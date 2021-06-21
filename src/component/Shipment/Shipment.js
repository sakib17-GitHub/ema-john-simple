import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import "./Shipment.css";
import { UserContext } from "../../App";

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [userLoggedIn , setUserLoggedIn] = useContext(UserContext);
    const onSubmit = data => console.log(data);
  
    console.log(watch("example"));
  
    return (
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
       
        <input {...register("name", { required: true })} defaultValue={userLoggedIn.name} placeholder="Your Name"/>
        {errors.name && <span className="error">Name is required</span>}

        <input {...register("email", { required: true })} defaultValue={userLoggedIn.email} placeholder="Your E-mail"/>
        {errors.email &&  <span className="error">E-mail is required</span>}

        <input {...register("address", { required: true })} placeholder="Your Address"/>
        {errors.address && <span className="error">Address is required</span>}

        <input {...register("phone", { required: true })} placeholder="Your Phone Number"/>
        {errors.phone && <span className="error">Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;