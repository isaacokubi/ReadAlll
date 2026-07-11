import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
} from "../../api/user";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserProfile(user._id);
      setForm({
        name: data.name,
        email: data.email,
      });
    };

    fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserProfile(user._id, form);

      toast.success("Profile updated");
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">
        My Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;