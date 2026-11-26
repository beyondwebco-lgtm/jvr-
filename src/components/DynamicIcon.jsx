import {
  CheckCircle2,
  Cog,
  Compass,
  Handshake,
  HardHat,
  Layers,
  Pickaxe,
  Ruler,
  ShieldCheck,
  Truck,
  Wind,
} from 'lucide-react';

const ICON_MAP = {
  CheckCircle2,
  Cog,
  Compass,
  Handshake,
  HardHat,
  Layers,
  Pickaxe,
  Ruler,
  ShieldCheck,
  Truck,
  Wind,
};

export default function DynamicIcon({ name, className = 'w-6 h-6' }) {
  const IconComponent = ICON_MAP[name] || HardHat;
  return <IconComponent className={className} aria-hidden="true" />;
}
