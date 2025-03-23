"use client";

import { useMounted } from "@/hooks/useMounted";
import {
    DndContext,
    type DragEndEvent,
    type DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { useId, useState } from "react";
import { Marker } from "./marker";

const MARKERS = Array.from({ length: 83 }, (_, i) => i);
const MAX_WIDTH = 816;
const EDGE_OFFSET = 50;

export const Ruler = () => {
    const [leftPos, setLeftPos] = useState(EDGE_OFFSET);
    const [rightPos, setRightPos] = useState(MAX_WIDTH - EDGE_OFFSET);
    const [activeId, setActiveId] = useState<string | null>(null);

    const leftMarkerId = useId();
    const rightMarkerId = useId();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
    );

    const mounted = useMounted();

    if (!mounted) {
        return null;
    }

    const onDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const onDragEnd = (event: DragEndEvent) => {
        setActiveId(null);

        const { active, delta } = event;
        const id = active.id as string;

        if (id === leftMarkerId) {
            const newPosition = Math.max(
                0,
                Math.min(rightPos - 10, leftPos + delta.x),
            );
            setLeftPos(newPosition);
        } else if (id === rightMarkerId) {
            const newPosition = Math.min(
                MAX_WIDTH,
                Math.max(leftPos + 10, rightPos + delta.x),
            );
            setRightPos(newPosition);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <div className="relative flex h-6 items-end border-b border-gray-300 select-none print:hidden">
                <div className="relative mx-auto size-full max-w-[816px]">
                    <Marker
                        side="left"
                        position={leftPos}
                        id={leftMarkerId}
                        isDragging={activeId === leftMarkerId}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-full">
                        <div className="relative h-full w-[816px]">
                            {MARKERS.map((marker) => {
                                const position = (marker * MAX_WIDTH) / 82;

                                return (
                                    <div
                                        key={marker}
                                        className="absolute bottom-0"
                                        style={{ left: `${position}px` }}
                                    >
                                        {marker % 10 === 0 && (
                                            <>
                                                <div className="absolute bottom-0 h-2 w-[1px] bg-neutral-500" />
                                                <span className="absolute bottom-2 -translate-x-1/2 transform text-[10px] text-neutral-500">
                                                    {marker / 10 + 1}
                                                </span>
                                            </>
                                        )}
                                        {marker % 5 === 0 &&
                                            marker % 10 !== 0 && (
                                                <div className="absolute bottom-0 h-1.5 w-[1px] bg-neutral-500" />
                                            )}
                                        {marker % 5 !== 0 && (
                                            <div className="absolute bottom-0 h-1 w-[1px] bg-neutral-300" />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Marker
                        side="right"
                        position={rightPos}
                        id={rightMarkerId}
                        isDragging={activeId === rightMarkerId}
                    />
                </div>
            </div>
        </DndContext>
    );
};
