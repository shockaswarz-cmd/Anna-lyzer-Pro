'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';

interface DealGalleryProps {
    images: string[];
    title: string;
    className?: string;
}

export function DealGallery({ images, title, className }: DealGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <GlassCard className={cn("p-4 overflow-hidden", className)}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full">
                {/* Main Image */}
                <div
                    className="md:col-span-3 h-full relative rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(0)}
                >
                    <Image
                        src={images[0]}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Thumbnails */}
                <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:h-full">
                    {images.slice(1, 4).map((img, i) => (
                        <div
                            key={i}
                            className="relative w-full h-full min-h-[80px] md:min-h-0 flex-1 rounded-xl overflow-hidden cursor-pointer group border border-slate-800 hover:border-emerald-500/50 transition-colors"
                            onClick={() => setSelectedImage(i + 1)}
                        >
                            <Image
                                src={img}
                                alt={`${title} view ${i + 2}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}

                    {images.length > 4 && (
                        <div
                            className="relative w-full h-full min-h-[80px] md:min-h-0 flex-1 rounded-xl overflow-hidden cursor-pointer group border border-slate-800 bg-slate-900 flex items-center justify-center hover:border-emerald-500/50 transition-colors"
                            onClick={() => setSelectedImage(4)}
                        >
                            <span className="text-emerald-400 font-bold text-lg">+{images.length - 4}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(prev => prev === null || prev === 0 ? images.length - 1 : prev - 1);
                        }}
                        className="absolute left-4 p-3 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                        <Image
                            src={images[selectedImage]}
                            alt={title}
                            fill
                            className="object-contain"
                        />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-white text-sm">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(prev => prev === null || prev === images.length - 1 ? 0 : prev + 1);
                        }}
                        className="absolute right-4 p-3 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </GlassCard>
    );
}
