import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
function Profile() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [userUid, setUserUid] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUserUid(user.uid);
        setEmail(user.email);
      } else {
        navigate("/");
      }
    });
  }, []);

  const fetchUser = async (userUid) => {
    const docRef = doc(db, "profiles", userUid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormData(docSnap.data());
    }
  };
  useEffect(() => {
    if (userUid) {
      fetchUser(userUid);
    }
  }, [userUid]);

  const [formData, setFormData] = useState({
    fullname: "",
    gender: "",
    birthDate: "",
    interests: [],
  });

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleInterests = (event) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        interests: [...formData.interests, event.target.value],
      });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter(
          (item) => item !== event.target.value
        ),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await setDoc(doc(db, "profiles", userUid), formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg max-w-lg w-full">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-bold text-center mb-4">Profile</h3>
          <div className="mt-4">
            <label className="block">Full Name</label>
            <input
              type="text"
              value={formData.fullname}
              onChange={(event) =>
                setFormData({ ...formData, fullname: event.target.value })
              }
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Gender</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  id="Male"
                  value="m"
                  onChange={handleGenderChange}
                  checked={formData.gender === "m"}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  id="Female"
                  value="f"
                  onChange={handleGenderChange}
                  checked={formData.gender === "f"}
                />{" "}
                Female
              </label>
            </div>
          </div>
          <div className="mt-4">
            <label className="block">Birthdate</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(event) =>
                setFormData({ ...formData, birthDate: event.target.value })
              }
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block">Interests</label>
            <div className="flex flex-wrap gap-4">
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  onChange={handleInterests}
                />{" "}
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Traveling"
                  onChange={handleInterests}
                />{" "}
                Traveling
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Gaming"
                  onChange={handleInterests}
                />{" "}
                Gaming
              </label>
              {/* Add more interests as needed */}
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => signOut(auth)}
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
