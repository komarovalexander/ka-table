import ReactGA from 'react-ga';

const host = window.location.hostname;
let initializeGA = () => {};
let trackPage = (page: string) => {};
let trackEvent = (category: string, action: string, label: string = '') => {};
if (host !== 'localhost') {
    initializeGA = () => ReactGA.initialize('UA-50311880-5');

    trackPage = (page: string) => {
        ReactGA.set({ page });
        ReactGA.pageview(page);
    };
    trackEvent = (category: string, action: string, label: string = '') => {
        ReactGA.event({
            action,
            category: `${action} ${label}`,
        });
    };
}

export { initializeGA, trackPage, trackEvent };
