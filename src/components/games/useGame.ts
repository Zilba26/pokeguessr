import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Entity } from "../../models/Entity";
import { normalizeString } from "../../utils/normalize";
import { GameProviderProps } from "./contextProvider";

export function useGame<T extends Entity>({ useData, service, options }: GameProviderProps<T>) {
    // Toutes les entités disponibles (avant filtre(s))
    const allEntitiesData: T[] = useData();
    // Entités après application des filtres
    const [entitiesData, setEntitiesData] = useState<T[]>(allEntitiesData.filter((entity: T) => service.getFilterController()?.filter(entity) ?? true));
    // Entité à deviner
    const [entityToFind, setEntityToFind] = useState<T>(service.getRandom(entitiesData));

    // Entités déjà proposées
    const [entityGuessTries, setEntityGuessTries] = useState<T[]>([]);
    // Entités à afficher dans le select/dropdown
    const [dropdownEntities, setDropdownEntities] = useState<T[] | null>(null);
    // Entité sélectionnée dans le select/dropdown
    const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

    const [win, setWin] = useState<boolean>(false);

    const toast = useToast();

    const updateEntitiesData = () => {
        setEntitiesData(allEntitiesData.filter((entity: T) => service.getFilterController()?.filter(entity) ?? true));
    }

    useEffect(() => {
        if (allEntitiesData.length > 0) {
            updateEntitiesData(); 
            const randomEntity = service.getRandom(entitiesData);

            setEntityToFind(randomEntity);
        }
    }, [allEntitiesData]);

    const enterEntity = (entityInput?: T) => {
        if (entityInput == undefined) {
            const input = document.querySelector<HTMLInputElement>('input');
            if (input) {
                const entityName = normalizeString(input.value);
                const entity = entitiesData.find((entity: T) => {
                    return normalizeString(entity.name) === entityName;
                });
                if (entity) {
                    entityInput = entity;
                }
            }
        }
        if (entityInput && !entityGuessTries.includes(entityInput)) {
            setEntityGuessTries([...entityGuessTries, entityInput]);
            setDropdownEntities(null);
            const input = document.querySelector<HTMLInputElement>('input');
            input!.value = '';
            input!.focus();
            options?.onEnterGuess?.(entityInput);
        }
        if (entityInput && entityInput.equals(entityToFind)) {
            setWin(true);
            options?.onWin?.();
            const pyro = document.getElementById('pyro');
            pyro?.classList.add('pyro');
            setTimeout(() => {
                pyro?.classList.remove('pyro');
            }, 10000);
        }
    }

    const onGuessInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = normalizeString(event.target.value);
        let list;
        const minLengthToSearch = entitiesData.length > 500 ? 3 : 2;
        if (value.length >= minLengthToSearch) {
            list = entitiesData.filter((entity: T) => {
                return normalizeString(entity.name).split(" ").some(part => part.startsWith(value)) && !entityGuessTries.includes(entity);
            });
        } else {
            list = null;
        }
        setSelectedEntity(list?.[0] ?? null);
        setDropdownEntities(list);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (selectedEntity) {
            if (event.key === 'Enter') {
                enterEntity(selectedEntity);
            } else if (event.key === 'ArrowDown') {
                const index = dropdownEntities?.indexOf(selectedEntity);
                if (index != undefined && index < dropdownEntities!.length - 1) {
                    setSelectedEntity(dropdownEntities![index + 1]);
                }
            } else if (event.key === 'ArrowUp') {
                const index = dropdownEntities?.indexOf(selectedEntity);
                if (index != undefined && index > 0) {
                    setSelectedEntity(dropdownEntities![index - 1]);
                }
            }
        }
    }

    const regenerateEntity = async () => {
        document.getElementById('pyro')?.classList.remove('pyro');
        updateEntitiesData();
        const entityToGuess = service.getRandom(entitiesData);
        setEntityToFind(entityToGuess);
        setEntityGuessTries([]);
        setWin(false);
        toast({
            title: `Le ${service.getSpriteColumnName()} a été regénéré !`,
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
        });
        options?.onRegenerate?.();
    }

    return {
        allEntitiesData,
        entitiesData,
        setEntitiesData,
        entityToFind,
        setEntityToFind,
        entityGuessTries,
        setEntityGuessTries,
        dropdownEntities,
        setDropdownEntities,
        selectedEntity,
        setSelectedEntity,
        win,
        setWin,
        toast,
        enterEntity,
        onGuessInputChange,
        handleKeyDown,
        regenerateEntity,
    }
}