import { Track, Playlist, Artist, ChartItem } from './types';

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'track-1',
    title: 'Starboy (Deluxe)',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy Deluxe Edition',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtKI1OnLjVRLLmM9m3vGmU-GQqm_88wrOmy6ZP9oerblGDqvdy4G4539XDyc2VfGvTzohlcJM6yoiBTGMtiB_Jh5B6A-SeQ28VkT_ssIUxp8KUlq0xwrB9sONzGeLS-625T0F2FkNF5FHP0aCkMumirdxAdq6G11D3GnsvlaYzXIysFJYu8UIhZbq6xaJXaYRfsLfxKr1Xj9stSSNbDzTXUPjKoHJ0ig92HWshOdnEGvFqXVrCtIAiKg',
    duration: 230,
    bpm: 174,
    badge: 'NOW',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: true,
  },
  {
    id: 'track-2',
    title: 'Genesis (Apex Cut)',
    artist: 'Justice, Lando Norris Edit',
    album: 'Circuit Telemetry Vol. 1',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrlB8-M4ws6QYLw88H5DuenIKhAtmb_HxLhD4NMqngb__aWJqu2CIfVbBDPb6n6xZXknsA-ruC1ncUBIiOqArmwBes1hj6A9i1LbFeqnevz6OFM5tw7KEn_BzHpKpfSqN9ZXZQ0IpbqMKSiOrxBp1R0cecRHbhe_1axl3X7fwH4miUBjRAa6TiorRrFsaYnMBXlCY0Y_gr9wipO_f4KXuqvEqogMXoeyjvUkDKamppJzZ8ljhATYBhTw',
    duration: 215,
    bpm: 180,
    badge: 'MASTER',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: false,
  },
  {
    id: 'track-3',
    title: 'Formula Fast Lane',
    artist: 'Fred again.., Skrillex',
    album: 'Monza Speed Session',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6YgcpN5Z_rziNsSg0xngSPFjqBTeC4LY-0EzjOVju8h_W6sTQkwCnJ54Dm-0UbzavVwuuinoBhug2nwLD0SMudIlm_IdCcluU6gx0xIf9VA3ESAlpJvjg06eLyV9KokyJg2Ljth2mogagtUnOBW3oe9EBv895hB9N10SfeZtYfoBqb5Li0J7iohEZW8aIeyuwH7WofHYZ6Rhs4yHHNWWZwHdVliM1JS20AJ4TXinz5q1SROMR1ZovFg',
    duration: 198,
    bpm: 165,
    badge: 'HQ',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: true,
  },
  {
    id: 'track-4',
    title: 'Apex Overtake',
    artist: 'Sub Focus, Dimension',
    album: 'Overdrive Kinetics',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnrhJNw3Wheal4RwS0GlevOMlJB-TwycLE6j_kVzWmnvfVRRxs4vuJVq9YqjJ1Te1rOcraJcF6Zu3Nfe2gDuU8m7ghiVYuSdznIryPgWSTjZaJO52GinWizsDILnJwagFPGJDXekhdNYTkoFaNDTYtOHB2G6FT0lTakmbSj4WKSwiKRADa6eC_I45rmqyEIJZ4ASAJw3YmNqJHoEY_1M3KNZAj7_9w-LZ6-xithrtDyDPHRryp1XizCQ',
    duration: 242,
    bpm: 174,
    badge: 'DRS',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: false,
  },
  {
    id: 'track-5',
    title: 'Midnight Apex (Interlagos Cut)',
    artist: 'Kavinsky, Gesaffelstein',
    album: 'Night Grand Prix',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-f4WitaYCvq5YpuKRTCUaWgx0JfR8Bdlx2XrjgXzM6nD85NqJGl1Stbtjltv3nd7saibTtYvdUHavKRvZRnU2fGwo-NUaE4N5DJBxm_VElXmwY_Ppi9asYF0OFS35790XYpaI21d5syDroKqo4rwXGL8IEZ_pGkaIytb7rczzPCl6eyj-9tXi4tLWQN6tZGoqKKMGdA9lncHVzLtqMNFK-8bBPNdpOie9fhxr6fwtAU26J-rfdkXg9A',
    duration: 260,
    bpm: 140,
    badge: 'QUALY',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: true,
  },
  {
    id: 'track-6',
    title: 'R U Mine? (Overdrive Mix)',
    artist: 'Arctic Monkeys',
    album: 'AM Paddock Sessions',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVehAeq2zwRu3mDGBxIN4HUR-g9OMYe0KClljgOMC2LMuOfRIgmoKdJOZR6C9z_rhntsO5qJ0NLWMjcVHpfowyVy4hjTIuieDeH6_DapcMCc4casW-Uons54PYyU-9Z5ArozQg2TBI6SoQ6rJwmoMRf_ktH-hbCV5LbFN90vz-nJTevUI28re0oG3QR8bivmWbvUVY5vhh4q5EIb0KLynaoGZ8h-XLGmcSfd2NaAJhSARpkk-8J_Mqg',
    duration: 201,
    bpm: 155,
    badge: 'CLASSIC',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: false,
  },
  {
    id: 'track-7',
    title: 'Pit Lane Rain (Recovery Session)',
    artist: 'Tycho, Bonobo',
    album: 'Cool Down // Pit',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG6CLxDWd9geVwwdi48gAXlT_c8n9X_heT8KAfIOA32ZpbrDBiJVa4iJLkxmgomYB3gC640zP0jeCcFBPZ2rkKbgCHVCqyRIWwqwxUZMJVjJ3l1C_u6QJPLYFL-F8jJIviRqORvbOY0ifG1DauL_GVFBLANJpkzcsyBWCeln44DRhqnCjZHmQKiIoqRINoQDvxN7mkjhZ6YySEWuoMzaaJcFCfDFzAInudPaFvu9l1kJnSfbCIjU0B3Q',
    duration: 275,
    bpm: 110,
    badge: 'LO-FI',
    isLossless: true,
    sampleRate: '96.0 KHZ FLAC',
    isLiked: true,
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: 'pl-liked',
    title: 'MÚSICAS CURTIDAS',
    subtitle: 'FAVORITOS // APEX • 1.428 FAIXAS',
    coverUrl: '', // uses crimson gradient
    trackCount: 1428,
    category: 'mix',
    badge: '#PIN'
  },
  {
    id: 'pl-starboy',
    title: 'STARBOY (DELUXE)',
    subtitle: 'THE WEEKND • DAFT PUNK',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtKI1OnLjVRLLmM9m3vGmU-GQqm_88wrOmy6ZP9oerblGDqvdy4G4539XDyc2VfGvTzohlcJM6yoiBTGMtiB_Jh5B6A-SeQ28VkT_ssIUxp8KUlq0xwrB9sONzGeLS-625T0F2FkNF5FHP0aCkMumirdxAdq6G11D3GnsvlaYzXIysFJYu8UIhZbq6xaJXaYRfsLfxKr1Xj9stSSNbDzTXUPjKoHJ0ig92HWshOdnEGvFqXVrCtIAiKg',
    bpm: 174,
    badge: 'NOW PLAYING',
    category: 'mix'
  },
  {
    id: 'pl-top-brasil',
    title: 'TOP BRASIL CIRCUITO',
    subtitle: 'RANKING NACIONAL #01 • CIRCUITO 50',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAReUqlMsRxUrDNUo_x-6lmZMgtENUF6n-f_IvBwosaetp2-Ad2eeJlyLyp3NAmhheN1qxtge_3m5HldqQLr7iQ7VIAv_YWZCLbzDSUtNubpmlSOgdyakH9BOyfjpeh_jh-qfsqHgdtY7TbGtCesdC540--4PEGoUQd2sc8JRA_65vs_OwzsKTNrYDK4NIMyKA_dR6j2zg0Jc3aPnzTqMxcVylA4xBH6fa_pa7iS-la1-EefOOcQrKMnA',
    badge: 'CHART 01',
    category: 'chart'
  },
  {
    id: 'pl-daily-1',
    title: 'DAILY MIX 01 // OVERDRIVE',
    subtitle: 'THE WEEKND, DAFT PUNK, TRAVIS SCOTT',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfGZjRnJNHw7NacbQqwcDw-cCKmtrPBWavVbm3p-aBZUJQiHSGgw9S8UVmZOKLrH3ivCZBPdyXx8T0F2QKKBKnYy5WJVN93o9dvCsaKHVNRsOWRAMI_MkTlycbtWT4aSKvZRl6Ox1YcSfWAV2BEg9LFJSsi5UO-eU8GZD3-wo6fiM9bbBlrXUcgCtgTHaRkW9Lc3B4sl3njIySLCticTcg_R1mzJXDqJLy_-M2-3EWBZYX9YPwHmi4YQ',
    bpm: 174,
    badge: '174 BPM',
    category: 'mix'
  },
  {
    id: 'pl-radar',
    title: 'RADAR TELEMETRIA',
    subtitle: 'DISCOVERY // ATUALIZADO HOJE',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbHnVD9REhAPLeTGNkLsyswYerzYnRfCL1eLc3jCIjUs2rg32iP8uQAJtHjvVYCQw9xsytq7B7qVahYTvZk7Xl-I65d8QfH9YwF9M0h8ZKjhrHp-017K7A-ilpyXBWSSq-PBod2IhR3qHITvn-LBoH2HUkETayTDWjAtJFs8679H50rYq4npApJTLazf-kemqxorVjGH1QMwkcWjPUoZnum_TQpXO6fBDkBGwYK7jOtcRVhkKv68io5w',
    badge: 'NEW LAP',
    category: 'radar'
  },
  {
    id: 'pl-synthwave',
    title: 'SYNTHWAVE NIGHTS',
    subtitle: 'NOCTURNAL // APEX FOCUS',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvIeB_P58TCqddwy1k2mXiOUuCxCr2GAm0J1Js5DoFo65FfyppDG1QHv0KgyxIAAlOSQpLE5mh8q5m39qOOT6nTzMfKH6jF1MZnF_-MfR2YW_OBVbnZKBBXnQZgdtQqLJyc91Ah06MX2VC7-xhWGcIviXG4f4msPF9AnKSNvZo5erc2DMD55PGmROLN67NcfH8bA2d-1xJqsZDUdr5U2ncozJ6oEquGzU00ghmG9Bd_jWLb8YiHeADhg',
    badge: 'NIGHT GP',
    category: 'mix'
  },
  {
    id: 'pl-rock',
    title: 'ROCK CLASSICS APEX',
    subtitle: 'HEAVY OCTANE & RIFFS',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB48y9wgYPuaXqf1BD-x0YmFJ52Vm9zplxNgYh7ZY_2IhEw4ZmG3K8jORPkX49BCcIBvhLqWZ4kKx_OBph-irpjzkDCEww5pmZ_UsiyUh5MO_0XGiNnS1EPZdJhijagy3dJY_PWmJ8TLC2TSOzFGXTBHwKbKD-8bgivo-Zt_KkFk7piWNGI_HKsXeslZHAD0OToZ7ef3eMuuCy4lowZ9alZJgtCnZyJhXmrY5KvO4IlJu5QM2rgk0KaKA',
    badge: 'CLASSIC',
    category: 'mix'
  },
  {
    id: 'pl-lofi',
    title: 'COOL DOWN // PIT LANE',
    subtitle: 'LO-FI RECOVERY SESSIONS',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5JnHxQAiuTG0S2lbA5uXACGAVXiiFB8zNVkD_xZJqwYz6jLK-Ci5605MUBV4tOy_7VVkFeuq_njyh3kYDRVJnzXigFumNKxboEWw5TtHu8CiGA_myOoaUXO5S4gGxjqlAag_rNKuRcmQiLVnyNfYn0ORt5I7HZyaL-LqKG3h8DziDwB3S8gz_e89IaOkMehSxhpv3Mltx3UP7-gfvJbbseK_YCDSxNhoIcBE1Ny_GwRPfhkm2VNFlEg',
    badge: 'RECOVERY',
    category: 'chill'
  },
  {
    id: 'pl-daily-2',
    title: 'DAILY MIX 02',
    subtitle: 'ARCTIC MONKEYS, THE STROKES',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCznnVVjKmYZgiX7tTJ9X_VZpjWbugppfW4K5HQopPCFCiPpv1ZT96j3YFFPzMEJYfPWzsJSm-490vfYMgn70K6GU9-W_WNhyPvh8vUndmugK6ZZAVE395yoAFMPnErq8e173ImWMProNq277UxC1wU8a0ANxPqjUMylBm4ZkpCA1On1yiIfN55O_60C6LXuigFLkmRkUkGjPmzPqD2iW2Jt4vvgzfi9kYoYCGo7vyg3jJpXBpupUoJaw',
    badge: 'ALT ROCK',
    category: 'mix'
  },
  {
    id: 'pl-techno',
    title: 'NOITE ELETRÔNICA LN',
    subtitle: 'TECHNO HIPNÓTICO & CLUB APEX',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhkXLuDKxRoHTvloAjdUU-kfSRFVN3lrSGGV55u0mJLDhvOMfzC1VQotRIUUQKB5-XSwcGbTFjqg-pKJv2maik5fw_L18JZ_TV1E2XnLgcGuGqoG-7R8kMEQsvHEfzjov4BnD5Y4hlOovINvlqAriHb3V0LF1kaDCIspWbgElXVEw7Dd-0rq6q-4AsfRABwzVNJ01XDPD7D7YVVLNODHtdVBUcChmI4YYUiDQtbI-8rGFSjic5frNNqQ',
    bpm: 140,
    badge: '140 BPM',
    category: 'paddock'
  }
];

export const INITIAL_ARTISTS: Artist[] = [
  {
    id: 'art-1',
    name: 'THE WEEKND',
    role: 'POLE POSITION',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8NL3__v-Cy5u4WSIz7AZGZjaLFK4u4zR_nhwWyapHHKWvDVe9Qr0qZSxlTZf1y3I6l6F5qsapTq4c_DN1A5xrJfxRmxsNiVAo7-KOga3TkUgY2K93-o9phomFSht7ojGaaqUEC4zu8R9hH9LJs_Y5Wc2IQY0bsMlOsfgkucu0Rex9PG6qY1YLzlLxBNTSRDYNbltzUjAVVoKYzjpX0wwqSGDLN-0fLkvAZr02xApSfzQLRKfeouKACQ',
    gridRank: 'P1',
    followers: '108M'
  },
  {
    id: 'art-2',
    name: 'DAFT PUNK',
    role: 'LEGENDS ROW',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZfd3xGir4hW-4V69Tn5Aa44-izy__dn2zAsbb1SXfYW6hKBylPt-HmLxM6AIUkPeH5yUTPRZIriUhP-1eLZlDz8RtfC1kHjNywO4q0CniN0sajefqtssPyPEUDpgPgkAqX4SpBusDhtPI6k1Vmgh-vJsgS61iYlOZ1Jgq3NM5ms2u-nVTrykpQ-PQieFUz6U7VPBYjQINXNmSK2bF56vsTC0jWmV8TiuCUUh9arzB5RBBsXKl94eb2g',
    gridRank: 'TITAN',
    followers: '28M'
  },
  {
    id: 'art-3',
    name: 'METRO BOOMIN',
    role: 'BEAT ARCHITECT',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1Vt5-mBkCL4KmB4rBlKv-KPXtsRvFqyB7PeT2HYmS-lV8GslD1ixZIIdVQJvJV-CbaGCjFf9YUsBuX0CXR2urJaL_hxSnTLbjHVUcG03T8kldy2ejr8W-Z5q3oHL1ksDQTKuTO53ckJDFURhmq6CEuDxONiomtgejjreJ4Q8YKryfVZH9Mqb8axez1kxV3puNnuCuh2d_W4GOFvUX5n2Dh7hUcWc8ZkwzIcwAK3DE9BNHUFz9C1UgOg',
    gridRank: 'FASTEST LAP',
    followers: '45M'
  },
  {
    id: 'art-4',
    name: 'ARCTIC MONKEYS',
    role: 'SPEED ROCK',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-HMXpPRHPN3z9qxZfZ_4Wvb-iyhzr4fUJQy-lXl_XReve6RPf3T4-yKDnwoActOkeEPZIwDVqyonprwL68Wx7_Btd6pk1voG0XsVumJ-7_xPiIoKy0wDLBKXo8Edj1rBzmZteCyRg10Fq8v5Buuv_JiD_fzvEOrR9Y4RZ7IxunnwgDwrYR5jmdWEALsWmI7WrgA2-lgF_3aCd1WQ5OfcZUbTOi7w8nuHFj_IqLtuW_BUcOMGVEYyEzg',
    gridRank: 'CHICANE',
    followers: '52M'
  },
  {
    id: 'art-5',
    name: 'ALOK',
    role: 'BRAZIL BASS',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuoj8efgt4Aex6qWQfWaugTiCfvzhk_SBE2AmQwxTOQTMPj0IqNAcOUvGr45Y4G0a-wEcQ3dTR8P4N1jdMB5BGQpzmaPXBIfDd7aEe8t1pCxfxJuzY2_Tv7HH5BmqfLYEnUBNyh4QRmSuRxse5nI5NFjGuSKEnitZK3bVb99JstWBMcKURMD7DoJsDvstmD3nevaPKUn4Pgj85VmvGyG67ndUMbWM48mOjJq7b6AstJIKYQd-lNXdniw',
    gridRank: 'INTERLAGOS',
    followers: '29M'
  },
  {
    id: 'art-6',
    name: 'BILLIE EILISH',
    role: 'DARK POP APEX',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1dLHcCHmXTEDFdDslmQvPjiEmmvX0ut86L-d1dBOBIneaIrgYufbp6kIij9mVP5lXWZfSSGZvIgdMwbxIa8PjewthH8PBiSZZI7-ElG74u06MmIg_zetcD9rSY3KK3Oiy5hByeeQAUPVaBc98VsQUUrAwSBsqjiVvKhaPMC87l7TlcRofCvV6BfPCN6hP7kCIaG7AZS12xbuTNE7ipzT8QsfbbR4v2U02een-aYMdEQwN9fnGJjzHhA',
    gridRank: 'SECTOR 1',
    followers: '92M'
  }
];

export const INITIAL_CHARTS: ChartItem[] = [
  {
    id: 'ch-1',
    rank: '#01',
    title: 'TOP 50',
    region: 'BRASIL',
    tag: 'BRASIL RECORD',
    description: 'RELATÓRIO DIÁRIO • MAIS OUVIDAS',
    accentColor: '#dc143c'
  },
  {
    id: 'ch-2',
    rank: '#W1',
    title: 'TOP 50',
    region: 'GLOBAL',
    tag: 'GLOBAL APEX',
    description: 'RANKING PLANETÁRIO INTEGRADO',
    accentColor: '#ffffff'
  },
  {
    id: 'ch-3',
    rank: '#VIRAL',
    title: 'VIRAL 50',
    region: 'SPEED NET',
    tag: 'ACCELERATION',
    description: 'RADAR DE TENDÊNCIAS INSTANTÂNEAS',
    accentColor: '#ffe600'
  },
  {
    id: 'ch-4',
    rank: '#LP',
    title: 'TOP ÁLBUNS',
    region: 'OVERALL',
    tag: 'DISCOGRAPHY',
    description: 'LANÇAMENTOS DISCOGRÁFICOS PRO',
    accentColor: '#ffffff'
  }
];

export const DRIVER_PORTRAIT_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlm05JfL0WnaHyMSS_4hY9EgUoNYFL1Ua4v0le1X6zTItnI2nRsCKMEFAzkdL3x8OeE348iOdLTWlpDG7Ebh0BzOtjoXTczkOdBfJrKkQdoIZisDO4tbD4Q6d08jhF7lty3D1jwETW9Xf73grz3nCLxB9PWbq_pbMm1w94gkgM_yvX9ohtjtqFeoCoNxp9rcBuHUOWNR9p_3FTiS4NCxA5VVHW28lcpmcNCa_ywC35AhGRUJCMFAyJ2g';
export const DRIVER_PORTRAIT_2_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTxh8RnCvquU9XGqp0jhzbw6nh7_1nHxkBL909QiY7TMvJsvlKvhEgjaaHiyCgJ9qwzavG7Sk9oT8Z68N8WmpbL2wkbhgeeGkYd_4ZOpR23x5YEE42LDYukd0qCsDVe-dWcRsUUrxqXEySv_KXYw0a5VrexPtPRZg3v6zgZcl2tF98KxsXWaJxZxVJG9P21KZelQnJ_J9inRx0yqUjvlVPuuvCuPc9kBCmMKvdCakOkvZrEY7C2vXp9g';
