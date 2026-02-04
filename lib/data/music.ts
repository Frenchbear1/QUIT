export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  category: 'worship' | 'modern-christian' | 'hymns' | 'instrumental' | 'victory';
  tags: string[];
  description?: string;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const withBase = (path: string) => (basePath ? basePath + path : path);


export const musicTracks: MusicTrack[] = [
  // Modern Worship - Powerful anthems for spiritual warfare
  {
    id: "m1",
    title: "Graves Into Gardens",
    artist: "Elevation Worship ft. Brandon Lake",
    url: withBase("/audio/Graves Into Gardens.m4a"),
    category: "worship",
    tags: ["transformation", "hope", "powerful"],
    description: "A declaration that God turns our worst into something beautiful."
  },
  {
    id: "m2",
    title: "Way Maker",
    artist: "Sinach / Leeland",
    url: withBase("/audio/Way Maker.m4a"),
    category: "worship",
    tags: ["breakthrough", "faith", "presence"],
    description: "When you feel stuck, remember He makes a way."
  },
  {
    id: "m3",
    title: "No Longer Slaves",
    artist: "Bethel Music ft. Jonathan David Helser",
    url: withBase("/audio/No Longer Slaves.m4a"),
    category: "worship",
    tags: ["freedom", "identity", "powerful"],
    description: "You are not a slave to this. You are a child of God."
  },
  {
    id: "m4",
    title: "Reckless Love",
    artist: "Cory Asbury",
    url: withBase("/audio/Reckless Love.m4a"),
    category: "worship",
    tags: ["love", "pursuit", "grace"],
    description: "His love chases you down, fights for you, leaves the 99."
  },
  {
    id: "m5",
    title: "Do It Again",
    artist: "Elevation Worship",
    url: withBase("/audio/Do It Again.m4a"),
    category: "worship",
    tags: ["faithfulness", "testimony", "hope"],
    description: "Remember what He's done before. He'll do it again."
  },
  {
    id: "m6",
    title: "Battle Belongs",
    artist: "Phil Wickham",
    url: withBase("/audio/Battle Belongs.m4a"),
    category: "victory",
    tags: ["warfare", "victory", "powerful"],
    description: "The battle is not yours. Give it to Him."
  },
  {
    id: "m7",
    title: "Surrounded (Fight My Battles)",
    artist: "UPPERROOM",
    url: withBase("/audio/Surrounded (Fight My Battles).m4a"),
    category: "victory",
    tags: ["warfare", "faith", "declaration"],
    description: "This is how I fight my battles - with worship."
  },
  {
    id: "m8",
    title: "King of Kings",
    artist: "Hillsong Worship",
    url: withBase("/audio/King of Kings.m4a"),
    category: "worship",
    tags: ["majesty", "victory", "powerful"],
    description: "Remember who your King is and what He overcame."
  },
  {
    id: "m9",
    title: "O Come to the Altar",
    artist: "Elevation Worship",
    url: withBase("/audio/O Come to the Altar.m4a"),
    category: "worship",
    tags: ["surrender", "grace", "healing"],
    description: "Leave your burdens at the cross. Come as you are."
  },
  {
    id: "m10",
    title: "Goodness of God",
    artist: "Bethel Music ft. Jenn Johnson",
    url: withBase("/audio/Goodness of God.m4a"),
    category: "worship",
    tags: ["faithfulness", "testimony", "gentle"],
    description: "All your life, His goodness has followed you."
  },

  // Modern Christian - Bold declarations and identity
  {
    id: "m11",
    title: "Who You Say I Am",
    artist: "Hillsong Worship",
    url: withBase("/audio/Who You Say I Am.m4a"),
    category: "modern-christian",
    tags: ["identity", "freedom", "declaration"],
    description: "Your identity is not your sin. You are who He says you are."
  },
  {
    id: "m12",
    title: "Tremble",
    artist: "Mosaic MSC",
    url: withBase("/audio/Tremble.m4a"),
    category: "modern-christian",
    tags: ["power", "authority", "warfare"],
    description: "Addictions tremble at the name of Jesus."
  },
  {
    id: "m13",
    title: "Rescue",
    artist: "Lauren Daigle",
    url: withBase("/audio/Rescue.m4a"),
    category: "modern-christian",
    tags: ["love", "rescue", "hope"],
    description: "He will rescue you. You are not alone."
  },
  {
    id: "m14",
    title: "Build My Life",
    artist: "Passion ft. Brett Younker",
    url: withBase("/audio/Build My Life.m4a"),
    category: "modern-christian",
    tags: ["surrender", "worship", "foundation"],
    description: "Build your life on something that won't crumble."
  },
  {
    id: "m15",
    title: "Living Hope",
    artist: "Phil Wickham",
    url: withBase("/audio/Living Hope.m4a"),
    category: "modern-christian",
    tags: ["hope", "resurrection", "powerful"],
    description: "Death couldn't hold Him. Neither can your chains."
  },
  {
    id: "m16",
    title: "What A Beautiful Name",
    artist: "Hillsong Worship",
    url: withBase("/audio/What A Beautiful Name.m4a"),
    category: "modern-christian",
    tags: ["power", "name", "worship"],
    description: "There is power in the name of Jesus to break every chain."
  },
  {
    id: "m17",
    title: "Promises",
    artist: "Maverick City Music",
    url: withBase("/audio/Promises.m4a"),
    category: "modern-christian",
    tags: ["faithfulness", "promises", "hope"],
    description: "God keeps His promises. Even when you break yours."
  },
  {
    id: "m18",
    title: "Jireh",
    artist: "Maverick City Music ft. Elevation Worship",
    url: withBase("/audio/Jireh.m4a"),
    category: "modern-christian",
    tags: ["provision", "peace", "presence"],
    description: "He is more than enough. More than what you're looking for."
  },
  {
    id: "m19",
    title: "Graves",
    artist: "Leeland",
    url: withBase("/audio/Graves.m4a"),
    category: "victory",
    tags: ["resurrection", "victory", "power"],
    description: "He walked out of the grave. You can walk out of this."
  },
  {
    id: "m20",
    title: "The Blessing",
    artist: "Kari Jobe & Cody Carnes",
    url: withBase("/audio/The Blessing.m4a"),
    category: "modern-christian",
    tags: ["blessing", "favor", "declaration"],
    description: "His blessing is on you. Let that sink in."
  },

  // Classic Hymns - Timeless truths
  {
    id: "m21",
    title: "Amazing Grace (My Chains Are Gone)",
    artist: "Chris Tomlin",
    url: withBase("/audio/Amazing Grace (My Chains Are Gone).m4a"),
    category: "hymns",
    tags: ["grace", "freedom", "classic"],
    description: "The chains are gone. You have been set free."
  },
  {
    id: "m22",
    title: "It Is Well With My Soul",
    artist: "Bethel Music",
    url: withBase("/audio/It Is Well With My Soul.m4a"),
    category: "hymns",
    tags: ["peace", "surrender", "classic"],
    description: "Whatever your circumstance, it is well with your soul."
  },
  {
    id: "m23",
    title: "How Great Thou Art",
    artist: "Carrie Underwood",
    url: withBase("/audio/How Great Thou Art.m4a"),
    category: "hymns",
    tags: ["majesty", "awe", "classic"],
    description: "Remember how great He is. Bigger than your struggle."
  },
  {
    id: "m24",
    title: "Great Is Thy Faithfulness",
    artist: "Carrie Underwood ft. CeCe Winans",
    url: withBase("/audio/Great Is Thy Faithfulness.m4a"),
    category: "hymns",
    tags: ["faithfulness", "morning", "classic"],
    description: "New every morning. His mercies never end."
  },
  {
    id: "m25",
    title: "Be Thou My Vision",
    artist: "Audrey Assad",
    url: withBase("/audio/Be Thou My Vision.m4a"),
    category: "hymns",
    tags: ["focus", "vision", "classic"],
    description: "Make Him your vision. Everything else fades."
  },
  {
    id: "m26",
    title: "Come Thou Fount",
    artist: "David Crowder Band",
    url: withBase("/audio/Come Thou Fount.m4a"),
    category: "hymns",
    tags: ["grace", "wandering", "classic"],
    description: "Prone to wander, Lord I feel it. Bind my heart to Thee."
  },
  {
    id: "m27",
    title: "Holy, Holy, Holy",
    artist: "Audrey Assad",
    url: withBase("/audio/Holy, Holy, Holy.m4a"),
    category: "hymns",
    tags: ["holiness", "reverence", "classic"],
    description: "He is holy. And He calls you to be holy too."
  },
  {
    id: "m28",
    title: "What A Friend We Have In Jesus",
    artist: "Lydia Walker",
    url: withBase("/audio/What A Friend We Have In Jesus.m4a"),
    category: "hymns",
    tags: ["friendship", "prayer", "classic"],
    description: "Take everything to God in prayer. He understands."
  },

  // Instrumental - Peace and clarity
  {
    id: "m29",
    title: "Piano Worship - Peaceful Prayer",
    artist: "Hillsong Instrumental",
    url: withBase("/audio/Piano Worship - Peaceful Prayer.m4a"),
    category: "instrumental",
    tags: ["peace", "prayer", "calm"],
    description: "No words needed. Just be still."
  },
  {
    id: "m30",
    title: "Soaking Worship",
    artist: "Bethel Music Instrumental",
    url: withBase("/audio/Soaking Worship.m4a"),
    category: "instrumental",
    tags: ["soaking", "presence", "long"],
    description: "Soak in His presence. Let the noise quiet down."
  },
  {
    id: "m36",
    title: "Beautiful Piano Worship",
    artist: "Instrumental Worship",
    url: withBase("/audio/Beautiful Piano Worship.m4a"),
    category: "instrumental",
    tags: ["peace", "prayer", "autoplay"],
    description: "Let this peaceful worship fill your mind as you open the app."
  },

  // Victory Songs - For the fight
  {
    id: "m31",
    title: "Raise A Hallelujah",
    artist: "Bethel Music",
    url: withBase("/audio/Raise A Hallelujah.m4a"),
    category: "victory",
    tags: ["warfare", "praise", "powerful"],
    description: "Raise a hallelujah in the presence of your enemies."
  },
  {
    id: "m32",
    title: "See A Victory",
    artist: "Elevation Worship",
    url: withBase("/audio/See A Victory.m4a"),
    category: "victory",
    tags: ["faith", "victory", "declaration"],
    description: "The battle's already won. See a victory before it comes."
  },
  {
    id: "m33",
    title: "Lion",
    artist: "Elevation Worship ft. Chris Brown & Brandon Lake",
    url: withBase("/audio/Lion.m4a"),
    category: "victory",
    tags: ["power", "warfare", "bold"],
    description: "The Lion of Judah has already won."
  },
  {
    id: "m34",
    title: "Resurrecting",
    artist: "Elevation Worship",
    url: withBase("/audio/Resurrecting.m4a"),
    category: "victory",
    tags: ["resurrection", "power", "worship"],
    description: "Death could not hold Him. Your sin cannot define you."
  },
  {
    id: "m35",
    title: "Champion",
    artist: "Bethel Music ft. Dante Bowe",
    url: withBase("/audio/Champion.m4a"),
    category: "victory",
    tags: ["victory", "identity", "powerful"],
    description: "When He satisfies, nothing else is needed."
  }
];

export const musicCategories = [
  { id: "all", label: "All" },
  { id: "worship", label: "Worship" },
  { id: "modern-christian", label: "Modern" },
  { id: "victory", label: "Victory" },
  { id: "hymns", label: "Hymns" },
  { id: "instrumental", label: "Instrumental" }
];

// The track that auto-plays when the app opens
export const autoplayTrack = musicTracks.find(t => t.id === "m36") || musicTracks[0];
