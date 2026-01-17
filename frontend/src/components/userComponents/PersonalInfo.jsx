import React, { useEffect, useState, useRef } from "react";
import {
  Edit,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  AtSign,
  AlertTriangle,
  ChevronDown,
  Camera,
  User,
  Calendar,
  Ruler,
  Weight,
  BookOpen,
  Mail,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import {
  getUserById,
  updateUser,
  uploadProfilePicture,
} from "../../services/userService";
import { changePassword } from "../../services/authService";
import toast from "react-hot-toast";
import profile from "../../assets/profile.png";
import { motion, AnimatePresence } from "framer-motion";

// ----------------------------------------------------------
// FIX: InfoField moved OUTSIDE component so React doesn’t remount inputs.
// ----------------------------------------------------------
const InfoField = ({
  label,
  value,
  field,
  type = "text",
  options = null,
  readOnly = false,
  isEditing,
  onChange,
  icon: Icon,
}) => {
  const v = value ?? "";

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium text-base-content/70 flex items-center gap-2">
          {Icon && <Icon size={14} />} {label}
        </span>
      </label>

      {isEditing && !readOnly ? (
        options ? (
          <div className="relative">
            <select
              value={v}
              onChange={(e) => onChange(field, e.target.value)}
              className="select select-bordered w-full rounded-xl bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            >
              <option value="">Select...</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none"
              size={16}
            />
          </div>
        ) : type === "textarea" ? (
          <textarea
            value={v}
            onChange={(e) => onChange(field, e.target.value)}
            rows={3}
            className="textarea textarea-bordered w-full rounded-xl bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        ) : (
          <input
            type={type}
            value={v}
            onChange={(e) => onChange(field, e.target.value)}
            className="input input-bordered w-full rounded-xl bg-base-100 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        )
      ) : (
        <div className="px-4 py-3 rounded-xl bg-base-200/50 border border-transparent text-base-content font-medium min-h-[3rem] flex items-center">
          {v || (
            <span className="text-base-content/40 italic">Not specified</span>
          )}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------
const PersonalInfo = () => {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const fileInputRef = useRef();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserById(user.userId);
        setUserInfo({
          ...data,
          allergies: data.allergies ?? "",
          dietaryPreference: data.dietaryPreference ?? "",
          religion: data.religion ?? "",
          sex: data.sex ?? "",
          height: data.height ?? "",
          weight: data.weight ?? "",
          age: data.age ?? "",
        });
      } catch (err) {
        toast.error("Failed to fetch user data");
      }
    };

    if (user?.userId) load();
  }, [user?.userId]);

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData((p) => ({ ...p, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await updateUser(user.userId, userInfo);
      setUserInfo(updated);
      toast.success("Profile updated");
      setIsEditing(false);
    } catch (_) {
      toast.error("Update failed");
    }
  };

  const handleCancel = async () => {
    try {
      const data = await getUserById(user.userId);
      setUserInfo(data);
      setIsEditing(false);
    } catch (_) {}
  };

  const handleProfilePicClick = () => fileInputRef.current.click();

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadProfilePicture(user.userId, file);
      setUserInfo((prev) => ({ ...prev, profileImageUrl: url }));
      toast.success("Updated!");
    } catch (_) {
      toast.error("Image upload failed");
    } finally {
      setUploadingImage(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Minimum 8 characters");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await changePassword(passwordData, token);
      toast.success("Password updated");
      setShowPasswordModal(false);
    } catch (_) {
      toast.error("Unable to update");
    }
  };

  const sexOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const dietaryOptions = [
    "None",
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Keto",
    "Paleo",
    "Gluten-free",
    "Dairy-free",
  ];
  const religionOptions = [
    "Christianity",
    "Islam",
    "Judaism",
    "Hinduism",
    "Buddhism",
    "Other",
    "Prefer not to say",
  ];

  if (!userInfo) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/60 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10 px-4">
      <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
        {/* Decorative Header Background */}
        <div className="h-32 bg-gradient-to-r from-primary/10 to-secondary/10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        {/* HEADER */}
        <div className="px-6 md:px-10 -mt-12 relative flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pb-6 border-b border-base-200">
          <div className="flex items-end gap-5">
            <div className="relative group">
              <img
                src={userInfo.profileImageUrl || profile}
                className="w-24 h-24 rounded-full object-cover border-4 border-base-100 shadow-md bg-base-200 cursor-pointer hover:opacity-90 transition"
                alt="Profile"
                onClick={() => setShowAvatarModal(true)}
              />

              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </div>

            <div className="mb-1">
              <h2 className="text-2xl font-bold text-base-content">
                {userInfo.name}
              </h2>
              <p className="text-base-content/60 flex items-center gap-1 text-sm">
                <AtSign size={14} />
                {userInfo.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2 mb-1 w-full md:w-auto">
            {isEditing ? (
              <>
                <button
                  className="btn btn-ghost btn-sm flex-1 md:flex-none"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm flex-1 md:flex-none"
                  onClick={handleSave}
                >
                  <Save size={16} /> Save
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline btn-sm gap-2 flex-1 md:flex-none"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InfoField
              label="Full Name"
              field="name"
              value={userInfo.name}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={User}
            />

            <InfoField
              label="Email"
              field="email"
              value={userInfo.email}
              readOnly
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={Mail}
            />

            <InfoField
              label="Age"
              field="age"
              value={userInfo.age}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={Calendar}
            />

            <InfoField
              label="Gender"
              field="sex"
              value={userInfo.sex}
              options={sexOptions}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={User}
            />

            <InfoField
              label="Height (cm)"
              field="height"
              value={userInfo.height}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={Ruler}
            />

            <InfoField
              label="Weight (kg)"
              field="weight"
              value={userInfo.weight}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={Weight}
            />

            <InfoField
              label="Religion"
              field="religion"
              value={userInfo.religion}
              options={religionOptions}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={BookOpen}
            />

            <InfoField
              label="Dietary Preference"
              field="dietaryPreference"
              value={userInfo.dietaryPreference}
              options={dietaryOptions}
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={AlertTriangle}
            />
          </div>

          {/* Allergies */}
          <div className="mt-8">
            <InfoField
              label="Allergies & Restrictions"
              field="allergies"
              value={userInfo.allergies}
              type="textarea"
              isEditing={isEditing}
              onChange={handleInputChange}
              icon={AlertTriangle}
            />
          </div>

          <div className="mt-10 pt-6 border-t border-base-200 flex justify-center">
            <button
              className="btn btn-error btn-outline btn-sm gap-2"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <AnimatePresence>
          {showPasswordModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
            >
              <motion.div
                className="relative bg-base-100 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-base-200">
                  <div className="flex items-center gap-2">
                    <Lock className="text-primary" size={20} />
                    <h3 className="text-lg font-bold">Change Password</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                  {[
                    [
                      "Current Password",
                      "currentPassword",
                      showCurrentPassword,
                      setShowCurrentPassword,
                    ],
                    [
                      "New Password",
                      "newPassword",
                      showNewPassword,
                      setShowNewPassword,
                    ],
                    [
                      "Confirm Password",
                      "confirmPassword",
                      showConfirmPassword,
                      setShowConfirmPassword,
                    ],
                  ].map(([label, field, show, setter]) => (
                    <div key={field} className="space-y-1">
                      <label className="text-sm font-semibold text-base-content">
                        {label}
                      </label>

                      <div className="relative">
                        <input
                          type={show ? "text" : "password"}
                          value={passwordData[field]}
                          onChange={(e) =>
                            handlePasswordChange(field, e.target.value)
                          }
                          className="input input-bordered w-full pr-11 rounded-xl bg-base-200/60 focus:ring-2 focus:ring-primary/30 transition"
                        />

                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-primary transition"
                          onClick={() => setter(!show)}
                          tabIndex={-1}
                        >
                          {show ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Info */}
                  <div className="flex items-start gap-2 text-sm bg-info/10 border border-info/20 rounded-xl p-4">
                    <AlertTriangle size={16} className="mt-0.5 text-info" />
                    <p className="text-base-content/70">
                      Password must be at least <strong>8 characters</strong>.
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 pt-0 border-t border-base-200">
                  <button
                    className="btn btn-ghost"
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="btn btn-primary px-6"
                    onClick={handlePasswordSubmit}
                  >
                    Update Password
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              className="relative bg-base-100 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-base-200">
                <h3 className="text-lg font-bold">Profile Photo</h3>
              </div>

              {/* Image preview */}
              <div className="p-6 flex flex-col items-center gap-5">
                <div className="relative">
                  <img
                    src={userInfo.profileImageUrl || profile}
                    alt="Profile Large"
                    className="w-56 h-56 rounded-full object-cover border-4 border-base-200 shadow-lg"
                  />

                  {uploadingImage && (
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                      <span className="loading loading-spinner loading-lg text-white"></span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 w-full">
                  <button
                    className="btn btn-primary flex-1 gap-2"
                    onClick={handleProfilePicClick}
                  >
                    <Camera size={16} />
                    Change Photo
                  </button>
                </div>

                <p className="text-xs text-base-content/60 text-center">
                  JPG, PNG or WEBP • Max 5MB
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalInfo;
