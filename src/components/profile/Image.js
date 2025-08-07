import Image from "next/image";
import Spinner from "../Spinner";
import placeholder from "@/assets/images/product-placeholder.jpeg";
import { PiUpload } from "react-icons/pi";
import { toast } from "react-toastify";
import { updateUserData } from "@/redux/auth/authSlice";
import { uploadProfileImage } from "@/api/users";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ProfileImage({ user }) {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  function updateImage() {
    setLoading(true);

    const formData = new FormData();

    formData.append("image", profileImage);

    uploadProfileImage(formData)
      .then((response) => {
        console.log(response);
        dispatch(
          updateUserData({
            ...user,
            profileImageUrl: response?.data?.profileImageUrl,
          })
        );

        toast.success("Profile image updated successfully.", {
          autoClose: 750,
        });
      })
      .catch((error) => toast.error(error.response?.data, { autoClose: 750 }))
      .finally(() => {
        setLoading(false);
        setProfileImage(null);
      });
  }

  return (
    <div className="py-5 flex items-center gap-5">
      <Image
        src={user.profileImageUrl ?? placeholder}
        alt=""
        height={64}
        width={64}
        className="w-32 h-32 rounded-full border-5 p-1 border-primary"
      />

      <div className="flex flex-col items-start gap-3">
        <input
          type="file"
          id="profile-image"
          className="border rounded-md border-gray-400 px-3 py-1"
          accept=".png,.jpg,.jpeg"
          defaultValue={profileImage}
          onChange={(e) => {
            const files = [];

            Array.from(e.target.files).map((file) => {
              files.push(file);
            });

            setProfileImage(files[0]);
          }}
        />

        <button
          onClick={updateImage}
          type="button"
          disabled={!profileImage}
          className="text-white bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-80"
        >
          {loading ? (
            <Spinner className="h-5 w-5 me-2" />
          ) : (
            <PiUpload className="h-5 w-5 me-2" />
          )}
          Upload image
        </button>
      </div>
    </div>
  );
}

export default ProfileImage;
