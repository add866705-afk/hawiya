import {Layers,PenTool,Package,Monitor,Sparkles} from 'lucide-react';
const icons={Layers,PenTool,Package,Monitor};
export default function ServiceIcon({name}){const Icon=icons[name]||Sparkles;return <Icon size={22} strokeWidth={1.6}/>;}