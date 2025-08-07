import { useState } from "react";

import "./App.css";
import { useForm } from "react-hook-form";
// React (Required)
import "@dds/react/css/dds-components.css";
// Foundations (Highly recommended)
import "@dds/react/css/dds-reboot.css";
import "@dds/react/css/dds-fonts.css";
import "@dds/react/css/dds-icons.css";
// Foundations (Optional)
import "@dds/react/css/dds-main.css";
import "@dds/react/css/dds-helpers.css";
import "@dds/react/css/dds-templates.css";
import { DDSInput } from "@dds/react";

function App() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };
  const onSubmit = async (data) => {
    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await r.text();
    console.log(data, res);
  };

  const serviceTag = register("serviceTag", {
    required: { value: true, message: "This field is required" },
    maxLength: {
      value: 7,
      message: "The exact length should be 7 characters",
    },
    minLength: {
      value: 7,
      message: "The exact length should be 7 characters",
    },
  });

  return (
    <>
      {isSubmitting && <p>Loading...</p>}
      <div className="container">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Service Tag#" {...serviceTag} type="text" />
          {errors.serviceTag && <p>{errors.serviceTag.message}</p>}
          <br />
          <input
            placeholder="Server Model Name"
            // style={{ backgroundColor: "#a8396f" }}
            {...register("serverModel")}
            errorMessage={errors.serviceTag?.message}
            type="text"
          />
          <br />
          <input
            placeholder="Server Generation"
            {...register("serverGen")}
            type="text"
          />
          <br />
          <input
            placeholder="Server Form Factor"
            {...register("serverFormFactor")}
            type="text"
          />
          <br />
          <input
            placeholder="Server Ship Date (YYYY)"
            {...register("serverShippedDate")}
            type="date"
          />
          <br />
          <input disabled={isSubmitting} type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
