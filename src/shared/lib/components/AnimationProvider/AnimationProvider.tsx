import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

type SpringType = typeof import("@react-spring/web");
type GestureType = typeof import("@use-gesture/react");

interface AnimationContextPayload {
    Gesture?: GestureType;
    Spring?: SpringType;
    isLoaded?: boolean;
}

const getAsyncAnimationModules = async () => {
    return Promise.all([import("@react-spring/web"), import("@use-gesture/react")]);
};

const AnimationContext = createContext<AnimationContextPayload>({});

export function AnimationProvider({ children }: PropsWithChildren) {
    const Gesture = useRef<GestureType>();
    const Spring = useRef<SpringType>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        getAsyncAnimationModules().then(([reactSpring, useGesture]) => {
            Gesture.current = useGesture;
            Spring.current = reactSpring;
            setIsLoaded(true);
        });
    }, []);

    const value = useMemo(
        () => ({ Gesture: Gesture.current, Spring: Spring.current, isLoaded }),
        [isLoaded],
    );

    return (
        <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
    );
}

export const useAnimationLibs = () => {
    return useContext(AnimationContext) as Required<AnimationContextPayload>;
};
