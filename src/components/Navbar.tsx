import React from 'react';
import { Link } from 'react-router-dom';
import NavActions from './NavActions';
import { Monitor, Heart, Users2, Mail, Key, Video, Code, Newspaper, Gamepad, Cpu, Bitcoin, Trophy, Gamepad2 } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-gray-800">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                GamerNexus
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center ml-8 gap-8">
              <Link 
                to="/" 
                className="text-3xl text-white hover:text-purple-400 transition-colors"
              >
                Home
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-2xl text-white hover:text-purple-400 transition-colors bg-transparent">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[250px] p-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                        <div className="flex flex-col gap-1">
                          <Link to="/category/gaming-pcs" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Monitor className="w-5 h-5 text-blue-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Gaming PCs</span>
                            </div>
                          </Link>
                          <Link to="/category/dating" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Heart className="w-5 h-5 text-pink-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Dating Apps</span>
                            </div>
                          </Link>
                          <Link to="/category/meet-friends" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Users2 className="w-5 h-5 text-green-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Meet Friends</span>
                            </div>
                          </Link>
                          <Link to="/category/essentials" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-purple-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Gaming Essentials</span>
                            </div>
                          </Link>
                          <Link to="/category/accessories" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Key className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Gaming Accessories</span>
                            </div>
                          </Link>
                          <Link to="/category/streaming" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Video className="w-5 h-5 text-red-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Streaming Gear</span>
                            </div>
                          </Link>
                          <Link to="/category/crypto" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Key className="w-5 h-5 text-orange-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Crypto & NFT</span>
                            </div>
                          </Link>
                          <Link to="/category/game-dev" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Code className="w-5 h-5 text-indigo-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Game Development</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-2xl text-white hover:text-purple-400 transition-colors bg-transparent">
                      News
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[250px] p-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                        <div className="flex flex-col gap-1">
                          <Link to="/blogs/gaming-news" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Gamepad2 className="w-5 h-5 text-green-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Gaming News</span>
                            </div>
                          </Link>
                          <Link to="/blogs/esports-news" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Trophy className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Esports News</span>
                            </div>
                          </Link>
                          <Link to="/blogs/tech-news" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Cpu className="w-5 h-5 text-blue-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Tech News & Reviews</span>
                            </div>
                          </Link>
                          <Link to="/blogs/crypto-news" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Bitcoin className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Blockchain & Crypto News</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-2xl text-white hover:text-purple-400 transition-colors bg-transparent">
                      Podcasts
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[250px] p-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
                        <div className="flex flex-col gap-1">
                          <Link to="/podcasts/gaming" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Gamepad2 className="w-5 h-5 text-green-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">TOP Gaming Streams & Podcasts</span>
                            </div>
                          </Link>
                          <Link to="/blogs/esports-news" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Trophy className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Best Live Streams</span>
                            </div>
                          </Link>
                          <Link to="/podcasts/tech" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Cpu className="w-5 h-5 text-blue-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Best Tech Talk</span>
                            </div>
                          </Link>
                          <Link to="/podcasts/crypto" className="group p-3 hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                              <Bitcoin className="w-5 h-5 text-yellow-400" />
                              <span className="text-sm font-medium text-white group-hover:text-purple-400">Blockchain & Crypto</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link 
                to="/about" 
                className="text-2xl text-white hover:text-purple-400 transition-colors"
              >
                About
              </Link>
            </div>
          </div>

          {/* Auth Actions */}
          <NavActions />
        </div>
      </div>
    </nav>
  );
}