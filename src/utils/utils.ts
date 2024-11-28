

export const uiRandomKey = () => Math.random().toString(36).substring(2, 15);

export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
