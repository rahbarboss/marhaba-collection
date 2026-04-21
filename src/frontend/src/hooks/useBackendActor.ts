import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";

/**
 * Returns the real Motoko canister actor using the generated createActor binding.
 * useActor resolves canisterId + identity automatically from the Caffeine runtime.
 */
export function useBackendActor() {
  return useActor(createActor);
}
