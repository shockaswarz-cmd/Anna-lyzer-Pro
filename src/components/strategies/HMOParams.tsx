'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Users } from 'lucide-react';

interface HMORoom {
    id: string;
    name: string;
    monthlyRent: number;
}

interface HMOParamsProps {
    bedrooms: number;
    onRoomsChange: (totalRent: number, rooms: HMORoom[]) => void;
}

export function HMOParams({ bedrooms, onRoomsChange }: HMOParamsProps) {
    const [rooms, setRooms] = useState<HMORoom[]>(() =>
        Array.from({ length: bedrooms }, (_, i) => ({
            id: `room-${i + 1}`,
            name: `Room ${i + 1}`,
            monthlyRent: 550
        }))
    );

    const handleRentChange = (id: string, rent: number) => {
        const newRooms = rooms.map(r => r.id === id ? { ...r, monthlyRent: rent } : r);
        setRooms(newRooms);
        onRoomsChange(newRooms.reduce((sum, r) => sum + r.monthlyRent, 0), newRooms);
    };

    const addRoom = () => {
        const newRoom: HMORoom = {
            id: `room-${Date.now()}`,
            name: `Room ${rooms.length + 1}`,
            monthlyRent: 550
        };
        const newRooms = [...rooms, newRoom];
        setRooms(newRooms);
        onRoomsChange(newRooms.reduce((sum, r) => sum + r.monthlyRent, 0), newRooms);
    };

    const removeRoom = (id: string) => {
        if (rooms.length <= 1) return;
        const newRooms = rooms.filter(r => r.id !== id);
        setRooms(newRooms);
        onRoomsChange(newRooms.reduce((sum, r) => sum + r.monthlyRent, 0), newRooms);
    };

    const totalRent = rooms.reduce((sum, r) => sum + r.monthlyRent, 0);
    const avgRent = rooms.length > 0 ? totalRent / rooms.length : 0;

    return (
        <Card className="border-amber-200 bg-amber-50/30">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-amber-600" />
                        <CardTitle className="text-lg">HMO Room Configuration</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" onClick={addRoom}>
                        <Plus className="h-4 w-4 mr-1" /> Add Room
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {rooms.map((room, idx) => (
                        <div key={room.id} className="relative p-3 bg-white rounded-lg border shadow-sm">
                            <button
                                onClick={() => removeRoom(room.id)}
                                className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                            <Label className="text-xs text-muted-foreground">{room.name}</Label>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="text-sm">£</span>
                                <Input
                                    type="number"
                                    className="h-8 text-center"
                                    value={room.monthlyRent}
                                    onChange={(e) => handleRentChange(room.id, Number(e.target.value))}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-3 border-t flex justify-between">
                    <div>
                        <span className="text-sm text-muted-foreground">Total Monthly:</span>
                        <span className="ml-2 font-bold text-lg text-green-600">£{totalRent.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground">Avg/Room:</span>
                        <span className="ml-2 font-semibold">£{avgRent.toFixed(0)}</span>
                    </div>
                </div>

                <div className="p-3 bg-amber-100 rounded text-sm text-amber-800">
                    <strong>HMO Considerations:</strong> Licensing fees (£500-£1500), higher management (12-15%), more maintenance.
                </div>
            </CardContent>
        </Card>
    );
}
