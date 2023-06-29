const isLoadedMap = new Map<string, boolean>();

export const loadOnce = (identifier: string, callback: () => void) => {
  if (isLoadedMap.get(identifier)) {
    return;
  }
  callback();
  isLoadedMap.set(identifier, true);
};
