import type { Person, Project } from "@/types/project";

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
}

function daysAgo(d: number): string {
  return hoursAgo(d * 24);
}

export const PEOPLE: Person[] = [
  { id: "admin_1", name: "Malek Cherif", role: "admin", initials: "MC", colorSeed: 1 },

  { id: "editor_1", name: "Youssef Amri", role: "editor", initials: "YA", colorSeed: 2 },
  { id: "editor_2", name: "Nour Sassi", role: "editor", initials: "NS", colorSeed: 3 },
  { id: "editor_3", name: "Aziz Kefi", role: "editor", initials: "AK", colorSeed: 4 },
  { id: "editor_4", name: "Rim Bouazizi", role: "editor", initials: "RB", colorSeed: 5 },

  { id: "client_1", name: "Dorra Haddad", role: "client", initials: "DH", colorSeed: 6 },
  { id: "client_2", name: "Sami Trabelsi", role: "client", initials: "ST", colorSeed: 7 },
  { id: "client_3", name: "Wael Jendoubi", role: "client", initials: "WJ", colorSeed: 8 },
  { id: "client_4", name: "Emna Riahi", role: "client", initials: "ER", colorSeed: 9 },
  { id: "client_5", name: "Karim Mejri", role: "client", initials: "KM", colorSeed: 10 },
  { id: "client_6", name: "Lina Bahri", role: "client", initials: "LB", colorSeed: 11 },
];

export function getPerson(id: string | null): Person | undefined {
  if (!id) return undefined;
  return PEOPLE.find((p) => p.id === id);
}

function sourceFiles(names: [string, number][], baseHoursAgo: number) {
  return names.map(([name, sizeKb], i) => ({
    id: `sf_${name.replace(/\W+/g, "")}_${i}`,
    name,
    sizeKb,
    uploadedAt: hoursAgo(baseHoursAgo + i),
  }));
}

function deliverables(names: [string, number][], baseHoursAgo: number) {
  return names.map(([name, sizeKb], i) => ({
    id: `dv_${name.replace(/\W+/g, "")}_${i}`,
    name,
    sizeKb,
    uploadedAt: hoursAgo(baseHoursAgo - i),
  }));
}

export function buildSeedProjects(): Project[] {
  return [
    // ---- PENDING ----
    {
      id: "p_001",
      title: "Vid 68 - who am i without my sport?",
      clientId: "client_1",
      editorId: null,
      stage: "pending",
      instructions:
        "Documentary-style edit. Open on the empty stadium at dawn, voiceover starts 8 seconds in. Keep pacing slow for the first minute, then pick up tempo once training montage starts. No text overlays except the title card. Color grade should feel desaturated and cold until the final act, then warm up.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/sport-identity-script",
      },
      sourceFiles: sourceFiles(
        [
          ["stadium_dawn_4k.mov", 812_000],
          ["interview_raw_01.mov", 1_340_000],
          ["training_montage_b_roll.zip", 2_210_000],
        ],
        3
      ),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: 3,
      comments: [],
      createdAt: hoursAgo(3),
    },
    {
      id: "p_002",
      title: "EP 21: MBA Meaningless",
      clientId: "client_2",
      editorId: null,
      stage: "pending",
      instructions:
        "Podcast cutdown into a 12 minute highlight reel. Keep the debate segment about ROI intact, it's the strongest part. Captions burned in, our usual style. Add the intro bumper from the brand kit.",
      script: null,
      sourceFiles: sourceFiles([["ep21_full_recording.mp4", 4_120_000]], 6),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: hoursAgo(6),
    },
    {
      id: "p_003",
      title: "Product launch teaser - Aura V2",
      clientId: "client_3",
      editorId: null,
      stage: "pending",
      instructions:
        "15 second vertical teaser for Instagram and TikTok. Fast cuts, product hero shots first 3 seconds. Use the track we licensed last month, file is in the source folder. End card must show launch date exactly as written in the script.",
      script: {
        type: "text",
        content:
          "[0-3s] Macro shots of the device powering on.\n[3-8s] Quick cuts of hands using it in different settings.\n[8-12s] Logo reveal with tagline 'See further.'\n[12-15s] Launch date end card: 10.14.",
      },
      sourceFiles: sourceFiles(
        [
          ["aura_v2_hero_shots.mov", 980_000],
          ["licensed_track.wav", 42_000],
        ],
        1
      ),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: 5,
      comments: [],
      createdAt: hoursAgo(1),
    },
    {
      id: "p_004",
      title: "Wedding highlight - Sana & Fares",
      clientId: "client_4",
      editorId: null,
      stage: "pending",
      instructions:
        "5-7 minute highlight film. Ceremony first, then reception. Please use the acoustic version of their first dance song for the outro montage, it's in the shared drive under 'audio'.",
      script: null,
      sourceFiles: [],
      deliverablesTotal: 1,
      deliverables: [],
      revisionsUsed: 0,
      revisionsMax: 2,
      comments: [],
      createdAt: daysAgo(1),
    },

    // ---- IN PROGRESS ----
    {
      id: "p_005",
      title: "Vid 71 - the discipline nobody sees",
      clientId: "client_1",
      editorId: "editor_1",
      stage: "in_progress",
      instructions:
        "Companion piece to Vid 68. Same visual language, cold grade, warm resolve. This one is about the recovery process, so lean into close-ups: ice baths, physio, quiet moments. Voiceover already recorded, sits in source files.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/discipline-script-v2",
      },
      sourceFiles: sourceFiles(
        [
          ["recovery_bts_4k.mov", 1_640_000],
          ["voiceover_final.wav", 88_000],
        ],
        20
      ),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: 3,
      comments: [],
      createdAt: hoursAgo(20),
    },
    {
      id: "p_006",
      title: "Weekly recap #44",
      clientId: "client_2",
      editorId: "editor_2",
      stage: "in_progress",
      instructions:
        "Standard weekly format, 8 minutes max. Use the new lower-third template, brand kit was updated Monday. Sponsor read goes at the 3 minute mark, script attached.",
      script: {
        type: "text",
        content:
          "Sponsor read (verbatim): 'This episode is brought to you by Fleximo. Fleximo helps small teams manage payroll without the spreadsheets...' Full copy in shared drive.",
      },
      sourceFiles: sourceFiles([["recap44_raw.mp4", 3_020_000]], 14),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: hoursAgo(14),
    },
    {
      id: "p_007",
      title: "Brand film - Kalimtu origin story",
      clientId: "client_5",
      editorId: "editor_3",
      stage: "in_progress",
      instructions:
        "3 minute brand film. Founder interview is the spine, cut b-roll around the key quotes. Subtitles in both English and Arabic, two separate exports please.",
      script: null,
      sourceFiles: sourceFiles(
        [
          ["founder_interview.mov", 2_880_000],
          ["office_broll_pack.zip", 1_120_000],
          ["archive_photos.zip", 340_000],
        ],
        30
      ),
      deliverables: [],
      deliverablesTotal: 2,
      revisionsUsed: 0,
      revisionsMax: 4,
      comments: [],
      createdAt: daysAgo(2),
    },
    {
      id: "p_008",
      title: "Vid 72 - injury comeback part 1",
      clientId: "client_1",
      editorId: "editor_1",
      stage: "in_progress",
      instructions:
        "Series opener, 3-part arc. This part covers the injury itself and diagnosis. Keep it heavy, minimal music, let silence do the work in the hospital scenes.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/comeback-part1-script",
      },
      sourceFiles: sourceFiles([["hospital_footage.mov", 1_990_000]], 9),
      deliverables: [],
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: 3,
      comments: [],
      createdAt: hoursAgo(9),
    },

    // ---- ADMIN APPROVED ----
    {
      id: "p_009",
      title: "EP 19: Bootstrapped to 7 figures",
      clientId: "client_2",
      editorId: "editor_2",
      stage: "admin_approved",
      instructions:
        "Full episode edit with chapter markers. Guest wants the intro trimmed, he rambles for the first 90 seconds, cut straight to the hook.",
      script: null,
      sourceFiles: sourceFiles([["ep19_full.mp4", 3_640_000]], 40),
      deliverables: deliverables([["ep19_final_cut_v1.mp4", 2_910_000]], 4),
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: daysAgo(3),
    },
    {
      id: "p_010",
      title: "Product demo - Fleximo dashboard walkthrough",
      clientId: "client_3",
      editorId: "editor_4",
      stage: "admin_approved",
      instructions:
        "Screen recording cleanup, add zoom-ins on key UI moments, brand intro/outro from kit. Keep it under 4 minutes for the landing page embed.",
      script: {
        type: "text",
        content: "Full walkthrough narration script is pinned in the project brief doc.",
      },
      sourceFiles: sourceFiles([["dashboard_screen_recording.mp4", 1_480_000]], 26),
      deliverables: deliverables([["fleximo_demo_v1.mp4", 640_000]], 2),
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: 5,
      comments: [],
      createdAt: daysAgo(2),
    },
    {
      id: "p_011",
      title: "Vid 65 - the mental game",
      clientId: "client_1",
      editorId: "editor_1",
      stage: "admin_approved",
      instructions:
        "Sports psychology angle, talking head plus archival match footage. Standard grade for this series.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/mental-game-script",
      },
      sourceFiles: sourceFiles([["talking_head_interview.mov", 2_010_000]], 50),
      deliverables: deliverables([["mental_game_v1.mp4", 1_760_000]], 6),
      deliverablesTotal: 1,
      revisionsUsed: 1,
      revisionsMax: 3,
      comments: [],
      createdAt: daysAgo(4),
    },

    // ---- CLIENT REVIEW ----
    {
      id: "p_012",
      title: "Real estate walkthrough - Marina Residence",
      clientId: "client_6",
      editorId: "editor_4",
      stage: "client_review",
      instructions:
        "Drone opening shot into interior walkthrough. Upbeat but not cheesy music. 90 second cut for social, 3 minute cut for the listing site.",
      script: null,
      sourceFiles: sourceFiles(
        [
          ["drone_exterior.mov", 2_240_000],
          ["interior_walkthrough.mov", 1_880_000],
        ],
        60
      ),
      deliverables: deliverables(
        [
          ["marina_social_cut.mp4", 210_000],
          ["marina_listing_cut.mp4", 480_000],
        ],
        18
      ),
      deliverablesTotal: 2,
      revisionsUsed: 0,
      revisionsMax: 3,
      comments: [],
      createdAt: daysAgo(5),
    },
    {
      id: "p_013",
      title: "EP 20: Why most agencies fail",
      clientId: "client_2",
      editorId: "editor_2",
      stage: "client_review",
      instructions: "Standard episode format. Cut the tangent about tax law, keep everything else.",
      script: null,
      sourceFiles: sourceFiles([["ep20_full.mp4", 3_310_000]], 70),
      deliverables: deliverables([["ep20_final_v1.mp4", 2_680_000]], 12),
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: daysAgo(6),
    },

    // ---- REVISION ----
    {
      id: "p_014",
      title: "Vid 70 - the comeback game tape",
      clientId: "client_1",
      editorId: "editor_1",
      stage: "revision",
      instructions:
        "Game footage breakdown with coach commentary overlaid. Client flagged a few timing issues on the graphics.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/comeback-tape-script",
      },
      sourceFiles: sourceFiles([["game_tape_full.mov", 2_760_000]], 96),
      deliverables: deliverables([["comeback_tape_v2.mp4", 2_140_000]], 30),
      deliverablesTotal: 1,
      revisionsUsed: 2,
      revisionsMax: 3,
      comments: [
        {
          id: "c_001",
          authorId: "admin_1",
          authorRole: "admin",
          timecode: "00:42",
          text: "Score graphic overlaps the coach's face here, push it to the lower third.",
          createdAt: daysAgo(2),
          resolved: true,
        },
        {
          id: "c_002",
          authorId: "client_1",
          authorRole: "client",
          timecode: "01:15",
          text: "Can we mute the crowd noise a bit under the commentary track? It's fighting the VO.",
          createdAt: daysAgo(2),
          resolved: false,
        },
        {
          id: "c_003",
          authorId: "client_1",
          authorRole: "client",
          timecode: "02:03",
          text: "This cut feels too fast, let the replay breathe for another second before the next angle.",
          createdAt: daysAgo(1),
          resolved: false,
        },
        {
          id: "c_004",
          authorId: "admin_1",
          authorRole: "admin",
          timecode: "02:40",
          text: "Agreed with client on the replay pacing, also check the audio ducking note above.",
          createdAt: daysAgo(1),
          resolved: false,
        },
        {
          id: "c_005",
          authorId: "editor_1",
          authorRole: "editor",
          timecode: "00:42",
          text: "Fixed, graphic moved and re-rendered.",
          createdAt: hoursAgo(20),
          resolved: true,
        },
      ],
      createdAt: daysAgo(8),
    },
    {
      id: "p_015",
      title: "Fleximo onboarding explainer",
      clientId: "client_3",
      editorId: "editor_4",
      stage: "revision",
      instructions:
        "Animated explainer for new user onboarding email. Voiceover already locked, do not change timing without approval.",
      script: {
        type: "text",
        content: "VO script locked in v3, see attached doc. Do not alter pacing.",
      },
      sourceFiles: sourceFiles([["explainer_assets.zip", 88_000]], 120),
      deliverables: deliverables([["explainer_v3.mp4", 96_000]], 40),
      deliverablesTotal: 1,
      revisionsUsed: 3,
      revisionsMax: 5,
      comments: [
        {
          id: "c_006",
          authorId: "client_3",
          authorRole: "client",
          timecode: "00:08",
          text: "Logo animation pops in too fast, ease it in over half a second.",
          createdAt: daysAgo(3),
          resolved: false,
        },
        {
          id: "c_007",
          authorId: "client_3",
          authorRole: "client",
          timecode: "00:31",
          text: "Wrong shade of blue on the button highlight, use the brand hex from the kit.",
          createdAt: daysAgo(3),
          resolved: false,
        },
      ],
      createdAt: daysAgo(10),
    },
    {
      id: "p_016",
      title: "Vid 66 - offseason training block",
      clientId: "client_1",
      editorId: null,
      stage: "revision",
      instructions: "Admin flagged pacing issues before this reaches the client, needs a re-cut of act two.",
      script: null,
      sourceFiles: sourceFiles([["training_block_raw.mov", 1_920_000]], 150),
      deliverables: deliverables([["offseason_v1.mp4", 1_640_000]], 60),
      deliverablesTotal: 1,
      revisionsUsed: 1,
      revisionsMax: 3,
      comments: [
        {
          id: "c_008",
          authorId: "admin_1",
          authorRole: "admin",
          timecode: "01:20",
          text: "Act two drags, cut the second gym montage down by half before this goes to the client.",
          createdAt: daysAgo(4),
          resolved: false,
        },
      ],
      createdAt: daysAgo(12),
    },

    // ---- APPROVED ----
    {
      id: "p_017",
      title: "EP 18: The founder tax",
      clientId: "client_2",
      editorId: "editor_2",
      stage: "approved",
      instructions: "Standard format. Approved on first pass, no notes.",
      script: null,
      sourceFiles: sourceFiles([["ep18_full.mp4", 3_120_000]], 200),
      deliverables: deliverables([["ep18_final.mp4", 2_540_000]], 190),
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: daysAgo(20),
    },
    {
      id: "p_018",
      title: "Vid 60 - the first tournament",
      clientId: "client_1",
      editorId: "editor_1",
      stage: "approved",
      instructions: "Series pilot. Set the visual template for the whole run.",
      script: {
        type: "link",
        content: "https://docs.google.com/document/d/first-tournament-script",
      },
      sourceFiles: sourceFiles([["tournament_footage.mov", 2_460_000]], 400),
      deliverables: deliverables([["first_tournament_final.mp4", 2_020_000]], 380),
      deliverablesTotal: 1,
      revisionsUsed: 1,
      revisionsMax: 3,
      comments: [],
      createdAt: daysAgo(30),
    },
    {
      id: "p_019",
      title: "Aura V1 launch recap",
      clientId: "client_3",
      editorId: "editor_3",
      stage: "approved",
      instructions: "Recap reel for the V1 launch, used as reference for V2 teaser tone.",
      script: null,
      sourceFiles: [],
      deliverables: deliverables([["aura_v1_recap_final.mp4", 310_000]], 500),
      deliverablesTotal: 1,
      revisionsUsed: 0,
      revisionsMax: "unlimited",
      comments: [],
      createdAt: daysAgo(45),
    },
    {
      id: "p_020",
      title: "Marina Residence - phase 1 listing video",
      clientId: "client_6",
      editorId: "editor_4",
      stage: "approved",
      instructions: "First of three listing videos for the Marina development.",
      script: null,
      sourceFiles: sourceFiles([["phase1_footage.mov", 1_760_000]], 260),
      deliverables: deliverables([["phase1_final.mp4", 620_000]], 250),
      deliverablesTotal: 1,
      revisionsUsed: 2,
      revisionsMax: 3,
      comments: [],
      createdAt: daysAgo(35),
    },
  ];
}
