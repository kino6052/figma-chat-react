import { useEffect } from "react";
import { selectMainProps } from "../selectors";
import { EventSubject } from "./EventWrapper";
import { useSharedState } from "./useSharedState";
import { PropsSubject } from "../index";

export function withDecoupler(
  WrappedComponent: React.FC<ReturnType<typeof selectMainProps>>
): React.FC {
  return () => {
    useEffect(() => {
      const subscription = EventSubject.subscribe((event) => {
        // @ts-ignore
        decoupler.sendAction(event);
      });

      return () => subscription.unsubscribe();
    }, []);

    const [props] = useSharedState(PropsSubject);

    if (typeof window === undefined) return null;

    return <WrappedComponent {...props} />;
  };
}
