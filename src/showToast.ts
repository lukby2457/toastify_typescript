import EventBus from "./eventBus";

export const showToast = {
  info: (message: string): void => {
    EventBus.publish("SHOW_TOAST", { message });
  },

  success: (message: string): void => {
    EventBus.publish("SHOW_TOAST", { message });
  },

  warning: (message: string): void => {
    EventBus.publish("SHOW_TOAST", { message });
  }
};