import db from "#db/client";

import { createUser } from "#db/queries/users";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 3; i++) {
    await createUser("username " + i, "password"+i);
  }
  
  for (let i = 1; i <= 20; i++) {
    const owner_id = Math.floor(Math.random() * 2) + 1;
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description",owner_id);
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
