export interface Props {
  userId: string;
}

export default async function getAllPlaylists(req: Request, props: Props) {
  const firstPlaylists = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=50`,
    {
      headers: {
        "Authorization":
          "Bearer BQCQ2v7-kMv4C_N6lLroTscJQ7Eb2AScV7bQ1D4ONfsHCbtEWHSN_dqQ4jrWnRHp3mYch3uJtg0ORepbqBj9xxR6-LgbvnE6GYOrWRuZQ1myy7P2tyDVC44qOAa8iNuC4OuK0iqozBQPoEvbD_SXAwWcHkxYwT_7UbIrS5dX-G7omeqDD9j9wiWPl85eagv8Xu6K2Pp1xkIvY8V3Z8YDWg",
      },
    },
  ).then((r) => r.json()) as PlaylistsResonse;

  const playlistNames = firstPlaylists.items.map((a) => {
    return { name: a.name, nSongs: a.tracks.total };
  });

  return { playlistNames };
}

export interface PlaylistsResonse {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: ItemType;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name: DisplayName;
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  type: OwnerType;
  uri: URI;
}

export enum DisplayName {
  EduardSuurküla = "Eduard Suurküla",
  ExplorerBarSantaTeresaRJ = "Explorer Bar | Santa Teresa, RJ",
  LeoTega = "Leo Tega",
  LucianoJúnior = "Luciano Júnior",
}

export enum ID {
  EdS = "ed.s",
  Explorerbar = "explorerbar",
  The12157096094 = "12157096094",
  The22Xsawpccwijyshm34H45Dsjq = "22xsawpccwijyshm34h45dsjq",
}

export enum OwnerType {
  User = "user",
}

export enum URI {
  SpotifyUser12157096094 = "spotify:user:12157096094",
  SpotifyUser22Xsawpccwijyshm34H45Dsjq =
    "spotify:user:22xsawpccwijyshm34h45dsjq",
  SpotifyUserEdS = "spotify:user:ed.s",
  SpotifyUserExplorerbar = "spotify:user:explorerbar",
}

export interface Tracks {
  href: string;
  total: number;
}

export enum ItemType {
  Playlist = "playlist",
}
