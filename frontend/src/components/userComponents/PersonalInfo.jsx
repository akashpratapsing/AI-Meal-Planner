import React, { useState } from 'react';
import { Edit, Save, X, Lock, Eye, EyeOff, User, Mail, Calendar, Users, Ruler, Weight, Heart, Utensils, AlertTriangle } from 'lucide-react';

const PersonalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    sex: 'Male',
    height: '5\'10"',
    weight: '165 lbs',
    religion: 'Christianity',
    dietaryPreference: 'Vegetarian',
    allergies: 'Nuts, Shellfish'
  });

  const [editedInfo, setEditedInfo] = useState({ ...userInfo });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editedInfo });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo({ ...userInfo });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    
    // Here you would typically send the password change request to your backend
    alert('Password changed successfully!');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const sexOptions = ['Male', 'Female', 'Other', 'Prefer not to say'];
  const dietaryOptions = ['None', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Gluten-free', 'Dairy-free'];
  const religionOptions = ['Christianity', 'Islam', 'Judaism', 'Hinduism', 'Buddhism', 'Other', 'Prefer not to say'];

  const InfoField = ({ icon: Icon, label, value, field, type = 'text', options = null }) => (
    <div className="form-control">
      <label className="label">
        <span className="label-text flex items-center gap-2">
          <Icon size={16} className="text-primary" />
          {label}
        </span>
      </label>
      {isEditing ? (
        options ? (
          <select 
            className="select select-bordered w-full"
            value={editedInfo[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          >
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            className="textarea textarea-bordered"
            value={editedInfo[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows={2}
          />
        ) : (
          <input
            type={type}
            className="input input-bordered w-full"
            value={editedInfo[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        )
      ) : (
        <div className="input input-bordered w-full bg-base-200 cursor-not-allowed">
          {value || 'Not specified'}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-full mx-auto p-4">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-6">
            <h2 className="card-title text-2xl">Personal Information</h2>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button 
                    className="btn btn-success btn-sm"
                    onClick={handleSave}
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={handleCancel}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={handleEdit}
                >
                  <Edit size={16} />
                  Edit
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField 
              icon={User} 
              label="Full Name" 
              value={userInfo.name} 
              field="name" 
            />
            <InfoField 
              icon={Mail} 
              label="Email" 
              value={userInfo.email} 
              field="email" 
              type="email" 
            />
            <InfoField 
              icon={Calendar} 
              label="Age" 
              value={userInfo.age} 
              field="age" 
              type="number" 
            />
            <InfoField 
              icon={Users} 
              label="Sex" 
              value={userInfo.sex} 
              field="sex" 
              options={sexOptions} 
            />
            <InfoField 
              icon={Ruler} 
              label="Height" 
              value={userInfo.height} 
              field="height" 
            />
            <InfoField 
              icon={Weight} 
              label="Weight" 
              value={userInfo.weight} 
              field="weight" 
            />
            <InfoField 
              icon={Heart} 
              label="Religion" 
              value={userInfo.religion} 
              field="religion" 
              options={religionOptions} 
            />
            <InfoField 
              icon={Utensils} 
              label="Dietary Preference" 
              value={userInfo.dietaryPreference} 
              field="dietaryPreference" 
              options={dietaryOptions} 
            />
          </div>

          <div className="mt-4">
            <InfoField 
              icon={AlertTriangle} 
              label="Allergies" 
              value={userInfo.allergies} 
              field="allergies" 
              type="textarea" 
            />
          </div>

          <div className="divider"></div>

          <div className="card-actions justify-center">
            <button 
              className="btn btn-outline btn-warning"
              onClick={() => setShowPasswordModal(true)}
            >
              <Lock size={16} />
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    className="input input-bordered w-full pr-10"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="input input-bordered w-full pr-10"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="input input-bordered w-full pr-10"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="alert alert-info">
                <AlertTriangle size={16} />
                <span>Password must be at least 8 characters long</span>
              </div>
            </div>

            <div className="modal-action">
              <button 
                className="btn btn-success"
                onClick={handlePasswordSubmit}
                disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
              >
                Update Password
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;