import { Context } from 'hono';
import { getProfileData } from '../service/profileService';

export const getProfile = async (c: Context) => {
    try {
      console.log('Mottar forespørsel om profildata');
      const username = c.req.header('x-username');
      console.log('Brukernavn mottatt i header:', username); // Debug line
  
      if (!username) {
        console.error('Feil: Ingen brukernavn i headeren');
        return c.json({ message: 'Ingen bruker funnet, ikke autorisert' }, 401);
      }
  
      console.log(`Henter profildata for bruker: ${username}`);
      const user = await getProfileData(username);
  
      if (!user) {
        console.error(`Feil: Bruker ${username} ble ikke funnet i databasen`);
        return c.json({ message: 'Bruker ikke funnet' }, 404);
      }
  
      return c.json(user);
    } catch (error) {
      console.error('Feil ved henting av profildata:', error);
      return c.json({ message: 'Serverfeil ved henting av profildata' }, 500);
    }
  };
  