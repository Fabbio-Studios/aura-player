import React, { useState } from 'react';
import { Laptop, Headphones, Radio, Volume2, X, Check, ShieldCheck } from 'lucide-react';

interface DevicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DevicesModal: React.FC<DevicesModalProps> = ({ isOpen, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState('dev-1');

  if (!isOpen) return null;

  const devices = [
    {
      id: 'dev-1',
      name: 'Cockpit Lossless DAC 96kHz',
      type: 'DAC / Hi-Res Audio',
      icon: Headphones,
      active: true,
      bitrate: '24-bit / 96.0 kHz FLAC',
    },
    {
      id: 'dev-2',
      name: 'Paddock Monitor Studio Array',
      type: 'Nearfield Monitors',
      icon: Volume2,
      active: false,
      bitrate: 'Lossless PCM Over Ethernet',
    },
    {
      id: 'dev-3',
      name: 'Lando Norris Radio Link',
      type: 'Encrypted Pit Telemetry',
      icon: Radio,
      active: false,
      bitrate: 'Low-latency Opus 48kHz',
    },
    {
      id: 'dev-4',
      name: 'Workstation Cockpit (Este Dispositivo)',
      type: 'Navegador Web Local',
      icon: Laptop,
      active: false,
      bitrate: 'Web Audio Core Engine',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121217] border border-white/15 w-full max-w-md flex flex-col clip-corner shadow-[0_0_40px_rgba(220,20,60,0.3)]">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[#dc143c]" />
            <h3 className="text-white font-kinetic font-black uppercase text-sm">
              Saída de Áudio & Dispositivos
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 bg-white/5 hover:bg-[#dc143c] text-white flex items-center justify-center clip-tag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {devices.map((device) => {
            const IconComponent = device.icon;
            const isSelected = selectedDevice === device.id;
            return (
              <div
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`flex items-center gap-3 p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#dc143c]/15 border-[#dc143c]'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <div
                  className={`w-10 h-10 flex items-center justify-center clip-corner ${
                    isSelected ? 'bg-[#dc143c] text-white' : 'bg-white/5 text-white/60'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-kinetic font-bold text-xs flex items-center gap-1.5">
                    {device.name}
                    {isSelected && (
                      <span className="text-[8px] font-mono-tech bg-[#dc143c] text-white px-1 font-bold">
                        ATIVO
                      </span>
                    )}
                  </div>
                  <div className="text-white/50 text-[11px] font-mono-tech mt-0.5">
                    {device.type}
                  </div>
                  <div className="text-[#ffe600] text-[10px] font-mono-tech mt-0.5">
                    {device.bitrate}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#dc143c]" />}
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-white/50 px-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Protocolo Seguro Telemetry 96kHz
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-[#dc143c] text-white text-xs font-bold clip-tag"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
