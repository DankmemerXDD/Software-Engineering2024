import db from '../db/db';

interface Device {
  name: string;
}

export const getProfileData = async (username: string) => {
  try {
    // Søk i `users`-tabellen etter brukeren
    const user = db.prepare('SELECT username AS name, image, membership FROM users WHERE username = ?').get(username);
    if (!user) {
      console.log(`Ingen data funnet for bruker: ${username}`);
      return null;
    }
    console.log(`Data funnet for bruker: ${username}`);

    let devices: Device[] = [];
    try {
      // Søk etter brukerens IoT-enheter i `devices`-tabellen
      devices = db.prepare('SELECT name FROM devices WHERE user_id = ?').all(username) as Device[];
    } catch (error) {
      if (error instanceof Error && error.message.includes('no such table')) {
        console.warn('Advarsel: Tabell for IoT-enheter eksisterer ikke. Returnerer tom liste.');
      } else {
        throw error; // Kaster andre typer feil videre
      }
    }

    return {
      ...user,
      iotDevices: devices.length > 0 ? devices.map((device) => device.name) : [] // Returner en tom liste hvis ingen enheter
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error('Feil i databaseforespørsel:', error.message);
    } else {
      console.error('Ukjent feil i databaseforespørsel:', error);
    }
    throw new Error('Kunne ikke hente brukerdata fra databasen');
  }
};
