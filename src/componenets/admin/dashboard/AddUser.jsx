import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import { css } from "@emotion/react";
import { BeatLoader} from "react-spinners";
import solid from "../../../assets/solid.svg";
import { Form, useNavigate } from "react-router-dom";

const AddUser = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [cover, setCover] = useState("");
  const jwt = localStorage.getItem("jwt");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePhoto: "",
    userName: "",
  });

  const checkTokenExpiration = async () => {
    const jwt = localStorage.getItem("jwt");
    const expirationTime = localStorage.getItem("expirationTime");

    if (jwt && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(expirationTime)) {
        // Token has expired, navigate the user to the login page
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const handleCoverInput = (e) => {
    e.preventDefault();
    ref.current.click();
  };

  const handleFileInput = (e) => {
    setForm({ ...form, schoolLogo: e.target.files[0] });
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("api_key", "148857165459491");
    formData.append("upload_preset", "p9rngv4l");

    fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const url = data.url;
        console.log(url);
        setForm({ ...form, profilePhoto: url });
        // Handle the response data
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  const handleUpload = async () => {
    if (form.password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    } else {
      setMessage("");
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://testmanagement2.onrender.com/api/user/signup/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${jwt}`, // Include the JWT token in the Authorization header
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        console.log(data);
        setLoading(false);
        setSuccess(true)
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoading(false)
        const errorData = data || {};
        setMessage(data);
        console.log(errorData);
        // Handle the error
      }
    } catch (error) {
      setSuccess(false)
      setMessage(error);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <>
     {loading ? (
          <div className="fixed h-[100vh] w-[100%] z-40 top-0 left-0 bg-overlay flex justify-center items-center">
            <BeatLoader
              css={css`
                display: block;
                margin: 0 auto;
              `}
              size={24}
              color={"#FFFFFF"}
              loading={loading}
            />
          </div>
        ) : (
          ""
        )}
    <div className="bg-lightGrey min-h-[100vh]">
      <Header />
      <div className="my-container py-9 flex flex-col justify-center">
        <div className="md:flex md:gap-16">
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="md:flex gap-16">
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">Email</label>
            <input
              type="text"
              name="email"
              placeholder="name@example.com"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
        </div>
        <div className="md:flex gap-16">
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">Create Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter user password"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <div className="md:w-1/2">
            <label className="font-bold text-[13px]">Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter Password"
              className="w-full outline-0 border-[1px] border-gray rounded-md py-2 px-3 mb-3"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        {/* <p className="text-red">{message}</p> */}
        <div className="">
          <div onClick={handleCoverInput} className="flex justify-center">
          <div className="bg-lightGrey h-24 w-24 rounded-full mt-6 flex justify-center items-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    className="w-[100] h-[100] object-contain"
                    alt="Image Preview"
                  />
                ) : (
                  <img src={solid} alt="" />
                )}
              </div>
          </div>
          <input
            type="file"
            name="profilePhoto"
            id=""
            ref={ref}
            value={cover}
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
        <div className='pt-4'>
          <p className="text-center text-red">{message}</p>
        </div>
          {success && <div>
            <p className="text-center text-green">User Added Successfully</p>
          </div>}
        <div className="flex justify-center items-center my-5">
          <button
            onClick={handleUpload}
            className="bg-blue text-white py-2 px-6 rounded-md"
          >
            Create User
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddUser;
