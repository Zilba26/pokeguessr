import { use, useEffect, useRef, useState } from 'react'

import { Box, useColorModeValue, Image, Spinner, Center, Text, useDisclosure } from '@chakra-ui/react';
import { Entity } from '../../../models/Entity';
import { EntityService } from '../../../service/EntityService';
import { RegenerateButton } from '../components/RegenerateButton';
import { AutocompleteDropdown } from '../components/AutocompleteDropdown';
import { GameProvider, useGameContext } from '../contextProvider';

interface ZoomFigurePageProps<T extends Entity> {
    service: EntityService<T>;
    useData: () => T[];
}

export function ZoomFigurePage<T extends Entity>({ service, useData }: ZoomFigurePageProps<T>) {
    const [zoomLevel, setZoomLevel] = useState<number>(3);
    const [origin, setOrigin] = useState(null as { x: number, y: number } | null);

    const options = {
        onRegenerate: () => { setZoomLevel(3); setOrigin(null) },
        onEnterGuess: () => setZoomLevel((prev) => Math.max(prev - 0.4, 1)),
        onWin: () => setOrigin(null),
    }

    return <GameProvider useData={useData} service={service} options={options}>
        <ZoomFigure<T> service={service} zoomLevel={zoomLevel} origin={origin} setOrigin={setOrigin} />
    </GameProvider>;
}

interface ZoomFigureProps<T extends Entity> {
    service: EntityService<T>;
    zoomLevel: number;
    origin: { x: number, y: number } | null;
    setOrigin: (origin: { x: number, y: number }) => void;
}

function ZoomFigure<T extends Entity>({ service, zoomLevel, origin, setOrigin }: ZoomFigureProps<T>) {

    const { allEntitiesData, entityToFind, entityGuessTries, win } = useGameContext<T>();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    function loadImage(onLoad: (img: HTMLImageElement) => void) {
        const img = new (window.Image)();
        img.crossOrigin = "anonymous";
        img.src = entityToFind?.sprite;
        img.onload = () => onLoad(img);
    }

    // Récupération d'un origin OK
    useEffect(() => {
        loadImage((img) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            let visibleW = img.width / zoomLevel;
            let visibleH = img.height / zoomLevel;

            let attempts = 0;
            while (attempts < 50) {
                const x = Math.random() * (img.width - visibleW);
                const y = Math.random() * (img.height - visibleH);

                const ratio = computeVisibleRatio(ctx, x, y, visibleW, visibleH);

                if (ratio > 0.2 && ratio < 0.8) {
                    console.log("Found good origin after " + attempts + " attempts, visible ratio : " + ratio);
                    setOrigin({ x: visibleW / 2 + x, y: visibleH / 2 + y });
                    //setOrigin({ x: visibleW / 2, y: visibleH / 2 });
                    break;
                }

                attempts++;
            }
            if (attempts === 50) console.log("Failed to find good origin, using default " + attempts)
        });
    }, [entityToFind]);

    // Update du canvas
    useEffect(() => {
        if (!origin) return;

        loadImage((img) => {

            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;

            const visibleW = img.width / zoomLevel;
            const visibleH = img.height / zoomLevel;

            let sx = origin.x - visibleW / 2;
            let sy = origin.y - visibleH / 2;

            // Clamp pour rester dans l'image
            sx = Math.max(0, Math.min(img.width - visibleW, sx));
            sy = Math.max(0, Math.min(img.height - visibleH, sy));

            // canvas taille fixe en hauteur
            const canvasHeight = 200;
            const ratio = visibleW / visibleH;
            const canvasWidth = canvasHeight * ratio;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
                img,
                sx,
                sy,
                visibleW,
                visibleH,
                0,
                0,
                canvasWidth,
                canvasHeight
            );
        });

    }, [zoomLevel, origin]);

    const border = useColorModeValue('black', 'white');
    const bg = useColorModeValue('whiteal', 'gray.700');

    if (allEntitiesData.length === 0 || !entityToFind) {
        return <Center h="100%" minH="inherit">
            <Spinner size="xl" />
        </Center>;
    }

    return (
        <>
            {service.getFilterController()?.render?.()}
            <Box h="20px"></Box>
            <RegenerateButton onOpenSettings={onOpen} />
            <Box h="30px"></Box>
            <Box display="flex" w="200px" h="200px" overflow="hidden">
                {win ? <Image src={entityToFind.sprite} h="100%" w="100%" /> :
                    <canvas ref={canvasRef} style={{ filter: win ? "none" : "brightness(0)" }} />
                }
            </Box>
            <Box h="50px"></Box>
            <AutocompleteDropdown />
            <Box h="50px"></Box>
            <Box>
                <Box className='table-body' display="flex" flexDir="column-reverse" gap="10px">
                    {entityGuessTries.map((entity: T) => {
                        return <Box key={entity.id} w="280px" display="flex" alignItems="center" gap="10px" borderColor={border} border="2px" bg={bg} padding="8px" borderRadius="8px">
                            <Image src={entity.sprite} h="60px" display="inline-block" />
                            <Text fontWeight="bold" fontSize="2xl">{entity.name.toUpperCase()}</Text>
                        </Box>
                    })}
                </Box>
            </Box>
        </>
    )
}

function computeVisibleRatio(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
) {
    const data = ctx.getImageData(x, y, width, height).data;
    //console.log("Testing origin, visible ratio : " + data);

    let visible = 0;
    const total = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 20) visible++;
    }

    return visible / total;
}