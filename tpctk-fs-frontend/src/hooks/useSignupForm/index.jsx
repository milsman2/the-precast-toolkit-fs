import { useState } from "react";

const useSignUpForm = () => {
 const [formInputs, setFormInputs] = useState({});
 const handleFormSubmit = (event) => {
   if (event) {
     event.preventDefault();
   }
 };

 const handleInputChange = (event) => {
   event.persist();
   setFormInputs((formInputs) => ({
     ...formInputs,
     [event.target.name]: event.target.value
   }));
 };

 return {
   handleFormSubmit,
   handleInputChange,
   formInputs
 };
};



export default useSignUpForm