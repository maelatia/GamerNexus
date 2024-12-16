import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import DatingAppCard from '../components/DatingAppCard';
import { useDatingApps } from '../services/datingAppsService';

const categoryData = {
  'gaming-pcs': {
    title: 'Gaming PCs',
    description: 'Top-rated gaming computers for every budget',
    products: [
      {
        title: "Alienware Aurora R15",
        description: "Premium gaming desktop with latest RTX 4090, perfect for high-end gaming and streaming.",
        rating: 4.5,
        reviews: 1250,
        sponsored: true,
        features: ["RTX 4090 Graphics", "Intel i9 Processor", "64GB RAM", "RGB Lighting", "Liquid Cooling", "2TB NVMe SSD"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/gaming-pcs/alienware-aurora-r15.webp',
        website: "https://www.dell.com/en-us/shop/alienware-aurora-r15-gaming-desktop/spd/alienware-aurora-r15"
      },
      {
        title: "ROG Strix G35CZ",
        description: "Powerful gaming rig with RTX 4080, designed for competitive gaming.",
        rating: 4.3,
        reviews: 856,
        features: ["RTX 4080 Graphics", "Intel i7 Processor", "32GB RAM", "RGB Lighting", "Air Cooling", "1TB NVMe SSD"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/gaming-pcs/rog-strix-g35cz.webp',
        website: "https://rog.asus.com/us/gaming-desktops/rog-strix-g35cz-model"
      },
      {
        title: "MSI MEG Aegis Ti5",
        description: "Compact powerhouse for enthusiast gamers and content creators.",
        rating: 4.4,
        reviews: 723,
        features: ["RTX 4070 Ti", "Intel i9 Processor", "32GB RAM", "RGB Lighting", "AIO Cooling", "2TB SSD"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/gaming-pcs/msi-meg-aegis-ti5.webp',
        website: "https://www.msi.com/Desktop/MEG-AEGIS-TI5-11TH"
      },
      {
        title: "Corsair ONE i300",
        description: "Ultra-compact premium gaming PC with no compromises.",
        rating: 4.6,
        reviews: 542,
        sponsored: true,
        features: ["RTX 4080", "Intel i9 Processor", "64GB RAM", "RGB Lighting", "Liquid Cooling", "2TB NVMe"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/gaming-pcs/corsair-one-i300.webp',
        website: "https://www.corsair.com/en-us/corsair-one-i300"
      },
      {
        title: "NZXT H1 Mini Pro",
        description: "Small form factor gaming PC with premium components.",
        rating: 4.2,
        reviews: 384,
        features: ["RTX 4070", "AMD R7 7800X", "32GB RAM", "RGB Lighting", "AIO Cooling", "1TB NVMe"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/gaming-pcs/nzxt-h1-mini-pro.webp',
        website: "https://www.nzxt.com/products/h1-mini-pro"
      }
    ]
  },
  'dating': {
    title: 'Best Gamers & Streamers Dating Apps',
    description: 'Find your soulmateplayer two',
    products: [
      {
        title: "GamerDating",
        description: "A niche platform aimed at gamers looking for romantic relationships or friendships. Emphasizes gaming interests with detailed profiles and gaming library.",
        rating: 4.5,
        reviews: 2500,
        sponsored: true,
        features: [
          "Detailed Gaming Profiles",
          "Free Games for Premium",
          "Gaming Community Updates",
          "Advice Section",
          "Premium Messaging",
          "Web Platform"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FGamerDating.webp?alt=media&token=c8ecc53c-469b-49f3-be3e-c79de3334090',
        website: "https://www.gamerdating.com"
      },
      {
        title: "GamingPassions",
        description: "A modern dating app designed for gamers, with a social twist. Features customizable profiles and interactive features like playing games with matches.",
        rating: 4.4,
        reviews: 980,
        sponsored: true,
        features: [
          "Customizable Profiles",
          "Game Integration",
          "Interactive Features",
          "Modern Design",
          "Social Gaming",
          "Mobile App"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FGamingpassions.png?alt=media&token=cec2e7f0-d723-4d80-a2a6-981646654d25',
        website: "https://www.kippo.com"
      },
      {
        title: "Hinge",
        description: "A relationship-focused dating app designed to be deleted, featuring detailed profiles and conversation prompts.",
        rating: 4.4,
        reviews: 8500,
        features: [
          "Detailed Profiles",
          "Conversation Starters",
          "Video Chat",
          "Match Recommendations",
          "Profile Verification",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Fhinge.png?alt=media&token=3d7fbafe-d35c-4d92-8f38-4e531a08ddec',
        website: "https://hinge.co"
      },
      {
        title: "Fruitz",
        description: "A fun and casual dating app that helps users express their dating intentions through fruit metaphors.",
        rating: 4.3,
        reviews: 6200,
        features: [
          "Playful Interface",
          "Dating Intentions",
          "Quick Matching",
          "Chat Features",
          "Profile Customization",
          "Location-based"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Ffruitz.png?alt=media&token=2eec0127-4b98-40d7-99bf-822bda16e104',
        website: "https://fruitz.io"
      },
      {
        title: "Match",
        description: "One of the most established dating platforms, offering a comprehensive matchmaking experience with advanced features.",
        rating: 4.2,
        reviews: 12500,
        features: [
          "Advanced Search",
          "Video Chat",
          "Events & Mixers",
          "Profile Verification",
          "Dating Experts",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Fmatch.webp?alt=media&token=31b01ca5-7591-4b9d-9614-3e54f1b5d699',
        website: "https://match.com"
      },
      {
        title: "LFG Dating",
        description: "Looking for Group Dating - A platform focused on creating meaningful relationships within the gaming community.",
        rating: 4.2,
        reviews: 750,
        features: [
          "Gamer-Focused Matching",
          "Profile Verification",
          "Basic Features",
          "Community Focus",
          "Gaming Interest Tags"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FLFG_DATING.jpg?alt=media&token=f17e1cf3-a908-4368-b03c-2941f46ea5ec',
        website: "https://www.lfgdating.com"
      },
      {
        title: "SoulGeek",
        description: "A dating site for geeks and gamers looking for like-minded individuals.",
        rating: 4.1,
        reviews: 550,
        features: [
          "Geek Interest Categories",
          "Forum Community",
          "Event Calendar",
          "Basic Messaging",
          "Profile Customization"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FSoulgeek.webp?alt=media&token=5d13fb27-a3a1-4292-85a5-cd26ae8f98b4',
        website: "https://www.soulgeek.com"
      },
      {
        title: "GirlGamerDating",
        description: "A dating platform specifically designed for female gamers looking to connect.",
        rating: 4.0,
        reviews: 350,
        features: [
          "Female-Focused",
          "Gaming Profiles",
          "Safe Environment",
          "Basic Features",
          "Community Forums"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FGirlGamerDating.png?alt=media&token=f7741111-23c7-40ac-86b5-1c7dbce774b2',
        website: "https://www.girlgamerdating.com"
      },
      {
        title: "Tinder",
        description: "The world's most popular dating app, now with gaming profile integration and matchmaking based on gaming preferences.",
        rating: 4.1,
        reviews: 15000,
        sponsored: true,
        features: [
          "Gaming Tags",
          "Global Reach",
          "Quick Match",
          "Location Based",
          "Photo Verification",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2FTinder.png?alt=media&token=cb152a0d-911e-4d25-94d2-739063f123cc',
        website: "https://tinder.com"
      },
      {
        title: "Bumble",
        description: "A relationship-focused dating app designed to be deleted, featuring detailed profiles and conversation prompts.",
        rating: 4.4,
        reviews: 8500,
        features: [
          "Detailed Profiles",
          "Conversation Starters",
          "Video Chat",
          "Match Recommendations",
          "Profile Verification",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Fbumble.png?alt=media&token=baf7ca65-9246-4582-a0e2-7bc48c454a95',
        website: "https://bumble.com"
      },
      {
        title: "Zoosk",
        description: "A relationship-focused dating app designed to be deleted, featuring detailed profiles and conversation prompts.",
        rating: 4.4,
        reviews: 8500,
        features: [
          "Detailed Profiles",
          "Conversation Starters",
          "Video Chat",
          "Match Recommendations",
          "Profile Verification",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Fzoosk.webp?alt=media&token=3f33aedd-888b-4014-9fa0-a377ae6f0d86',
        website: "https://zoosk.com"
      },
      {
        title: "Kippo",
        description: "A relationship-focused dating app designed to be deleted, featuring detailed profiles and conversation prompts.",
        rating: 4.4,
        reviews: 8500,
        features: [
          "Detailed Profiles",
          "Conversation Starters",
          "Video Chat",
          "Match Recommendations",
          "Profile Verification",
          "Safety Features"
        ],
        image: 'https://firebasestorage.googleapis.com/v0/b/gamernexusinc.firebasestorage.app/o/Images%2FDating%2Fkippo.png?alt=media&token=878d4b1b-bcb8-49e1-a683-1a9d861b2a55',
        website: "https://hinge.co"
      },
    ]
  },
  'meet-friends': {
    title: 'Meet Friends',
    description: 'Find your gaming squad',
    products: [
      {
        title: "GamePals",
        description: "A social platform designed for gamers to find friends, form teams, and organize gaming sessions.",
        rating: 4.7,
        reviews: 3150,
        sponsored: true,
        features: ["Squad Builder", "Game Scheduling", "Voice Chat", "Friend Finder", "Community Events", "Cross-Platform"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/Dating/bumble.png',
        website: "https://www.gamepals.com"
      },
      {
        title: "Squad Social",
        rating: 4.6,
        reviews: 2850,
        features: ["Team Formation", "Game Integration", "Chat System", "Event Planning", "Achievement Sharing", "Profile Cards"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/Dating/fruitz.png',
        website: "https://www.squadsocial.com"
      },
      {
        title: "GamerLink",
        rating: 4.5,
        reviews: 2450,
        features: ["Skill Matching", "Schedule Sync", "Voice Rooms", "Game Stats", "Friend Lists", "Team Builder"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/Dating/GamerDating.webp',
        website: "https://www.gamerlink.com"
      },
      {
        title: "PlayMates",
        rating: 4.4,
        reviews: 1950,
        sponsored: true,
        features: ["Quick Match", "Game Library", "Voice Chat", "Party System", "Achievements", "Cross-Game"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/Dating/Gamingpassions.png',
        website: "https://www.playmates.com"
      }
    ]
  },
  'essentials': {
    title: 'Gaming Essentials',
    description: 'Comfort for long gaming sessions',
    products: [
      {
        title: "ErgoMax Gaming Chair",
        description: "Premium gaming chair with ergonomic design for ultimate comfort.",
        rating: 4.8,
        reviews: 2250,
        sponsored: true,
        features: ["Lumbar Support", "4D Armrests", "Reclining", "Memory Foam", "Breathable Mesh", "Premium Wheels"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/essentials/ergomax-gaming-chair.webp',
        website: "https://www.ergomax.com/gaming-chair"
      },
      {
        title: "ComfortPro Desk",
        description: "Height-adjustable gaming desk with cable management.",
        rating: 4.6,
        reviews: 1850,
        features: ["Height Adjust", "Cable Management", "LED Lighting", "Large Surface", "USB Ports", "Accessory Hooks"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/essentials/comfortpro-desk.webp',
        website: "https://www.comfortpro.com/gaming-desk"
      },
      {
        title: "GamerFuel Energy",
        description: "Healthy energy drinks designed for gaming sessions.",
        rating: 4.5,
        reviews: 1650,
        features: ["Sugar-Free", "Vitamins", "Electrolytes", "Natural Caffeine", "Focus Blend", "Hydration"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/essentials/gamerfuel-energy.webp',
        website: "https://www.gamerfuel.com/energy-drink"
      },
      {
        title: "EyeCare Monitor Light",
        description: "LED monitor light bar for reduced eye strain.",
        rating: 4.7,
        reviews: 1450,
        sponsored: true,
        features: ["Auto-Dimming", "Color Adjust", "No Glare", "USB Powered", "Touch Control", "Space Saving"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/essentials/eyecare-monitor-light.webp',
        website: "https://www.eyecare.com/monitor-light"
      }
    ]
  },
  'accessories': {
    title: 'Gaming Accessories',
    description: 'Essential gaming peripherals',
    products: [
      {
        title: "ProGamer Headset",
        description: "Professional gaming headset with 7.1 surround sound.",
        rating: 4.9,
        reviews: 3250,
        sponsored: true,
        features: ["7.1 Surround", "Noise Cancel", "Memory Foam", "RGB Lighting", "Detach Mic", "Multi-Platform"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/accessories/progamer-headset.webp',
        website: "https://www.progamer.com/headset"
      },
      {
        title: "UltraGlide Mouse",
        description: "High-precision gaming mouse with customizable buttons.",
        rating: 4.7,
        reviews: 2850,
        features: ["25K DPI", "Wireless", "RGB", "8 Buttons", "Quick Charge", "Lightweight"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/accessories/ultraglide-mouse.webp',
        website: "https://www.ultraglide.com/mouse"
      },
      {
        title: "MechMaster Keyboard",
        description: "Mechanical gaming keyboard with custom switches.",
        rating: 4.6,
        reviews: 2450,
        features: ["Mechanical", "RGB Per-Key", "Macro Keys", "Wrist Rest", "USB Passthrough", "Media Controls"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/accessories/mechmaster-keyboard.webp',
        website: "https://www.mechmaster.com/keyboard"
      },
      {
        title: "StreamDeck Elite",
        description: "Stream controller with LCD keys and custom profiles.",
        rating: 4.8,
        reviews: 1950,
        sponsored: true,
        features: ["LCD Keys", "Custom Profiles", "Plugin Support", "Live Preview", "Multi-Actions", "Wireless"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/accessories/streamdeck-elite.webp',
        website: "https://www.streamdeck.com/elite"
      }
    ]
  },
  'streaming': {
    title: 'Streaming Gears',
    description: 'Professional streaming equipment',
    products: [
      {
        title: "StreamPro Camera",
        description: "4K webcam designed for professional streaming.",
        rating: 4.9,
        reviews: 2850,
        sponsored: true,
        features: ["4K 60FPS", "Auto Focus", "Low Light", "Wide Angle", "Dual Mics", "Privacy Cover"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/streaming/streampro-camera.webp',
        website: "https://www.streampro.com/camera"
      },
      {
        title: "AudioMaster Mic",
        description: "Studio-quality USB microphone for streamers.",
        rating: 4.7,
        reviews: 2450,
        features: ["Studio Quality", "USB-C", "Zero Latency", "Shock Mount", "Pop Filter", "RGB"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/streaming/audiomaster-mic.webp',
        website: "https://www.audiomaster.com/mic"
      },
      {
        title: "LightPro Kit",
        description: "Professional lighting kit for streaming setup.",
        rating: 4.6,
        reviews: 1850,
        features: ["RGB Lights", "App Control", "Effects", "Adjustable", "Diffuser", "Scene Presets"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/streaming/lightpro-kit.webp',
        website: "https://www.lightpro.com/kit"
      },
      {
        title: "CaptureMax Card",
        description: "4K60 capture card for high-quality streaming.",
        rating: 4.8,
        reviews: 1650,
        sponsored: true,
        features: ["4K 60FPS", "HDR", "USB 3.0", "Low Latency", "Software Suite", "Multi-Platform"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/streaming/capturemax-card.webp',
        website: "https://www.capturemax.com/card"
      }
    ]
  },
  'crypto': {
    title: 'Crypto & NFT',
    description: 'Digital assets and blockchain gaming',
    products: [
      {
        title: "MetaMask Gaming",
        description: "The leading Web3 wallet for gaming NFTs and cryptocurrencies.",
        rating: 4.8,
        reviews: 5250,
        sponsored: true,
        features: ["NFT Support", "Multi-Chain", "Game Integration", "Hardware Wallet", "DApp Browser", "Token Swap"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/crypto/metamask-gaming.webp',
        website: "https://metamask.io/gaming"
      },
      {
        title: "OpenSea Gaming",
        description: "The largest NFT marketplace for gaming assets.",
        rating: 4.7,
        reviews: 4850,
        features: ["Gaming NFTs", "Multiple Chains", "Asset Creation", "Trading Tools", "Collection Stats", "Bulk Upload"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/crypto/opensea-gaming.webp',
        website: "https://opensea.io/gaming"
      },
      {
        title: "Axie Infinity",
        description: "Popular blockchain game with collectible NFT creatures.",
        rating: 4.6,
        reviews: 3650,
        features: ["Play to Earn", "NFT Breeding", "PvP Battles", "Marketplace", "Scholarships", "Land System"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/crypto/axie-infinity.webp',
        website: "https://axieinfinity.com"
      },
      {
        title: "ImmutableX Gaming",
        description: "Layer 2 scaling solution for NFT gaming.",
        rating: 4.9,
        reviews: 2950,
        sponsored: true,
        features: ["Zero Gas Fees", "Instant Trades", "Game SDK", "Carbon Neutral", "API Access", "Marketplace Tools"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/crypto/immutablex-gaming.webp',
        website: "https://immutable.com/gaming"
      }
    ]
  },
  'game-dev': {
    title: 'Game Development',
    description: 'Tools and resources for game creators',
    products: [
      {
        title: "Unity Pro",
        description: "Professional game development engine with comprehensive tools.",
        rating: 4.9,
        reviews: 8250,
        sponsored: true,
        features: ["Real-time 3D", "Cross-platform", "Visual Scripting", "Asset Store", "Cloud Build", "Analytics"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/game-dev/unity-pro.webp',
        website: "https://unity.com/products/unity-pro"
      },
      {
        title: "Unreal Engine 5",
        description: "Next-gen game engine with photorealistic graphics.",
        rating: 4.8,
        reviews: 7850,
        features: ["Nanite", "Lumen", "MetaHuman", "Blueprint System", "Marketplace", "Mobile Support"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/game-dev/unreal-engine-5.webp',
        website: "https://www.unrealengine.com/en-US/unreal-engine-5"
      },
      {
        title: "GameMaker Studio",
        description: "Rapid game development platform for 2D games.",
        rating: 4.6,
        reviews: 4650,
        features: ["Drag & Drop", "GML Scripting", "Cross-platform", "Asset Store", "One-Click Export", "Built-in IDE"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/game-dev/gamemaker-studio.webp',
        website: "https://www.gamemaker.io/studio"
      },
      {
        title: "Godot Engine",
        description: "Open-source game engine with powerful features.",
        rating: 4.7,
        reviews: 3950,
        sponsored: true,
        features: ["2D & 3D", "GDScript", "Visual Editor", "Physics Engine", "Animation System", "Free & Open Source"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/game-dev/godot-engine.webp',
        website: "https://godot.org"
      },
      {
        title: "Blender",
        description: "Free 3D creation suite for game assets and animations.",
        rating: 4.8,
        reviews: 6250,
        features: ["3D Modeling", "Animation", "Texturing", "Rendering", "Game Engine", "Python Scripting"],
        image: 'https://storage.googleapis.com/gamernexusinc.appspot.com/Images/game-dev/blender.webp',
        website: "https://www.blender.org"
      }
    ]
  }
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [activeFilter, setActiveFilter] = useState('all');
  const { apps, loading: appsLoading } = useDatingApps();
  
  const categoryInfo = categoryId ? categoryData[categoryId as keyof typeof categoryData] : null;

  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  const filteredProducts = categoryInfo.products.filter(product => {
    switch (activeFilter) {
      case 'featured':
        return product.sponsored;
      case 'new':
        return true; // You can add a date field later to filter by new releases
      case 'top':
        return product.rating >= 4.5;
      default:
        return true;
    }
  });

  if (categoryId === 'dating') {
    return (
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dating & Social Apps for Gamers
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find your player two or make new gaming friends
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <DatingAppCard key={index} app={app} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-8 pb-16">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-6">{categoryInfo.title}</h1>
          <p className="text-gray-400 text-3xl">{categoryInfo.description}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              activeFilter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              activeFilter === 'featured'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              activeFilter === 'new'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            New Releases
          </button>
          <button
            onClick={() => setActiveFilter('top')}
            className={`px-6 py-3 rounded-lg text-lg font-medium transition-colors ${
              activeFilter === 'top'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Top Reviewed
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-5">
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={index} 
              {...product} 
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
