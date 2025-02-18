import mixpanel from 'mixpanel-browser';

mixpanel.init('e8624a11f952af6d692c2b67003f55ab', {
    debug: true,
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: true
  });
  

export default mixpanel;
