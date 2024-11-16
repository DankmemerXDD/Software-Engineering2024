import { useEffect, useState } from 'react';

// Definer typen for profildata
interface ProfileData {
  name: string;
  image?: string;
  membership?: string;
  iotDevices?: string[];
}

export const useProfile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('Sender forespørsel om profildata...');
        const username = localStorage.getItem('username');
        console.log('Brukernavn hentet fra localStorage:', username); // Debug line to see the value
    
        const response = await fetch('http://localhost:6969/profile', {
          headers: {
            'x-username': username || '' // Ensure a value is set here
          }
        });
    
        if (response.ok) {
          console.log('Profildata mottatt fra serveren');
          const data: ProfileData = await response.json();
          setProfileData(data);
        } else {
          const errorText = await response.text();
          console.error(`Server error: ${response.status} - ${errorText}`);
          setError('Kunne ikke hente profildata: Serverfeil');
        }
      } catch (error) {
        console.error('Nettverksfeil ved henting av profildata:', error);
        setError('Kunne ikke hente profildata: Nettverksfeil');
      }
    };
    
  
    fetchProfileData();
  }, []);
  
  

  // Returner profildata og eventuelle feil for å kunne brukes i komponenter
  return { profileData, error };
};
