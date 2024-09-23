const EventBus = () => {
  const topics: Map<string, Array<(data: object) => void>> = new Map();

  const subscribe = (topic: string, listener: (data: object) => void): () => void => {
    if (!topics.has(topic)) {
      topics.set(topic, []);
    }
    topics.get(topic)?.push(listener);

    return () => {
      const listeners = topics.get(topic);
      if (listeners) {
        topics.set(
          topic,
          listeners.filter((l) => l !== listener)
        );
      }
    };
  };

  const publish = (topic: string, data: object): void => {
    if (!topics.has(topic)) return;
    topics.get(topic)?.forEach((listener) => listener(data));
  };

  return { subscribe, publish };
};

export default EventBus();