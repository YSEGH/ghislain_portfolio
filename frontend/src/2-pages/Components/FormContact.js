import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../../1-css/FormContact.css";
import {
  emailSuccessReset,
  sendEmailHandler,
} from "../../3-actions/emailActions";
import { toast } from "react-toastify";

export default function FormContact() {
  const sendEmail = useSelector((state) => state.sendEmail);
  const { loading, success, error } = sendEmail;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const message = {
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
    };
    dispatch(sendEmailHandler(message));
  };

  useEffect(() => {
    if (success) {
      toast.success(success.message);
      dispatch(emailSuccessReset());
    }
    return () => {};
  }, [success]);

  return (
    <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
      <div className="inputs-container">
        <input {...register("lastname")} placeholder="Name" />
        <input {...register("email")} placeholder="Email" />
      </div>
      <div className="inputs-container">
        <input {...register("phone")} placeholder="Phone" />
        <input {...register("company")} placeholder="Company" />
      </div>
      <textarea {...register("message")} placeholder="Message" />
      <button type="submit">Send</button>
    </form>
  );
}
