import React from 'react';
import { useProfile } from '../hooks/useProfile';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const { profileData, error } = useProfile();

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-section">
      <h2>Profil</h2>
      {profileData.image && (
        <div className="profile-image">
          <img src={profileData.image} alt={`${profileData.name}'s profile`} />
        </div>
      )}
      <div className="profile-info">
        <div className="info-item">
          <span className="label">Navn:</span>
          <span className="value">{profileData.name}</span>
        </div>
        {profileData.membership && (
          <div className="info-item">
            <span className="label">Medlemskap:</span>
            <span className="value">{profileData.membership}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
