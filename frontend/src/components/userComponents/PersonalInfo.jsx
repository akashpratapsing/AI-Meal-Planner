import React, { useEffect, useState } from "react";
import {
  Edit,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  User,
  Mail,
  Calendar,
  Users,
  Ruler,
  Weight,
  Heart,
  Utensils,
  AlertTriangle,
  ChevronDown,
  AtSign,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { getUserById, updateUser } from "../../services/userService";
import { changePassword } from "../../services/authService";

const PersonalInfo = () => {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.userId);
        setUserInfo({ ...data });
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    if (user?.userId) {
      fetchUser();
    }
  }, [user]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const updated = await updateUser(user.userId, userInfo);
      setUserInfo(updated);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update user info");
      console.error(error);
    }
  };

  const handleCancel = async () => {
    try {
      const data = await getUserById(user.userId); // re-fetch to revert changes
      setUserInfo(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to revert user info", error);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

     try {
    const token = localStorage.getItem("token"); // adjust if you store it differently
    const payload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    };

    const response = await changePassword(payload, token);
    alert(response); // API returns "Password changed successfully"

    // Reset state & close modal
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  } catch (error) {
    alert(error.message);
    console.error("Password change error:", error);
  }
  };

  const sexOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const dietaryOptions = [
    "None", "Vegetarian", "Vegan", "Pescatarian",
    "Keto", "Paleo", "Gluten-free", "Dairy-free",
  ];
  const religionOptions = [
    "Christianity", "Islam", "Judaism", "Hinduism",
    "Buddhism", "Other", "Prefer not to say",
  ];

  const InfoField = ({
    icon: Icon,
    label,
    value,
    field,
    type = "text",
    options = null,
    readOnly = false,
  }) => (
    <div className="form-control w-full">
      <label className="text-base-content/70 font-medium mb-2">{label}</label>
      {isEditing && !readOnly ? (
        options ? (
          <div className="relative">
            <select
              className="select select-bordered w-full bg-base-200/50 rounded-lg pl-4 pr-10 py-3 appearance-none"
              value={userInfo?.[field] ?? ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/50" />
          </div>
        ) : type === "textarea" ? (
          <textarea
            className="textarea textarea-bordered bg-base-200/50 rounded-lg w-full"
            value={userInfo?.[field] ?? ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows={3}
          />
        ) : (
          <input
            type={type}
            className="input input-bordered bg-base-200/50 rounded-lg w-full"
            value={userInfo?.[field] ?? ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={`Your ${label}`}
          />
        )
      ) : (
        <input
          type="text"
          className="input input-bordered bg-base-200/50 rounded-lg w-full"
          value={value || "Not specified"}
          disabled
        />
      )}
    </div>
  );

  if (!userInfo) {
    return <div className="text-center mt-10 text-lg">Loading user data...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto h-full overflow-hidden">
      <div className="bg-base-100 rounded-3xl shadow-lg relative z-10 h-full flex flex-col">
        {/* Profile Header */}
        <div className="px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center md:justify-between shrink-0">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              className="w-16 h-16 rounded-full border-4 border-base-100 shadow-md"
              alt="profile"
            />
            <div>
              <h2 className="text-xl font-bold">{userInfo.name || "User Name"}</h2>
              <p className="text-base-content/60 flex items-center gap-1">
                <AtSign size={14} />
                {userInfo.email}
              </p>
            </div>
          </div>
          
          <button 
            className="btn btn-primary mt-4 md:mt-0 px-6 rounded-full"
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? (
              <>
                <Save size={18} /> Save
              </>
            ) : (
              <>
                <Edit size={18} /> Edit
              </>
            )}
          </button>
        </div>
        
        {/* Form Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isEditing && (
            <div className="mb-4 flex justify-end">
              <button className="btn btn-ghost btn-sm" onClick={handleCancel}>
                <X size={16} /> Cancel Editing
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InfoField label="Full Name" value={userInfo.name} field="name" />
            <InfoField label="Email Address" value={userInfo.email} field="email" type="email" readOnly />
            <InfoField label="Age" value={userInfo.age} field="age" type="number" />
            <InfoField label="Gender" value={userInfo.sex} field="sex" options={sexOptions} />
            <InfoField label="Height" value={userInfo.height} field="height" />
            <InfoField label="Weight" value={userInfo.weight} field="weight" />
            <InfoField label="Religion" value={userInfo.religion} field="religion" options={religionOptions} />
            <InfoField label="Dietary Preference" value={userInfo.dietaryPreference} field="dietaryPreference" options={dietaryOptions} />
          </div>
          
          <div className="mt-4">
            <InfoField label="Allergies & Restrictions" value={userInfo.allergies} field="allergies" type="textarea" />
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              className="btn btn-outline btn-warning px-8 rounded-full"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock size={18} className="mr-2" /> Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Change Password</h3>
              <button 
                className="btn btn-sm btn-circle btn-ghost" 
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-6">
              {[
                { label: "Current Password", field: "currentPassword", show: showCurrentPassword, setShow: setShowCurrentPassword },
                { label: "New Password", field: "newPassword", show: showNewPassword, setShow: setShowNewPassword },
                { label: "Confirm New Password", field: "confirmPassword", show: showConfirmPassword, setShow: setShowConfirmPassword },
              ].map(({ label, field, show, setShow }) => (
                <div className="form-control" key={field}>
                  <label className="text-base-content/70 font-medium mb-2">{label}</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      className="input input-bordered w-full pr-10 bg-base-200/50 rounded-lg"
                      value={passwordData[field]}
                      onChange={(e) => handlePasswordChange(field, e.target.value)}
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              ))}

              <div className="alert alert-info bg-info/20 text-info-content rounded-lg">
                <AlertTriangle size={16} />
                <span>Password must be at least 8 characters long</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary px-6"
                onClick={handlePasswordSubmit}
                disabled={
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordData.confirmPassword
                }
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
