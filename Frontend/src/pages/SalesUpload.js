import { useState } from "react";

import axios from "axios";

import MainLayout
from "../layouts/MainLayout";

export default function SalesUpload() {

  const [file, setFile] =
  useState(null);

  const uploadFile = async () => {

    try {

      const formData =
      new FormData();

      formData.append(
        "file",
        file
      );

      const response =
      await axios.post(

        "http://localhost:5000/api/sales/upload",

        formData,

        {
          headers: {
            "Content-Type":
            "multipart/form-data"
          }
        }
      );

      alert(
        "Upload Successful"
      );

      console.log(
        response.data
      );

    } catch (err) {

      console.log(err);

      alert("Upload Failed");
    }
  };

  return (

    <MainLayout>

      <h1>
        Sales Excel Upload
      </h1>

      <div
        style={{
          marginTop: "20px"
        }}
      >

        <input

          type="file"

          accept=".xlsx,.xls"

          onChange={(e) =>

            setFile(
              e.target.files[0]
            )

          }

        />

        <br /><br />

        <button
          onClick={uploadFile}
        >

          Upload Excel

        </button>

      </div>

    </MainLayout>
  );
}