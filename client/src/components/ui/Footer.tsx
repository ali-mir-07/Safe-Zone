import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';


export const Footer = () => {
    return (
        <footer className="relative bg-obsidian-deep border-t border-white/5 pt-20 pb-10 px-6 overflow-hidden">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="text-2xl font-black text-white flex items-center gap-2">
                            <span className="text-safe-400">SAFE</span>ZONE
                        </div>
                        <p className="text-white/30 text-sm leading-relaxed font-medium">
                            The world's first AI-integrated mental health sanctuary.
                            Available 24/7 for anyone, anywhere, in total anonymity.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-safe-400 hover:text-obsidian transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Resources</h4>
                        <ul className="space-y-4 text-white/40 text-sm font-medium">
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Crisis Support</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Safety Protocols</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Zen AI Guidelines</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Community Rules</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-4 text-white/40 text-sm font-medium">
                            <li><a href="#" className="hover:text-safe-400 transition-colors">About Mission</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Research Papers</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Trust & Safety</a></li>
                            <li><a href="#" className="hover:text-safe-400 transition-colors">Careers</a></li>
                        </ul>
                    </div>

                    {/* Contact Detail */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Contact Us</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-white/40 text-sm font-medium">
                                <Mail size={16} className="text-safe-400" />
                                <span>hello@safezone.ai</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40 text-sm font-medium">
                                <Phone size={16} className="text-safe-400" />
                                <span>+1 (800) SAFE-ZEN</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/40 text-sm font-medium">
                                <MapPin size={16} className="text-safe-400" />
                                <span>Global HQ, Zurich, CH</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
                    <div className="text-white/20 text-xs font-medium">
                        © 2026 SafeZone. All rights reserved. Built with <Heart size={10} className="inline text-accent-emergency mx-1" /> for the human spirit.
                    </div>
                    <div className="flex gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>

            {/* Decorative Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-safe-500/5 blur-[100px] pointer-events-none"></div>
        </footer>
    );
};
